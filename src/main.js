import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.9';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.9.0 - FINAL THEORY FIX");
root.render(html`<${Reset} />`);
