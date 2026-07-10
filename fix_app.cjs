const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// We need to add the imports to App.tsx
const imports = `import performanceImg from './assets/img/performance.jpg';
import bgVideo from './assets/video/bg-video.mp4';
`;

app = app.replace("import { useState, useRef, useEffect } from 'react';", "import { useState, useRef, useEffect } from 'react';\n" + imports);

// We replace the literal string with the variable inside curly braces for React
app = app.replace(/src="\/bg-video\.mp4\?v=2"/g, 'src={bgVideo}');
app = app.replace(/poster="\/performance\.jpg\?v=2"/g, 'poster={performanceImg}');

// Also replace the social proof no-referrer (we removed it before, but let's make sure it's correct)
fs.writeFileSync('src/App.tsx', app);
