const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');
data = data.replace(/export const localPhotosData/, `import heroImg from './assets/img/hero.jpg';\nimport sobreImg from './assets/img/sobre.jpg';\nimport performanceImg from './assets/img/performance.jpg';\n\nexport const localPhotosData`);

data = data.replace(/originalPath: 'imagem\/hero\.webp',/g, 'originalPath: heroImg,');
data = data.replace(/placeholderUrl: 'imagem\/hero\.webp'/g, 'placeholderUrl: heroImg');
data = data.replace(/originalPath: 'imagem\/sobre\.webp',/g, 'originalPath: sobreImg,');
data = data.replace(/placeholderUrl: 'imagem\/sobre\.webp'/g, 'placeholderUrl: sobreImg');
data = data.replace(/originalPath: 'imagem\/performance\.webp',/g, 'originalPath: performanceImg,');
data = data.replace(/placeholderUrl: 'imagem\/performance\.webp'/g, 'placeholderUrl: performanceImg');

fs.writeFileSync('src/data.ts', data);

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/import \{ SafeImage \} from '.\/components\/SafeImage';/, `import { SafeImage } from './components/SafeImage';\nimport bgVideo from './assets/video/bg-video.mp4';\nimport performanceImg from './assets/img/performance.jpg';`);

app = app.replace(/src="video\/bg-video\.mp4"/g, 'src={bgVideo}');
app = app.replace(/poster="imagem\/performance\.webp"/g, 'poster={performanceImg}');

fs.writeFileSync('src/App.tsx', app);
