import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.11';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.11.0 - Intro Tab & Fixes");
root.render(html`<${Reset} />`);
