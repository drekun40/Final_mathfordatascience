import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.17';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.17.0 - CACHE NUKE");
alert("System v3.17.0 Updated!"); // Aggressive alert
root.render(html`<${Reset} />`);
