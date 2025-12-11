import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.25';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.25.0 - SAFE MODE INTRO");
root.render(html`<${Reset} />`);
