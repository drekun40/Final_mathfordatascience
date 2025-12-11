import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.23';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.23.0 - SYNTAX FIX");
root.render(html`<${Reset} />`);
