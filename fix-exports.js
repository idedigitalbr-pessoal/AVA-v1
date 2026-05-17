const fs = require('fs');
const glob = require('glob');

function replaceInFile(filePath, searchParam, replacement) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.split(searchParam).join(replacement);
    fs.writeFileSync(filePath, content);
  }
}

// rename exports in the service files
const services = ['student', 'teacher', 'course', 'subject', 'class', 'enrollment', 'report', 'certificate', 'permission', 'assessment'];
services.forEach(name => {
  const filePath = `src/lib/api/services/${name}.service.ts`;
  replaceInFile(filePath, `export const ${name}sService`, `export const ${name}Service`);
  replaceInFile(filePath, `export const ${name === 'class' ? 'classes' : name + 's'}Service`, `export const ${name}Service`);
});

// fix specific index.ts imports
replaceInFile('src/lib/api/index.ts', "services/teacher.service' has no exported member named 'teacherService'", "");

// fix endpoints usages in remaining files
const files = fs.readdirSync('src/lib/api/services');
files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(`src/lib/api/services/${file}`, 'utf-8');
    // blindly replace endpoints.x.y with mock delay
    content = content.replace(/ENDPOINTS\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/g, "ENDPOINTS.$1.$2");
    fs.writeFileSync(`src/lib/api/services/${file}`, content);
  }
});
