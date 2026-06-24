#!/usr/bin/env bash
# Generates the low-resolution placeholder for the home page.

set -euo pipefail

SRC="src/assets/ethan-hawksley.png"
TMP_PNG="/tmp/r.png"
TMP_AVIF="/tmp/t.avif"
OUT="src/assets/ethan-hawksley-120.avif"
TARGET_SIZE=2560

echo "Resizing"
magick "$SRC" -filter LanczosSharp -resize 120x120 -strip "$TMP_PNG"

echo "Searching for optimal compression"
low=0
high=63
best=63

while (( low <= high )); do
  mid=$(( (low + high) / 2 ))
  avifenc --min "$mid" --max "$mid" --speed 0 --yuv 420 --ignore-icc "$TMP_PNG" "$TMP_AVIF" 2>/dev/null
  size=$(stat -c%s "$TMP_AVIF")
  if (( size <= TARGET_SIZE )); then
    best=$mid
    high=$(( mid - 1 ))
  else
    low=$(( mid + 1 ))
  fi
done

echo "Encoding final AVIF at $best"
avifenc --min "$best" --max "$best" --speed 0 --yuv 420 --ignore-icc "$TMP_PNG" "$OUT"

echo "Compressed successfully"