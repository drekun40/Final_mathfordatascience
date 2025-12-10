import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.6';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.6.0 - Manual Routing Fix");
root.render(html`<${Reset} />`);
