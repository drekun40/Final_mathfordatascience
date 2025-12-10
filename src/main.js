import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.13';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.13.0 - Rescaling Fix");
root.render(html`<${Reset} />`);
