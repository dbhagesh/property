const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  quality: 80,
  maxWidth: 1920,
  maxHeight: 1080,
  deleteOriginals: false, // Set to true to delete JPG/PNG after conversion
};

// Find all image files recursively
function findAllImages() {
  const patterns = [
    'public/images/**/*.jpg',
    'public/images/**/*.jpeg',
    'public/images/**/*.png',
  ];

  const images = [];
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    images.push(...files);
  });

  // Filter out backup files
  return images.filter(img => !img.includes('.backup.'));
}

// Convert image to WebP
async function convertToWebP(inputPath) {
  try {
    const fullPath = path.join(process.cwd(), inputPath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${inputPath} (not found)`);
      return null;
    }

    // Skip if WebP already exists and is newer
    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      const originalStats = fs.statSync(fullPath);
      const webpStats = fs.statSync(webpPath);
      if (webpStats.mtime > originalStats.mtime) {
        console.log(`⏭️  Skipping ${inputPath} (WebP already exists and is newer)`);
        return webpPath;
      }
    }

    const fileStats = fs.statSync(fullPath);
    const originalSize = (fileStats.size / 1024).toFixed(2);

    // Get image metadata
    const metadata = await sharp(fullPath).metadata();

    // Calculate new dimensions maintaining aspect ratio
    let newWidth = metadata.width;
    let newHeight = metadata.height;

    if (newWidth > config.maxWidth) {
      newHeight = Math.round((config.maxWidth / newWidth) * newHeight);
      newWidth = config.maxWidth;
    }

    if (newHeight > config.maxHeight) {
      newWidth = Math.round((config.maxHeight / newHeight) * newWidth);
      newHeight = config.maxHeight;
    }

    // Create backup if it doesn't exist
    const backupPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.backup.$1');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(fullPath, backupPath);
      console.log(`   💾 Created backup: ${path.basename(backupPath)}`);
    }

    // Convert to WebP
    await sharp(fullPath)
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: config.quality, effort: 6 })
      .toFile(webpPath);

    // Get WebP size
    const webpStats = fs.statSync(webpPath);
    const webpSize = (webpStats.size / 1024).toFixed(2);
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✅ ${inputPath}`);
    console.log(`   Original: ${originalSize}KB → WebP: ${webpSize}KB (${savings}% savings)`);
    console.log(`   Dimensions: ${newWidth}x${newHeight}`);

    // Delete original if configured
    if (config.deleteOriginals) {
      fs.unlinkSync(fullPath);
      console.log(`   🗑️  Deleted original file`);
    }

    return webpPath;

  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

// Update file references
function updateFileReferences(oldExt, newExt = 'webp') {
  const filesToUpdate = [
    'lib/data/**/*.ts',
    'lib/data/**/*.js',
    'constants/**/*.ts',
    'constants/**/*.js',
    'data/**/*.json',
    'components/**/*.tsx',
    'components/**/*.jsx',
    'app/**/*.tsx',
    'app/**/*.jsx',
  ];

  const files = [];
  filesToUpdate.forEach(pattern => {
    const found = glob.sync(pattern, { cwd: process.cwd() });
    files.push(...found);
  });

  let totalReplacements = 0;

  files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace image references
    const regex = new RegExp(`\\.(${oldExt})(['"\`])`, 'gi');
    content = content.replace(regex, `.${newExt}$2`);

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      const replacements = (originalContent.match(regex) || []).length;
      totalReplacements += replacements;
      console.log(`   📝 Updated ${file} (${replacements} references)`);
    }
  });

  return totalReplacements;
}

async function main() {
  console.log('🎨 WebP Conversion Script\n');
  console.log('Configuration:');
  console.log(`  - Quality: ${config.quality}`);
  console.log(`  - Max dimensions: ${config.maxWidth}x${config.maxHeight}`);
  console.log(`  - Delete originals: ${config.deleteOriginals}\n`);

  // Step 1: Find all images
  console.log('🔍 Finding images...\n');
  const images = findAllImages();
  console.log(`Found ${images.length} images to convert\n`);

  if (images.length === 0) {
    console.log('No images found to convert.');
    return;
  }

  // Step 2: Convert to WebP
  console.log('🖼️  Converting images to WebP...\n');
  let converted = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  for (const imagePath of images) {
    const webpPath = await convertToWebP(imagePath);
    if (webpPath) {
      converted++;

      // Calculate sizes
      const fullPath = path.join(process.cwd(), imagePath);
      if (fs.existsSync(fullPath)) {
        totalOriginalSize += fs.statSync(fullPath).size;
      }
      if (fs.existsSync(webpPath)) {
        totalWebPSize += fs.statSync(webpPath).size;
      }
    }
    console.log(''); // Empty line for readability
  }

  // Step 3: Update code references
  console.log('\n📝 Updating code references...\n');
  const replacements = updateFileReferences('jpg|jpeg|png');

  // Summary
  console.log('\n✨ Conversion Complete!\n');
  console.log('Summary:');
  console.log(`  - Images converted: ${converted}/${images.length}`);
  console.log(`  - Code references updated: ${replacements}`);
  console.log(`  - Total original size: ${(totalOriginalSize / 1024).toFixed(2)}KB`);
  console.log(`  - Total WebP size: ${(totalWebPSize / 1024).toFixed(2)}KB`);
  console.log(`  - Total savings: ${((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1)}%\n`);

  if (!config.deleteOriginals) {
    console.log('💡 Original files kept. To delete them, set deleteOriginals: true in config');
    console.log('   Backups saved with .backup extension');
  }
}

// Run the script
main().catch(console.error);
