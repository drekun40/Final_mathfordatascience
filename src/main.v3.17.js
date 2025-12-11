import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.19';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.19.0 - SCROLL FINAL");
// alert("System v3.18.0 Updated!"); // Optional: keep or remove, keeping strict cache bust
root.render(html`<${Reset} />`);
