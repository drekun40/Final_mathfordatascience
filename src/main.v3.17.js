import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.20';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.20.0 - SCROLL ARCHITECTURE REWRITE");
root.render(html`<${Reset} />`);
