const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');

function generateIndex(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  const exports = [];

  for (const item of items) {
    if (item.isDirectory()) {
        generateIndex(path.join(dir, item.name));
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) && item.name !== 'index.ts') {
        const name = path.basename(item.name, path.extname(item.name));
        exports.push(`export * from './${name}';`);
    }
  }

  if (exports.length > 0) {
    fs.writeFileSync(path.join(dir, 'index.ts'), exports.join('\n') + '\n');
    console.log(`Updated index in ${dir}`);
  }
}

console.log('Generating index files...');
generateIndex(COMPONENTS_DIR);
console.log('Done.');
