const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  quality: 80,
  maxWidth: 1920,
  maxHeight: 1080,
  webpQuality: 80,
  jpegQuality: 80,
};

// Image directories to process
const imageDirs = [
  'public/images/hero',
  'public/images/areas',
  'public/images/about',
  'public/images',
];

// Files to process (with specific settings)
const priorityImages = [
  { path: 'public/images/hero/property-1.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/hero/property-2.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/hero/property-3.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/hero/property-4.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/why-choose-us.jpg', maxWidth: 1200, quality: 75 },
  { path: 'public/images/office.jpg', maxWidth: 1200, quality: 75 },
  { path: 'public/images/areas/rohtak.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/areas/bahadurgarh.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/areas/imt-kharkhoda.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/areas/sonipat.jpg', maxWidth: 800, quality: 75 },
  { path: 'public/images/about/hero.jpg', maxWidth: 1200, quality: 75 },
  { path: 'public/images/about/story.jpg', maxWidth: 800, quality: 75 },
];

async function optimizeImage(inputPath, options = {}) {
  try {
    const fullPath = path.join(process.cwd(), inputPath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${inputPath} (not found)`);
      return;
    }

    const fileStats = fs.statSync(fullPath);
    const originalSize = (fileStats.size / 1024).toFixed(2);

    // Get image metadata
    const metadata = await sharp(fullPath).metadata();

    const maxWidth = options.maxWidth || config.maxWidth;
    const maxHeight = options.maxHeight || config.maxHeight;
    const quality = options.quality || config.quality;

    // Calculate new dimensions maintaining aspect ratio
    let newWidth = metadata.width;
    let newHeight = metadata.height;

    if (newWidth > maxWidth) {
      newHeight = Math.round((maxWidth / newWidth) * newHeight);
      newWidth = maxWidth;
    }

    if (newHeight > maxHeight) {
      newWidth = Math.round((maxHeight / newHeight) * newWidth);
      newHeight = maxHeight;
    }

    // Create backup
    const backupPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.backup.$1');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(fullPath, backupPath);
    }

    // Optimize based on format
    if (inputPath.endsWith('.png')) {
      // Optimize PNG
      await sharp(fullPath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(fullPath + '.tmp');
    } else {
      // Optimize JPEG
      await sharp(fullPath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(fullPath + '.tmp');
    }

    // Also create WebP version
    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await sharp(fullPath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: options.webpQuality || config.webpQuality })
      .toFile(webpPath);

    // Replace original with optimized
    fs.renameSync(fullPath + '.tmp', fullPath);

    // Get new size
    const newStats = fs.statSync(fullPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const webpStats = fs.existsSync(webpPath) ? fs.statSync(webpPath) : null;
    const webpSize = webpStats ? (webpStats.size / 1024).toFixed(2) : 'N/A';
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${inputPath}`);
    console.log(`   Original: ${originalSize}KB → Optimized: ${newSize}KB → WebP: ${webpSize}KB`);
    console.log(`   Savings: ${savings}% | Dimensions: ${newWidth}x${newHeight}`);

  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');

  // Process priority images first
  console.log('📌 Processing priority images:\n');
  for (const img of priorityImages) {
    await optimizeImage(img.path, {
      maxWidth: img.maxWidth,
      quality: img.quality,
      webpQuality: img.quality,
    });
  }

  console.log('\n✨ Image optimization complete!\n');
  console.log('📝 Original files backed up with .backup extension');
  console.log('🌐 WebP versions created for modern browsers');
}

// Run optimization
optimizeAllImages().catch(console.error);
