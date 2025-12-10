import { Router, Route, Switch } from 'wouter';
import html from './htm.js';

// --- Re-integrating Components with Cache Busting v=3.1 ---
import Landing from './views/Landing.js?v=3.1';
import Playground from './views/Playground.js?v=3.1';
import Lab2D from './views/Lab2D.js?v=3.1';

// --- NEW APP SHELL (formerly Reset.js) ---
const Reset = () => {

    // --- STYLES ---
    const containerStyle = {
        width: '100%',
        height: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column'
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

    const logoStyle = {
        fontFamily: "'Lora', serif",
        fontWeight: 600,
        fontSize: '1.2rem',
        color: 'var(--color-primary)'
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '30px'
    };

    const linkStyle = {
        color: 'var(--color-text)',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '0.9rem'
    };

    const contentStyle = {
        paddingTop: '70px',
        height: '100%',
        boxSizing: 'border-box'
    };

    // --- RENDER ---
    return html`
    <${Router}>
        <div style=${containerStyle}>
            
            <nav style=${navStyle}>
                <div style=${logoStyle}>Mercyhurst University</div>
                <div style=${navLinksStyle}>
                    <a href="/" style=${linkStyle}>Home</a>
                    <a href="/playground" style=${linkStyle}>3D Simulation</a>
                    <a href="/2d" style=${linkStyle}>2D Analysis</a>
                </div>
            </nav>

            <div style=${contentStyle}>
                <${Switch}>
                    <${Route} path="/" component=${Landing} />
                    <${Route} path="/playground" component=${Playground} />
                    <${Route} path="/2d" component=${Lab2D} />
                    <${Route}>
                        <div style=${{ padding: 50, textAlign: 'center' }}>
                            <h1>404 - Page Not Found</h1>
                            <a href="/">Go Home</a>
                        </div>
                    <//>
                <//>
            </div>

        </div>
    <//>
    `;
};

export default Reset;
