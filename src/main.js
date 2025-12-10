import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.12';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.12.0 - Visual Confirmation");
root.render(html`<${Reset} />`);
