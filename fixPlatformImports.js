const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'node_modules', 'react-native', 'Libraries');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix import Platform
  content = content.replace(/import\s+Platform\s+from\s+['"][^'"]*Utilities\/Platform['"]/g, () => {
    changed = true;
    return `import { Platform } from 'react-native'`;
  });

  // Fix require('../../Utilities/Platform').default
  content = content.replace(/require\(['"][^'"]*Utilities\/Platform['"]\)\.default/g, () => {
    changed = true;
    return `require('react-native').Platform`;
  });

  // Fix require('../../Utilities/Platform')
  content = content.replace(/require\(['"][^'"]*Utilities\/Platform['"]\)/g, () => {
    changed = true;
    return `require('react-native').Platform`;
  });

  // Fix require('./PlatformColorValueTypes')
  content = content.replace(/require\(['"][^'"]*PlatformColorValueTypes['"]\)/g, () => {
    changed = true;
    return `{ normalizeColorObject: () => null, processColorObject: () => null }`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
  }
}

const allFiles = walk(TARGET_DIR);
allFiles.forEach(fixFile);

console.log('✨ All matching Platform and PlatformColorValueTypes imports have been fixed.');
