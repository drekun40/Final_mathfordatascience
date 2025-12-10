import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.5';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.5.0 - Forced Cache Bust");
root.render(html`<${Reset} />`);
