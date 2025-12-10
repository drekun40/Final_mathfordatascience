import { createRoot } from 'react-dom/client';
import html from './htm.js';
import App from './App.js?v=206';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v2.1.0 - Full Restoration");
root.render(html`<${App} />`);
