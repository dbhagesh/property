#!/bin/bash

echo "🗑️  Deleting All JPG/PNG Images (including backups)"
echo "=================================================="
echo ""
echo "⚠️  This will delete:"
echo "  - Original JPG/PNG files"
echo "  - Backup files (.backup.jpg/.backup.png)"
echo "  - Only WebP files will remain"
echo ""

# Counter for statistics
total_originals=0
total_backups=0
deleted=0
missing_webp=0

echo "Step 1: Deleting original files..."
echo "-----------------------------------"

# Find all JPG/PNG files (excluding backups)
while IFS= read -r file; do
  total_originals=$((total_originals + 1))

  # Get the WebP equivalent path
  webp_file="${file%.*}.webp"

  # Check if WebP exists
  if [ -f "$webp_file" ]; then
    echo "✅ $file"
    rm "$file"
    deleted=$((deleted + 1))
  else
    echo "⚠️  Skipping: $file (no WebP)"
    missing_webp=$((missing_webp + 1))
  fi
done < <(find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) ! -name "*.backup.*")

echo ""
echo "Step 2: Deleting backup files..."
echo "-----------------------------------"

# Delete all backup files
while IFS= read -r file; do
  total_backups=$((total_backups + 1))
  echo "🗑️  $file"
  rm "$file"
done < <(find public/images -type f \( -name "*.backup.jpg" -o -name "*.backup.jpeg" -o -name "*.backup.png" \))

echo ""
echo "=================================================="
echo "Summary:"
echo "  Original files deleted: $deleted"
echo "  Backup files deleted: $total_backups"
echo "  Total deleted: $((deleted + total_backups))"
echo "  Skipped (no WebP): $missing_webp"
echo ""
echo "✨ Cleanup complete! Only WebP images remain."
