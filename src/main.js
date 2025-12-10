import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.3';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.3.0 - Dashboard Live");
root.render(html`<${Reset} />`);
