import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.26';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.26.0 - FINAL STABLE");
root.render(html`<${Reset} />`);
