const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Swap text
      content = content.replace(/text-white/g, 'text-TEMP_W');
      content = content.replace(/text-black/g, 'text-white');
      content = content.replace(/text-TEMP_W/g, 'text-black');

      // Swap bg
      content = content.replace(/bg-white/g, 'bg-TEMP_W');
      content = content.replace(/bg-black/g, 'bg-white');
      content = content.replace(/bg-TEMP_W/g, 'bg-black');

      // Swap border
      content = content.replace(/border-white/g, 'border-TEMP_W');
      content = content.replace(/border-black/g, 'border-white');
      content = content.replace(/border-TEMP_W/g, 'border-black');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src/components');
processDir('./src/app');
console.log("Inversion complete!");
