#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="${SOURCE_DIR:-public/images}"
OUTPUT_DIR="${OUTPUT_DIR:-public/images}"
QUALITY="${QUALITY:-80}"
SIZES_CSV="${SIZES:-480,768,1024,1280}"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required. Install with: brew install webp"
  exit 1
fi

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory not found: $SOURCE_DIR"
  exit 1
fi

IFS="," read -r -a SIZES_ARRAY <<< "$SIZES_CSV"

mkdir -p "$OUTPUT_DIR"

find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | \
while IFS= read -r -d '' file; do
  rel="${file#${SOURCE_DIR}/}"
  name="${rel%.*}"
  source_file="$file"
  temp_file=""

  file_info="$(file "$file")"
  case "$file_info" in
    *AVIF*)
      if ! command -v sips >/dev/null 2>&1; then
        echo "Skipping $file (AVIF requires sips on macOS)"
        continue
      fi

      temp_file="$(mktemp /tmp/webp-XXXXXX.png)"
      if ! sips -s format png "$file" --out "$temp_file" >/dev/null; then
        echo "Skipping $file (failed to convert AVIF to PNG)"
        rm -f "$temp_file"
        continue
      fi
      source_file="$temp_file"
      ;;
  esac

  base_out="$OUTPUT_DIR/${name}.webp"
  mkdir -p "$(dirname "$base_out")"
  if ! cwebp -q "$QUALITY" "$source_file" -o "$base_out" >/dev/null; then
    echo "Skipping $file (cwebp failed)"
    rm -f "$temp_file"
    continue
  fi

  for width in "${SIZES_ARRAY[@]}"; do
    out="$OUTPUT_DIR/${name}-w${width}.webp"
    mkdir -p "$(dirname "$out")"
    if ! cwebp -q "$QUALITY" -resize "$width" 0 "$source_file" -o "$out" >/dev/null; then
      echo "Failed resize ${width}px for $file"
    fi
  done

  rm -f "$temp_file"
done

echo "Done. WebP variants written to $OUTPUT_DIR"
