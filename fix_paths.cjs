const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// Remove the imports
data = data.replace(/import heroImg from '\.\/assets\/img\/hero\.jpg';\n/, '');
data = data.replace(/import sobreImg from '\.\/assets\/img\/sobre\.jpg';\n/, '');
data = data.replace(/import performanceImg from '\.\/assets\/img\/performance\.jpg';\n/, '');

// Replace variables with strings
data = data.replace(/originalPath: heroImg,/g, "originalPath: 'imagem/hero.jpg',");
data = data.replace(/placeholderUrl: heroImg/g, "placeholderUrl: 'imagem/hero.jpg'");
data = data.replace(/originalPath: sobreImg,/g, "originalPath: 'imagem/sobre.jpg',");
data = data.replace(/placeholderUrl: sobreImg/g, "placeholderUrl: 'imagem/sobre.jpg'");
data = data.replace(/originalPath: performanceImg,/g, "originalPath: 'imagem/performance.jpg',");
data = data.replace(/placeholderUrl: performanceImg/g, "placeholderUrl: 'imagem/performance.jpg'");

fs.writeFileSync('src/data.ts', data);

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(/import performanceImg from '\.\/assets\/img\/performance\.jpg';\n/, '');
app = app.replace(/import bgVideo from '\.\/assets\/video\/bg-video\.mp4';\n/, '');

app = app.replace(/src=\{bgVideo\}/g, 'src="video/bg-video.mp4"');
app = app.replace(/poster=\{performanceImg\}/g, 'poster="imagem/performance.jpg"');

fs.writeFileSync('src/App.tsx', app);
