import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.16';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.16.0 - Expanded Quiz");
root.render(html`<${Reset} />`);
