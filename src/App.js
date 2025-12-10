import html from './htm.js';
import Landing from './views/Landing.js?v=205';

// Minimal App Component
// We are temporarily removing the Router to ensure the basic rendering works.
const App = () => {
    const containerStyle = {
        width: '100%',
        height: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        display: 'flex',
        flexDirection: 'column'
    };

    const navStyle = {
        padding: '20px',
        background: 'white',
        borderBottom: '1px solid #ccc'
    };

    return html`
    <div style=${containerStyle}>
        <nav style=${navStyle}>
            <strong>Mercyhurst University</strong> | Gradient Descent Explorer
        </nav>
        <!-- Directly render Landing for now to test stability -->
        <${Landing} />
    </div>
  `;
};

export default App;
