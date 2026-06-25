#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="src/app/enframe photo new "
OUT_DIR="public/enframe-photos"
mkdir -p "$OUT_DIR"

count=0
total=$(find "$SRC_DIR" -maxdepth 1 -type f -iname '*.jpeg' -o -iname '*.jpg' -o -iname '*.JPG' -o -iname '*.JPEG' 2>/dev/null | wc -l | tr -d ' ')
echo "Processing $total source images..."

while IFS= read -r -d '' f; do
  count=$((count + 1))
  base=$(basename "$f")
  # Clean filename: strip the .jpg.jpeg / .JPG.jpeg double extension,
  # then lowercase, replace spaces with underscores.
  clean=$(echo "$base" \
    | sed -E 's/\.(jpg|JPG)\.jpeg$//; s/\.jpeg$//; s/\.JPG$//; s/\.jpg$//' \
    | tr ' ' '_' \
    | tr '[:upper:]' '[:lower:]')

  # Shorten very long UUID-style names to first 8 hex chars before any suffix
  if [[ "$clean" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12} ]]; then
    short="${clean:0:8}"
    # If multiple files share the same 8-char prefix, fall back to first 12.
    if [ -e "$OUT_DIR/${short}.jpg" ]; then
      short="${clean:0:12}"
    fi
    clean="$short"
  fi

  out="$OUT_DIR/${clean}.jpg"
  if [ -f "$out" ]; then
    # Avoid clobber: append _2, _3, ...
    i=2
    while [ -f "$OUT_DIR/${clean}_${i}.jpg" ]; do
      i=$((i + 1))
    done
    out="$OUT_DIR/${clean}_${i}.jpg"
  fi

  echo "[$count/$total] $base -> $(basename "$out")"
  sips -Z 2000 -s format jpeg -s formatOptions 82 "$f" --out "$out" >/dev/null
done < <(find "$SRC_DIR" -maxdepth 1 -type f \( -iname '*.jpeg' -o -iname '*.jpg' \) -print0)

echo "Done. Wrote $count files to $OUT_DIR."
ls -la "$OUT_DIR" | head -5
du -sh "$OUT_DIR"
