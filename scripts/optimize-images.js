const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../src/images');
const OUTPUT_DIR = path.join(__dirname, '../src/images/optimized');

async function optimizeImages() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('Starting image optimization...\n');

    const files = fs.readdirSync(SOURCE_DIR)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let totalWebpSize = 0;

    console.log('=== Optimization Results ===\n');

    for (const file of files) {
      const originalPath = path.join(SOURCE_DIR, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      const optimizedPath = path.join(OUTPUT_DIR, file);
      const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

      if (!fs.statSync(originalPath).isFile()) continue;

      const originalSize = fs.statSync(originalPath).size;
      totalOriginalSize += originalSize;

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(originalPath)
          .jpeg({ quality: 80, progressive: true })
          .toFile(optimizedPath);
      } else if (ext === '.png') {
        await sharp(originalPath)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(optimizedPath);
      }

      await sharp(originalPath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const optimizedSize = fs.statSync(optimizedPath).size;
      const webpSize = fs.statSync(webpPath).size;

      totalOptimizedSize += optimizedSize;
      totalWebpSize += webpSize;

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);
      const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(2);

      console.log(`${file}:`);
      console.log(`  Original:  ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`  Optimized: ${(optimizedSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
      console.log(`  WebP:      ${(webpSize / 1024).toFixed(2)} KB (${webpSavings}% smaller)`);
      console.log('');
    }

    const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(2);
    const totalWebpSavings = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(2);

    console.log('=== Summary ===');
    console.log(`Total original size:  ${(totalOriginalSize / 1024).toFixed(2)} KB`);
    console.log(`Total optimized size: ${(totalOptimizedSize / 1024).toFixed(2)} KB (${totalSavings}% smaller)`);
    console.log(`Total WebP size:      ${(totalWebpSize / 1024).toFixed(2)} KB (${totalWebpSavings}% smaller)`);
    console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
