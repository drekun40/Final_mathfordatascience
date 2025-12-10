import { createRoot } from 'react-dom/client';
import html from './htm.js';
import App from './App.js';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v2.0.3 - Button Fix Applied");
root.render(html`<${App} />`);
