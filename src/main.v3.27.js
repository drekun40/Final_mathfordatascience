import { createRoot } from 'react-dom/client';
import html from './htm.js';
import Reset from './Reset.js?v=3.27';

const root = createRoot(document.getElementById('root'));
console.log("MERCYHURST SYSTEM v3.27.0 - RELEVANT QUIZ + FIXED INTRO");
root.render(html`<${Reset} />`);
