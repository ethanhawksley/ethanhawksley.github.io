#!/usr/bin/env bash
# Subsets IBM Plex Sans and IBM Plex Mono TTF's to WOFF2

set -euo pipefail

UNICODES="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+21A9,U+2212,U+2215,U+FEFF,U+FFFD"
OUT_DIR="public/fonts"

subset() {
  local input="$1"
  local output="$2"
  echo "Subsetting $input -> $output"
  pyftsubset "$input" \
    --output-file="$output" \
    --flavor="woff2" \
    --unicodes="$UNICODES" \
    --layout-features="*" \
    --no-hinting \
    --desubroutinize
  echo "Done"
}

for f in IBMPlexSans.ttf IBMPlexMono.ttf; do
  if [[ ! -f "$f" ]]; then
    echo "Error: $f not found" >&2
    exit 1
  fi
done

subset "IBMPlexSans.ttf" "$OUT_DIR/IBMSans-Subset.woff2"
subset "IBMPlexMono.ttf" "$OUT_DIR/IBMMono-Subset.woff2"

echo "Subsetted successfully"
