#!/usr/bin/env python3
"""
Deep archive a JavaScript-heavy website for offline viewing.

This crawler uses Playwright to render pages, intercept network responses,
mirror remote assets to disk, and optionally rewrite links for local browsing.

Intended for legally permitted archival/testing workflows only.
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import mimetypes
import os
import random
import re
import sys
import time
from collections import deque
from dataclasses import dataclass
from pathlib import Path
from typing import Deque, Dict, Optional, Set
from urllib.parse import parse_qsl, urlencode, urljoin, urlsplit, urlunsplit

from playwright.async_api import (
    Error as PlaywrightError,
    Response,
    TimeoutError as PlaywrightTimeoutError,
    async_playwright,
)


USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6_6) AppleWebKit/605.1.15 "
    "(KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Edg/124.0.2478.67",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
]

TRACKING_PARAMS = {
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
    "_ga",
    "_gl",
}

TEXT_EXTENSIONS = {".html", ".htm", ".css"}
SKIP_SCHEMES = ("data:", "blob:", "javascript:", "mailto:", "tel:")

MIME_EXTENSION_FALLBACK = {
    "application/wasm": ".wasm",
    "application/json": ".json",
    "application/javascript": ".js",
    "text/javascript": ".js",
    "text/css": ".css",
    "text/html": ".html",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/wav": ".wav",
    "video/mp4": ".mp4",
}

# Ad/analytics traffic often creates noisy archives and pathological URL lengths.
SKIP_HOST_SUBSTRINGS = {
    "googlesyndication.com",
    "doubleclick.net",
    "google-analytics.com",
    "googletagmanager.com",
    "googleadservices.com",
    "adservice.google.com",
    "facebook.com",
    "facebook.net",
    "hotjar.com",
}

MAX_SEGMENT_LENGTH = 120
MAX_FILENAME_STEM_LENGTH = 120

EXTRACT_LINKS_JS = """
() => {
  const links = new Set();
  const selectors = [
    'a[href]',
    'iframe[src]',
    '[data-href]'
  ];

  for (const node of document.querySelectorAll(selectors.join(','))) {
    for (const attr of ['href', 'src', 'data-src', 'data-href']) {
      const value = node.getAttribute(attr);
      if (!value) continue;
      try {
        links.add(new URL(value, document.baseURI).href);
      } catch (_) {
        // Ignore invalid URL values.
      }
    }
  }

  return Array.from(links);
}
"""


@dataclass
class CrawlItem:
    url: str
    depth: int


class DeepSiteArchiver:
    """Crawl and archive a website by driving a real browser."""

    def __init__(
        self,
        target_url: str,
        output_dir: Path,
        max_pages: int,
        max_depth: int,
        min_delay: float,
        max_delay: float,
        timeout_seconds: int,
        rewrite_links: bool,
        allow_subdomains: bool,
        capture_external_assets: bool,
        max_iframes_per_page: int,
        browser_name: str,
        headless: bool,
    ) -> None:
        self.start_url = self._normalize_url(target_url)
        self.start_host = (urlsplit(self.start_url).hostname or "").lower()
        if not self.start_host:
            raise ValueError(f"Invalid target URL: {target_url}")

        self.output_dir = output_dir.resolve()
        self.max_pages = max_pages
        self.max_depth = max_depth
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.timeout_ms = timeout_seconds * 1000
        self.rewrite_links = rewrite_links
        self.allow_subdomains = allow_subdomains
        self.capture_external_assets = capture_external_assets
        self.max_iframes_per_page = max_iframes_per_page
        self.browser_name = browser_name
        self.headless = headless

        self.queue: Deque[CrawlItem] = deque([CrawlItem(url=self.start_url, depth=0)])
        self.enqueued: Set[str] = {self.start_url}
        self.visited: Set[str] = set()
        self.failed_requests: Dict[str, str] = {}
        self.url_to_local_path: Dict[str, Path] = {}
        self.local_path_to_url: Dict[Path, str] = {}
        self.redirect_aliases: Dict[str, str] = {}
        self._pending_capture_tasks: Set[asyncio.Task] = set()

    async def run(self) -> None:
        self.output_dir.mkdir(parents=True, exist_ok=True)

        async with async_playwright() as playwright:
            browser_factory = getattr(playwright, self.browser_name)
            browser = await browser_factory.launch(headless=self.headless)
            try:
                while self.queue and len(self.visited) < self.max_pages:
                    item = self.queue.popleft()
                    if item.url in self.visited:
                        continue

                    self.visited.add(item.url)
                    print(
                        f"[{len(self.visited):04d}] Crawling depth={item.depth} url={item.url}",
                        flush=True,
                    )
                    await self._crawl_single_page(browser, item)

                    if self.queue and len(self.visited) < self.max_pages:
                        await self._human_delay()
            finally:
                await self._drain_capture_tasks()
                await browser.close()

        if self.rewrite_links:
            rewritten = self._rewrite_saved_links()
            print(f"Rewrote local URLs in {rewritten} files.", flush=True)

        self._write_manifest()

        print("\nArchive completed.", flush=True)
        print(f"Visited pages: {len(self.visited)}", flush=True)
        print(f"Captured assets: {len(self.url_to_local_path)}", flush=True)
        print(f"Failed requests: {len(self.failed_requests)}", flush=True)
        print(f"Output directory: {self.output_dir}", flush=True)

    async def _crawl_single_page(self, browser, item: CrawlItem) -> None:
        context = await browser.new_context(
            user_agent=random.choice(USER_AGENTS),
            viewport={"width": 1440, "height": 900},
            java_script_enabled=True,
            ignore_https_errors=True,
        )
        context.set_default_timeout(self.timeout_ms)

        context.on("response", self._schedule_response_capture)
        context.on("requestfailed", self._on_request_failed)

        page = await context.new_page()
        try:
            response = await page.goto(item.url, wait_until="domcontentloaded")
            if response is not None and response.status >= 400:
                print(f"  WARN status={response.status} url={item.url}", flush=True)

            # Let dynamic app shells and background requests settle as much as possible.
            try:
                await page.wait_for_load_state("networkidle", timeout=min(15000, self.timeout_ms))
            except PlaywrightTimeoutError:
                pass

            await self._trigger_dynamic_loading(page)
            await self._save_rendered_html(page)
            await self._discover_and_enqueue_links(page, current_depth=item.depth)

        except PlaywrightTimeoutError:
            print(f"  ERROR timeout while loading {item.url}", flush=True)
            self.failed_requests[item.url] = "page timeout"
        except PlaywrightError as exc:
            print(f"  ERROR Playwright failure for {item.url}: {exc}", flush=True)
            self.failed_requests[item.url] = str(exc)
        except Exception as exc:  # Defensive: keep crawler alive on unknown page issues.
            print(f"  ERROR unexpected failure for {item.url}: {exc}", flush=True)
            self.failed_requests[item.url] = str(exc)
        finally:
            await self._drain_capture_tasks()
            await context.close()

    async def _trigger_dynamic_loading(self, page) -> None:
        # Scroll to trigger lazy loaders and asset fetches.
        try:
            await page.evaluate(
                """
                () => {
                  const maxY = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                  window.scrollTo(0, Math.floor(maxY * 0.35));
                  window.scrollTo(0, Math.floor(maxY * 0.75));
                  window.scrollTo(0, maxY);
                }
                """
            )
        except PlaywrightError:
            pass

        await page.wait_for_timeout(1200)

        # Click commonly-used CTA elements once to wake up SPA/game bootstrap flows.
        try:
            await page.evaluate(
                """
                () => {
                  const pat = /(play|start|continue|ok|accept|close|launch)/i;
                  const nodes = Array.from(document.querySelectorAll('button, a, [role="button"]'));
                  for (const node of nodes.slice(0, 40)) {
                    const text = (node.textContent || '').trim();
                    if (pat.test(text)) {
                      try { node.click(); } catch (_) {}
                    }
                  }
                }
                """
            )
        except PlaywrightError:
            pass

        iframe_locator = page.locator("iframe")
        iframe_count = min(await iframe_locator.count(), self.max_iframes_per_page)

        # Specifically interact with iframe elements so embedded game resources get requested.
        for index in range(iframe_count):
            frame_handle = iframe_locator.nth(index)
            try:
                await frame_handle.scroll_into_view_if_needed(timeout=2000)
                await frame_handle.click(timeout=1500)
            except PlaywrightError:
                continue

        await page.wait_for_timeout(2000)

    async def _save_rendered_html(self, page) -> None:
        html_url = self._normalize_url(page.url)
        html_content: Optional[str] = None

        # Some game launchers trigger immediate navigation loops; retry quickly.
        for _ in range(3):
            try:
                html_url = self._normalize_url(page.url)
                html_content = await page.content()
                break
            except PlaywrightError:
                await page.wait_for_timeout(250)

        if html_content is None:
            self.failed_requests[html_url] = (
                "rendered html capture failed: page kept navigating during snapshot"
            )
            return

        target_path = self._local_path_for_url(
            html_url,
            content_type="text/html",
            is_document=True,
        )
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(html_content, encoding="utf-8", errors="ignore")

        self.url_to_local_path[html_url] = target_path
        self.local_path_to_url[target_path] = html_url

    async def _discover_and_enqueue_links(self, page, current_depth: int) -> None:
        if current_depth >= self.max_depth:
            return

        discovered: Set[str] = set()
        page_links = await self._extract_links_from_page(page)
        discovered.update(page_links)

        # Pull frame URLs directly and inspect frame DOM for additional navigable links.
        for frame in page.frames:
            frame_url = frame.url
            if frame_url:
                discovered.add(frame_url)
            try:
                frame_links = await frame.evaluate(EXTRACT_LINKS_JS)
                if isinstance(frame_links, list):
                    discovered.update(str(link) for link in frame_links)
            except PlaywrightError:
                continue
            except Exception:
                continue

        next_depth = current_depth + 1
        for raw_url in discovered:
            normalized = self._normalize_url(raw_url)
            if not self._is_allowed_url(normalized):
                continue
            if not self._looks_like_navigable_url(normalized):
                continue
            if normalized in self.visited or normalized in self.enqueued:
                continue
            self.queue.append(CrawlItem(url=normalized, depth=next_depth))
            self.enqueued.add(normalized)

    async def _extract_links_from_page(self, page) -> Set[str]:
        try:
            links = await page.evaluate(EXTRACT_LINKS_JS)
        except PlaywrightError:
            return set()
        except Exception:
            return set()

        if not isinstance(links, list):
            return set()
        return {str(link) for link in links}

    def _schedule_response_capture(self, response: Response) -> None:
        task = asyncio.create_task(self._capture_response(response))
        self._pending_capture_tasks.add(task)
        task.add_done_callback(self._pending_capture_tasks.discard)

    async def _capture_response(self, response: Response) -> None:
        url = self._normalize_url(response.url)
        if not self._is_http_url(url):
            return
        if not self.capture_external_assets and not self._is_allowed_url(url):
            return
        if self._is_skipped_host(url):
            return

        try:
            content_type = response.headers.get("content-type", "").split(";")[0].strip().lower()
            body = await response.body()
        except PlaywrightError as exc:
            location = response.headers.get("location", "")
            if location:
                redirected = self._normalize_url(urljoin(url, location))
                if redirected:
                    self.redirect_aliases[url] = redirected
            self.failed_requests[url] = f"response capture failed: {exc}"
            return
        except Exception as exc:
            self.failed_requests[url] = f"response capture failed: {exc}"
            return

        is_document = response.request.resource_type == "document" or content_type == "text/html"
        local_path = self._local_path_for_url(url, content_type=content_type, is_document=is_document)

        try:
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(body)
        except OSError as exc:
            self.failed_requests[url] = f"write failed: {exc}"
            return

        self.url_to_local_path[url] = local_path
        self.local_path_to_url[local_path] = url

    def _on_request_failed(self, request) -> None:
        failure = request.failure
        error_text = "unknown request failure"

        # Playwright may return failure as dict, string, or None.
        if isinstance(failure, dict):
            error_text = failure.get("errorText") or error_text
        elif isinstance(failure, str):
            error_text = failure
        elif failure is None:
            error_text = "request failed without details"

        request_url = self._normalize_url(request.url)
        if self._is_skipped_host(request_url):
            return
        self.failed_requests[request_url] = error_text

    async def _drain_capture_tasks(self) -> None:
        if not self._pending_capture_tasks:
            return
        tasks = list(self._pending_capture_tasks)
        self._pending_capture_tasks.clear()
        await asyncio.gather(*tasks, return_exceptions=True)

    async def _human_delay(self) -> None:
        delay = random.uniform(self.min_delay, self.max_delay)
        await asyncio.sleep(delay)

    def _is_allowed_url(self, url: str) -> bool:
        if not self._is_http_url(url):
            return False

        host = (urlsplit(url).hostname or "").lower()
        if host == self.start_host:
            return True
        if self.allow_subdomains and host.endswith(f".{self.start_host}"):
            return True
        return False

    @staticmethod
    def _is_http_url(url: str) -> bool:
        scheme = urlsplit(url).scheme.lower()
        return scheme in {"http", "https"}

    @staticmethod
    def _is_skipped_host(url: str) -> bool:
        host = (urlsplit(url).hostname or "").lower()
        if not host:
            return False
        return any(piece in host for piece in SKIP_HOST_SUBSTRINGS)

    @staticmethod
    def _looks_like_navigable_url(url: str) -> bool:
        path = urlsplit(url).path or "/"
        if path.endswith("/"):
            return True

        filename = Path(path).name
        if "." not in filename:
            return True

        ext = os.path.splitext(filename)[1].lower()
        static_asset_extensions = {
            ".js",
            ".mjs",
            ".css",
            ".map",
            ".json",
            ".xml",
            ".txt",
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".webp",
            ".svg",
            ".ico",
            ".mp3",
            ".ogg",
            ".wav",
            ".mp4",
            ".webm",
            ".m3u8",
            ".ts",
            ".wasm",
            ".woff",
            ".woff2",
            ".ttf",
            ".otf",
            ".eot",
            ".zip",
            ".gz",
            ".pdf",
        }
        return ext not in static_asset_extensions

    def _normalize_url(self, url: str) -> str:
        stripped = (url or "").strip()
        if not stripped:
            return ""

        parts = urlsplit(stripped)
        if parts.scheme.lower() not in {"http", "https"}:
            return stripped

        clean_items = []
        for key, value in parse_qsl(parts.query, keep_blank_values=True):
            if key.lower() in TRACKING_PARAMS:
                continue
            clean_items.append((key, value))

        query = urlencode(sorted(clean_items), doseq=True)
        path = parts.path or "/"

        return urlunsplit(
            (
                parts.scheme.lower(),
                parts.netloc.lower(),
                path,
                query,
                "",  # Drop fragment to avoid infinite hash-only recrawls.
            )
        )

    def _local_path_for_url(self, url: str, content_type: str = "", is_document: bool = False) -> Path:
        parts = urlsplit(url)
        host = (parts.netloc or self.start_host).lower().replace(":", "_")

        raw_segments = [segment for segment in parts.path.split("/") if segment]
        safe_segments = [self._safe_segment(segment) for segment in raw_segments]

        if not safe_segments:
            safe_segments = ["index"]
        if parts.path.endswith("/"):
            safe_segments.append("index")

        filename = safe_segments[-1]
        stem, ext = os.path.splitext(filename)

        if not ext:
            ext = self._infer_extension(content_type=content_type, is_document=is_document)
            filename = f"{filename}{ext}"
        elif is_document and ext.lower() not in {".html", ".htm"}:
            filename = f"{filename}.html"

        if parts.query:
            qhash = hashlib.sha1(parts.query.encode("utf-8")).hexdigest()[:10]
            stem, ext = os.path.splitext(filename)
            filename = f"{stem}__q_{qhash}{ext}"

        stem, ext = os.path.splitext(filename)
        if len(stem) > MAX_FILENAME_STEM_LENGTH:
            digest = hashlib.sha1(stem.encode("utf-8")).hexdigest()[:12]
            keep = max(20, MAX_FILENAME_STEM_LENGTH - 15)
            filename = f"{stem[:keep]}__{digest}{ext}"

        safe_segments[-1] = filename
        return self.output_dir / host / Path(*safe_segments)

    def _infer_extension(self, content_type: str, is_document: bool) -> str:
        if is_document:
            return ".html"

        if content_type:
            if content_type in MIME_EXTENSION_FALLBACK:
                return MIME_EXTENSION_FALLBACK[content_type]
            guessed = mimetypes.guess_extension(content_type)
            if guessed:
                return guessed

        return ".bin"

    @staticmethod
    def _safe_segment(segment: str) -> str:
        cleaned = re.sub(r"[^A-Za-z0-9._-]", "_", segment)
        if not cleaned:
            return "_"
        if len(cleaned) <= MAX_SEGMENT_LENGTH:
            return cleaned

        digest = hashlib.sha1(cleaned.encode("utf-8")).hexdigest()[:12]
        keep = max(20, MAX_SEGMENT_LENGTH - 15)
        return f"{cleaned[:keep]}__{digest}"

    def _rewrite_saved_links(self) -> int:
        rewritten_files = 0
        candidate_files = {
            path for path in self.url_to_local_path.values() if path.suffix.lower() in TEXT_EXTENSIONS
        }

        for file_path in candidate_files:
            if not file_path.exists():
                continue

            source_url = self.local_path_to_url.get(file_path)
            if not source_url:
                continue

            original_text = file_path.read_text(encoding="utf-8", errors="ignore")
            rewritten_text = self._rewrite_text_urls(original_text, source_url, file_path)
            if rewritten_text != original_text:
                file_path.write_text(rewritten_text, encoding="utf-8")
                rewritten_files += 1

        return rewritten_files

    def _rewrite_text_urls(self, text: str, source_url: str, source_file: Path) -> str:
        attr_pattern = re.compile(
            r'(?P<prefix>\b(?:href|src|data-src|data-href|poster)\s*=\s*["\'])'
            r'(?P<url>[^"\']+)'
            r'(?P<suffix>["\'])',
            flags=re.IGNORECASE,
        )

        css_pattern = re.compile(
            r'url\(\s*(?P<quote>["\']?)(?P<url>[^)"\']+)(?P=quote)\s*\)',
            flags=re.IGNORECASE,
        )

        def attr_replacer(match: re.Match) -> str:
            original = match.group("url")
            rewritten = self._resolve_to_local_reference(original, source_url, source_file)
            if rewritten is None:
                return match.group(0)
            return f"{match.group('prefix')}{rewritten}{match.group('suffix')}"

        def css_replacer(match: re.Match) -> str:
            original = match.group("url")
            rewritten = self._resolve_to_local_reference(original, source_url, source_file)
            if rewritten is None:
                return match.group(0)
            quote = match.group("quote") or ""
            return f"url({quote}{rewritten}{quote})"

        text = attr_pattern.sub(attr_replacer, text)
        text = css_pattern.sub(css_replacer, text)
        return text

    def _resolve_to_local_reference(
        self,
        discovered_url: str,
        source_url: str,
        source_file: Path,
    ) -> Optional[str]:
        if not discovered_url:
            return None

        candidate = discovered_url.strip()
        lower = candidate.lower()

        if candidate.startswith("#") or lower.startswith(SKIP_SCHEMES):
            return None

        if candidate.startswith("//"):
            absolute = f"https:{candidate}"
        elif lower.startswith("http://") or lower.startswith("https://"):
            absolute = candidate
        else:
            absolute = urljoin(source_url, candidate)

        normalized = self._normalize_url(absolute)
        local_target = self.url_to_local_path.get(normalized)
        if not local_target:
            redirected = self.redirect_aliases.get(normalized)
            if redirected:
                local_target = self.url_to_local_path.get(redirected)
        if not local_target:
            return None

        relative = os.path.relpath(local_target, start=source_file.parent)
        return relative.replace(os.sep, "/")

    def _write_manifest(self) -> None:
        manifest_path = self.output_dir / "archive_manifest.json"
        manifest = {
            "created_utc": int(time.time()),
            "start_url": self.start_url,
            "start_host": self.start_host,
            "max_pages": self.max_pages,
            "max_depth": self.max_depth,
            "rewrite_links": self.rewrite_links,
            "allow_subdomains": self.allow_subdomains,
            "visited_pages": sorted(self.visited),
            "captured_assets": {
                url: str(path.relative_to(self.output_dir))
                for url, path in sorted(self.url_to_local_path.items())
            },
            "failed_requests": self.failed_requests,
        }
        manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Deep archive a dynamic website using Playwright network interception."
    )
    parser.add_argument(
        "target_url",
        nargs="?",
        default="https://poki.com/",
        help="Starting URL to crawl (modify this to your own target).",
    )
    parser.add_argument(
        "--output-dir",
        default="offline_archive",
        help="Directory where archived files are stored.",
    )
    parser.add_argument("--max-pages", type=int, default=200, help="Maximum pages to crawl.")
    parser.add_argument("--max-depth", type=int, default=3, help="Maximum crawl depth from start URL.")
    parser.add_argument("--min-delay", type=float, default=2.0, help="Minimum random delay between pages.")
    parser.add_argument("--max-delay", type=float, default=7.0, help="Maximum random delay between pages.")
    parser.add_argument(
        "--timeout-seconds",
        type=int,
        default=35,
        help="Navigation timeout per page.",
    )
    parser.add_argument(
        "--allow-subdomains",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Allow crawling subdomains of the target host.",
    )
    parser.add_argument(
        "--capture-external-assets",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Capture responses from hosts outside the target domain.",
    )
    parser.add_argument(
        "--rewrite-links",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Rewrite links in saved HTML/CSS to local relative paths when possible.",
    )
    parser.add_argument(
        "--max-iframes-per-page",
        type=int,
        default=12,
        help="How many iframe elements to actively trigger per page.",
    )
    parser.add_argument(
        "--browser",
        choices=["chromium", "firefox", "webkit"],
        default="chromium",
        help="Browser engine to use.",
    )
    parser.add_argument(
        "--headful",
        action="store_true",
        help="Run with visible browser window (default is headless).",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="Optional random seed for reproducible delays/user-agent choice.",
    )
    return parser.parse_args()


async def async_main() -> int:
    args = parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    if args.min_delay < 0 or args.max_delay < 0:
        print("Delay values must be non-negative.", file=sys.stderr)
        return 2
    if args.min_delay > args.max_delay:
        print("min-delay cannot be greater than max-delay.", file=sys.stderr)
        return 2
    if args.max_pages <= 0:
        print("max-pages must be greater than zero.", file=sys.stderr)
        return 2

    archiver = DeepSiteArchiver(
        target_url=args.target_url,
        output_dir=Path(args.output_dir),
        max_pages=args.max_pages,
        max_depth=args.max_depth,
        min_delay=args.min_delay,
        max_delay=args.max_delay,
        timeout_seconds=args.timeout_seconds,
        rewrite_links=args.rewrite_links,
        allow_subdomains=args.allow_subdomains,
        capture_external_assets=args.capture_external_assets,
        max_iframes_per_page=args.max_iframes_per_page,
        browser_name=args.browser,
        headless=not args.headful,
    )

    await archiver.run()
    return 0


def main() -> None:
    try:
        raise_code = asyncio.run(async_main())
    except KeyboardInterrupt:
        print("Interrupted by user.", file=sys.stderr)
        raise_code = 130
    except Exception as exc:
        print(f"Fatal error: {exc}", file=sys.stderr)
        raise_code = 1
    raise SystemExit(raise_code)


if __name__ == "__main__":
    main()
