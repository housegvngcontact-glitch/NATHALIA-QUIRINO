const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const imports = `import heroImg from './assets/img/hero.jpg';
import sobreImg from './assets/img/sobre.jpg';
import performanceImg from './assets/img/performance.jpg';\n\n`;

data = data.replace(/export const localPhotosData/, imports + 'export const localPhotosData');
data = data.replace(/\/hero\.jpg\?v=2/g, "${heroImg}");
data = data.replace(/\/sobre\.jpg\?v=2/g, "${sobreImg}");
data = data.replace(/\/performance\.jpg\?v=2/g, "${performanceImg}");

// Also we need to make sure we don't end up with string literals where variables are needed
data = data.replace(/'\$\{heroImg\}'/g, "heroImg");
data = data.replace(/'\$\{sobreImg\}'/g, "sobreImg");
data = data.replace(/'\$\{performanceImg\}'/g, "performanceImg");

fs.writeFileSync('src/data.ts', data);
