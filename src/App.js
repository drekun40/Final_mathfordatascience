import { Router, Route, Switch } from 'wouter';
import html from './htm.js';
import Landing from './views/Landing.js?v=206';
import Playground from './views/Playground.js?v=206';
import Lab2D from './views/Lab2D.js?v=206';

const App = () => {

    // --- STYLES ---
    const containerStyle = {
        width: '100%',
        height: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)'
    };

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
    };

    const logoStyle = { fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.2rem' };
    const navLinkGroupStyle = { display: 'flex', gap: 30 };
    const navLinkStyle = { color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500 };
    const contentStyle = { paddingTop: 70, height: '100%', boxSizing: 'border-box' };

    return html`
    <${Router}>
        <div style=${containerStyle}>
            <!-- Academic Navigation Header -->
            <nav style=${navStyle}>
                <div style=${logoStyle}>
                    Gradient Descent Explorer
                </div>
                <div style=${navLinkGroupStyle}>
                    <a href="/" style=${navLinkStyle}>Abstract</a>
                    <a href="/playground" style=${navLinkStyle}>3D Simulation</a>
                    <a href="/2d" style=${navLinkStyle}>2D Analysis</a>
                </div>
            </nav>

            <div style=${contentStyle}>
                <${Switch}>
                    <${Route} path="/" component=${Landing} />
                    <${Route} path="/playground" component=${Playground} />
                    <${Route} path="/2d" component=${Lab2D} />
                    <${Route}>404: Page Not Found<//>
                <//>
            </div>
        </div>
    <//>
  `;
};

export default App;
