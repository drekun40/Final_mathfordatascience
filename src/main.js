import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.10';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.10.0 - Lab2D Hotfix");
root.render(html`<${Reset} />`);
