import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.24';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.24.0 - INTRO FIX");
root.render(html`<${Reset} />`);
