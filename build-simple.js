const fs = require('fs');
const path = require('path');

// Simple build script
console.log('Creating build directory...');

// Create build directory
if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

// Copy public files
const copyRecursive = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(path.join(src, childItemName),
                    path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Copy public folder to build
copyRecursive('public', 'build');

// Copy src folder to build
copyRecursive('src', 'build');

console.log('Build completed!');
