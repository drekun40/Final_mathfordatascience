import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.28';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.28.0 - ADDED THEORY");
root.render(html`<${Reset} />`);
