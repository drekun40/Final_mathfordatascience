import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.2';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.2.0 - Computational Observatory");
root.render(html`<${Reset} />`);
