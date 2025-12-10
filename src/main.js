import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.14';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.14.0 - Regression Upgrade");
root.render(html`<${Reset} />`);
