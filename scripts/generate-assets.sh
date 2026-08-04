#!/usr/bin/env bash
# Generates the derivatives of ethan-hawksley.png

set -euo pipefail

SRC="src/assets/ethan-hawksley.png"

avifenc -q 30 -a tune=ssim --depth 10 --yuv 420 --speed 0 --ignore-icc "$SRC" public/ethan-hawksley.avif

cwebp -q 80 -m 6 -sharp_yuv -metadata none -mt "$SRC" -o public/ethan-hawksley.webp

cjpegli "$SRC" public/ethan-hawksley.jpg -q 80

cp "$SRC" public/ethan-hawksley.png

TMP_PNG=$(mktemp --suffix=.png)
TMP_AVIF=$(mktemp --suffix=.avif)
OUT="src/assets/ethan-hawksley-320.avif"
TARGET_SIZE=5500

echo "Resizing"
magick "$SRC" -filter LanczosSharp -resize 320x320 -strip "$TMP_PNG"

echo "Searching for optimal compression"

low=0
high=100
best=0

while (( low <= high )); do
  mid=$(( (low + high) / 2 ))
  avifenc \
    -q "$mid" \
    --depth 10 \
    --yuv 444 \
    --speed 4 \
    --ignore-icc \
    "$TMP_PNG" "$TMP_AVIF" >/dev/null 2>&1

  size=$(stat -c%s "$TMP_AVIF")

  if (( size <= TARGET_SIZE )); then
    # Try higher quality
    best=$mid
    low=$(( mid + 1 ))
  else
    # Try lower quality
    high=$(( mid - 1 ))
  fi
done

echo "Encoding final AVIF at $best"
avifenc \
  -q "$best" \
  -a tune=ssim \
  --depth 10 \
  --yuv 444 \
  --speed 0 \
  --ignore-icc \
  "$TMP_PNG" "$OUT"

echo "Compressed successfully."
