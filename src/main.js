import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.8';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.8.0 - Theory Added");
root.render(html`<${Reset} />`);
