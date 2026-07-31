#!/usr/bin/env bash
# Subsets IBM Plex Sans and IBM Plex Mono TTF's to WOFF2

set -euo pipefail

UNICODES="U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC,U+2190-2193,U+21A9,U+2212,U+2215,U+FEFF,U+FFFD"
OUT_DIR="public/fonts"
TMP_TTF=$(mktemp --suffix=.ttf)

trap 'rm -f "$TMP_TTF"' EXIT

for f in ibm-plex-sans.ttf ibm-plex-mono.ttf; do
  if [[ ! -f "$f" ]]; then
    echo "Error: $f not found" >&2
    exit 1
  fi
done

echo "Preprocessing ibm-plex-sans.ttf"
fonttools varLib.instancer ibm-plex-sans.ttf wdth=100 wght=400:600 -o "$TMP_TTF"

echo "Subsetting ibm-plex-sans.ttf"
pyftsubset "$TMP_TTF" \
  --output-file="$OUT_DIR/ibm-sans-subset.woff2" \
  --flavor="woff2" \
  --unicodes="$UNICODES" \
  --layout-features="kern,liga,calt,ccmp,locl" \
  --drop-tables+="DSIG,hdmx,VDMX,LTSH,meta,gasp" \
  --name-IDs="1,2" \
  --no-glyph-names \
  --no-hinting \
  --desubroutinize

echo "Subsetting ibm-plex-mono.ttf"
pyftsubset "ibm-plex-mono.ttf" \
  --output-file="$OUT_DIR/ibm-mono-subset.woff2" \
  --flavor="woff2" \
  --unicodes="$UNICODES" \
  --layout-features="kern,liga,calt,ccmp,locl" \
  --drop-tables+="DSIG,hdmx,VDMX,LTSH,meta,gasp" \
  --name-IDs="1,2" \
  --no-glyph-names \
  --no-hinting \
  --desubroutinize

echo "Subsetted successfully"
