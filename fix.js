const fs = require('fs');
const glob = require('glob'); // Not available unless I check wait, I can just use fs with recursive readdir.

const dirInfo = fs.readdirSync('src/lib/api/services');
dirInfo.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(`src/lib/api/services/${file}`, 'utf-8');
    content = content.replace(/from '\.\.\/client'/g, "from '../api-client'");
    content = content.replace(/import \{ endpoints \}/g, "import { ENDPOINTS }");
    content = content.replace(/endpoints\./g, "ENDPOINTS.");
    fs.writeFileSync(`src/lib/api/services/${file}`, content);
  }
});
console.log('done')
