import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.21';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.21.0 - NEW FILENAME CACHE BUST");
root.render(html`<${Reset} />`);
