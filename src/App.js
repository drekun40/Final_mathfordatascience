import { Router, Route, Switch } from 'wouter';
import html from './htm.js';
import Landing from './views/Landing.js';
import Playground from './views/Playground.js';
import Lab2D from './views/Lab2D.js';

const App = () => {
    return html`
    <${Router}>
        <div style=${{
            width: '100%',
            height: '100vh',
            background: 'var(--color-bg)',
            color: 'var(--color-text)'
        }}>
            <!-- Academic Navigation Header -->
            <nav style=${{
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
        }}>
                <div style=${{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.2rem' }}>
                    Gradient Descent Explorer
                </div>
                <div style=${{ display: 'flex', gap: 30 }}>
                    <a href="/" style=${{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500 }}>Abstract</a>
                    <a href="/playground" style=${{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500 }}>3D Simulation</a>
                    <a href="/2d" style=${{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 500 }}>2D Analysis</a>
                </div>
            </nav>

            <div style=${{ paddingTop: 70, height: '100%', boxSizing: 'border-box' }}>
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
