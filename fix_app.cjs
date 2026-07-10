const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Insert SafeImage import
app = app.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { SafeImage } from './components/SafeImage';");

// Replace <img ... /> with <SafeImage ... />
app = app.replace(/<img\s*\n\s*src=\{localPhotosData\[0\]\.originalPath\}\s*\n\s*alt="Nathalia Quirino"\s*\n\s*className="w-full h-full object-cover object-\[center_20%\] md:object-top"\s*\n\s*\n\s*fetchPriority="high"\s*\n\s*decoding="async"\s*\n\s*\/>/g, 
  '<SafeImage src={localPhotosData[0].originalPath} alt="Nathalia Quirino" className="w-full h-full object-cover object-[center_20%] md:object-top" fetchPriority="high" decoding="async" />');

app = app.replace(/<img\s*\n\s*src=\{localPhotosData\[3\]\.placeholderUrl\}\s*\n\s*alt="Clínica"\s*\n\s*className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"\s*\n\s*\n\s*loading="lazy"\s*\n\s*decoding="async"\s*\n\s*\/>/g, 
  '<SafeImage src={localPhotosData[3].placeholderUrl} alt="Clínica" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />');

app = app.replace(/<img\s*\n\s*src=\{localPhotosData\[2\]\.placeholderUrl\}\s*\n\s*alt="Performance"\s*\n\s*className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"\s*\n\s*\n\s*loading="lazy"\s*\n\s*decoding="async"\s*\n\s*\/>/g, 
  '<SafeImage src={localPhotosData[2].placeholderUrl} alt="Performance" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />');

app = app.replace(/<motion\.img\s*\n\s*whileHover=\{\{ scale: 1\.05 \}\}\s*\n\s*transition=\{\{ duration: 0\.4 \}\}\s*\n\s*src=\{item\.image\}\s*\n\s*alt=\{item\.name\}\s*\n\s*className="w-full h-full object-cover"\s*\n\s*\n\s*loading="lazy"\s*\n\s*decoding="async"\s*\n\s*\/>/g, 
  '<SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async" />');

fs.writeFileSync('src/App.tsx', app);
