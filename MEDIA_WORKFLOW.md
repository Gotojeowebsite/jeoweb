# Media Workflow (Movies / TV)

This project includes an automated media pipeline.

## Folder layout

- Inbox: `Assets/media/inbox/`
- Library output: `Assets/media/library/<type>/<slug>/`
- Catalog: `media_catalog.json`

## Naming convention (recommended)

Use filenames in inbox like:

- Movie: `movie__The Matrix__1999.mp4`
- Show episode: `show__Breaking Bad__S01E01.mp4`
- Poster: `movie__The Matrix__1999.jpg`
- Subtitle: `show__Breaking Bad__S01E01.vtt`

## Commands

- `npm run media:init`
  - Installs Git LFS and configures Git hooks path.
- `npm run media:ingest`
  - Moves files from inbox to library and updates `media_catalog.json`.
- `npm run media:validate`
  - Validates catalog structure and file existence.
- `npm run media:hooks`
  - Re-applies hook setup (`core.hooksPath=.githooks`).

## Pre-commit protection

A pre-commit hook blocks large media files (over 20MB) if they are not staged as Git LFS pointers.

## Notes

- Keep legal rights in mind for any media you store/distribute.
- For production streaming, prefer CDN/object storage and keep only URLs + metadata in this repo.
