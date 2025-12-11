import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.22';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.22.0 - SINGLE PAGE LAYOUT");
root.render(html`<${Reset} />`);
