import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.30';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.30.0 - LANDING BUTTONS ADDED");
root.render(html`<${Reset} />`);
