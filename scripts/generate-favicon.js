const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = process.argv[2];

if (!sourceImage) {
  console.error('Please provide the source image path');
  process.exit(1);
}

const sizes = {
  'favicon.ico': 32,
  'icon.png': 32,
  'apple-icon.png': 180,
  'logo.png': 32,
};

async function generateImages() {
  try {
    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Generate each size
    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(publicDir, filename));
      console.log(`Generated ${filename}`);
    }

    console.log('All images generated successfully!');
  } catch (error) {
    console.error('Error generating images:', error);
    process.exit(1);
  }
}

generateImages(); 