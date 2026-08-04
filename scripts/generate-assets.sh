#!/usr/bin/env bash
# Generates the derivatives of ethan-hawksley.png

set -euo pipefail

SRC="src/assets/ethan-hawksley.png"

avifenc -q 30 -a tune=ssim --depth 10 --yuv 420 --speed 0 --ignore-icc "$SRC" public/ethan-hawksley.avif

cwebp -q 80 -m 6 -sharp_yuv -metadata none -mt "$SRC" -o public/ethan-hawksley.webp

cjpegli "$SRC" public/ethan-hawksley.jpg -q 80

cp "$SRC" public/ethan-hawksley.png

TMP_PNG="/tmp/r.png"
TMP_AVIF="/tmp/t.avif"
OUT="src/assets/ethan-hawksley-320.avif"
TARGET_SIZE=5500

echo "Resizing"
magick "$SRC" -filter LanczosSharp -resize 320x320 -strip "$TMP_PNG"

echo "Searching for optimal compression"
low=0
high=63
best=63

while (( low <= high )); do
  mid=$(( (low + high) / 2 ))
  avifenc \
    --min 0 --max 63 \
    -a end-usage=q -a cq-level="$mid" \
    -a tune=ssim \
    --depth 10 \
    --yuv 444 \
    --speed 0 \
    --ignore-icc \
    "$TMP_PNG" "$TMP_AVIF" 2>/dev/null
  size=$(stat -c%s "$TMP_AVIF")
  if (( size <= TARGET_SIZE )); then
    best=$mid
    high=$(( mid - 1 ))
  else
    low=$(( mid + 1 ))
  fi
done

echo "Encoding final AVIF at $best"
avifenc \
  --min 0 --max 63 \
  -a end-usage=q -a cq-level="$best" \
  -a tune=ssim \
  --depth 10 \
  --yuv 444 \
  --speed 0 \
  --ignore-icc \
  "$TMP_PNG" "$OUT"

echo "Compressed successfully"
