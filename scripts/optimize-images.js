const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('=¼  Optimizing Images for Better Performance\n');
console.log('=========================================\n');

// Configuration for aggressive optimization
const config = {
  quality: 70, // Reduced from 80 for better compression
  effort: 6,   // Maximum compression effort
  maxWidth: 800,
  maxHeight: 600,
};

// Find all WebP images
function findAllImages() {
  const patterns = [
    'public/images/**/*.webp',
  ];
  const images = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    images.push(...files);
  });

  // Exclude logos and icons (keep original quality)
  return images.filter(img =>
    !img.includes('logo') &&
    !img.includes('icon')
  );
}

async function optimizeImage(inputPath) {
  const fullPath = path.join(process.cwd(), inputPath);
  const parsedPath = path.parse(fullPath);

  try {
    const image = sharp(fullPath);
    const metadata = await image.metadata();

    console.log(`\n=ø ${path.basename(fullPath)}`);
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024).toFixed(1)} KB`);

    // Calculate new dimensions while maintaining aspect ratio
    const aspectRatio = metadata.width / metadata.height;
    let newWidth = Math.min(metadata.width, config.maxWidth);
    let newHeight = Math.min(metadata.height, config.maxHeight);

    // Maintain aspect ratio
    if (newWidth / newHeight > aspectRatio) {
      newWidth = Math.round(newHeight * aspectRatio);
    } else {
      newHeight = Math.round(newWidth / aspectRatio);
    }

    const tempPath = path.join(parsedPath.dir, `${parsedPath.name}.temp.webp`);

    await sharp(fullPath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: config.quality,
        effort: config.effort,
        smartSubsample: true,
      })
      .toFile(tempPath);

    const tempStats = fs.statSync(tempPath);
    const originalStats = fs.statSync(fullPath);
    const saved = originalStats.size - tempStats.size;

    if (saved > 1024) { // Only replace if we save at least 1KB
      fs.unlinkSync(fullPath);
      fs.renameSync(tempPath, fullPath);
      console.log(`    Optimized: ${newWidth}x${newHeight}, ${(tempStats.size / 1024).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB)`);
      return saved;
    } else {
      fs.unlinkSync(tempPath);
      console.log(`   í  Kept original (already optimized)`);
      return 0;
    }
  } catch (error) {
    console.error(`   L Error: ${error.message}`);
    return 0;
  }
}

async function main() {
  const images = findAllImages();

  console.log(`Found ${images.length} images to optimize\n`);

  let totalSaved = 0;
  let processedCount = 0;

  for (const imagePath of images) {
    const saved = await optimizeImage(imagePath);
    totalSaved += saved;
    processedCount++;
  }

  console.log('\n=========================================');
  console.log(`\n( Optimization Complete!`);
  console.log(`   Images processed: ${processedCount}`);
  console.log(`   Total saved: ${(totalSaved / 1024).toFixed(1)} KB`);
  if (processedCount > 0) {
    console.log(`   Average per image: ${(totalSaved / processedCount / 1024).toFixed(1)} KB\n`);
  }
}

main().catch(console.error);
