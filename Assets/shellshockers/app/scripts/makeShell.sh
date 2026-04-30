#!/bin/bash

if [ -z "$1" ]; then
	echo "Rewrites the index.html file to use a CDN for assets."
	echo "Usage: makeShell.sh param = short git hash of the build to use"
	exit 1
fi

FILE="../../index.html"

# set var for cdn
CDN="https://cdn.jsdelivr.net/gh/shellbros/shellbros.github.io@$1/"

# 1. Inject JSCDN and checker script tags, or update the hash if already present
if ! grep -q '<script>window\.JSCDN=' "$FILE"; then
  echo "Injecting JSCDN config and checker script tag into $FILE"
  awk -v CDN="$CDN" '{
    print;
    if (!done && /<\/script>/) {
      print "<script>window.JSCDN=\"" CDN "\";</script>";
      print "<script src=\"" CDN "app/checker.js\"></script>";
      done=1
    }
  }' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"
else
  echo "Updating JSCDN hash in $FILE"
  sed -i '' \
    -e "s|<script>window\.JSCDN=\"[^\"]*\";</script>|<script>window.JSCDN=\"${CDN}\";</script>|" \
    -e "s|<script src=\"[^\"]*app/checker\.js\"></script>|<script src=\"${CDN}app/checker.js\"></script>|" \
    "$FILE"
fi

# 2. Remove unwanted meta tags, <title>, and <script type="application/ld+json"> blocks
echo "Stripping unwanted tags from $FILE"
awk '
  # Skip ld+json script blocks
  /<script type="application\/ld\+json">/ { skip=1; next }
  skip && /<\/script>/ { skip=0; next }
  skip { next }

  # Remove <title> tag
  /<title>/ { next }

  # For meta tags, only keep the allowed ones
  /<meta / {
    if ($0 ~ /charset="UTF-8"/) { print; next }
    if ($0 ~ /name="viewport"/) { print; next }
    if ($0 ~ /facebook-domain-verification/) { print; next }
    if ($0 ~ /name="theme-color"/) { print; next }
    if ($0 ~ /name="background-color"/) { print; next }
    next
  }

  { print }
' "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"

echo "Rewriting paths in $FILE"
node cdnSearchReplace.js "$CDN"
echo "Build complete. Output available in '../..'."
