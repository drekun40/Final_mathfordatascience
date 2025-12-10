import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.7';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.7.0 - Quiz Mode Live");
root.render(html`<${Reset} />`);
