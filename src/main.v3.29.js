import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.29';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.29.0 - FORCED UPDATE");
root.render(html`<${Reset} />`);
