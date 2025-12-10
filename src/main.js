import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.15';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.15.0 - Final Visual Polish");
root.render(html`<${Reset} />`);
