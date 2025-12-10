import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=GOLDEN_SPIKE_1';

const root = createRoot(document.getElementById('root'));
console.log("Mercyhurst App v3.0.0 - Clean Slate");
root.render(html`<${Reset} />`);
