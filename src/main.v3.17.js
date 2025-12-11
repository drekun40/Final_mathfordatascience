import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.18';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.18.0 - SCROLL FIX");
// alert("System v3.18.0 Updated!"); // Optional: keep or remove, keeping strict cache bust
root.render(html`<${Reset} />`);
