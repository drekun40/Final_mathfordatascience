import html from './htm.js';

// --- Single File "Golden Spike" Implementation ---
// This file is self-contained. It defines its own styles and logic 
// to ensure it works 100% regardless of other file states.

const Reset = () => {

    // --- DESIGN THEME (Mercyhurst) ---
    const theme = {
        primary: '#004E42', // Mercyhurst Green
        secondary: '#002F6C', // Mercyhurst Navy
        bg: '#f5f7fa',
        text: '#1a1a1a',
        surface: '#ffffff',
        border: '#e6e6e6'
    };

    // --- STYLES ---
    const containerStyle = {
        width: '100%',
        height: '100vh',
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column'
    };

    const headerStyle = {
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const logoStyle = {
        fontFamily: "'Lora', serif",
        fontWeight: 600,
        fontSize: '1.4rem',
        color: theme.primary
    };

    const mainStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    };

    const cardStyle = {
        background: theme.surface,
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        textAlign: 'center'
    };

    const buttonStyle = {
        background: theme.primary,
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '20px',
        fontWeight: 500
    };

    // --- RENDER ---
    return html`
        <div style=${containerStyle}>
            <header style=${headerStyle}>
                <div style=${logoStyle}>Mercyhurst University</div>
                <div style=${{ fontSize: '0.9rem', color: '#666' }}>Gradient Descent Explorer</div>
            </header>

            <main style=${mainStyle}>
                <div style=${cardStyle}>
                    <h1 style=${{ marginTop: 0, color: theme.secondary }}>System Reset Complete</h1>
                    <p style=${{ lineHeight: 1.6, color: '#4b5563' }}>
                        The application has been successfully reset to a clean, stable baseline.
                        We are ready to rebuild the features in a modular, easy-to-edit structure.
                    </p>
                    <button style=${buttonStyle} onClick=${() => alert("System Active!")}>
                        Verify Interaction
                    </button>
                    <div style=${{ marginTop: 20, fontSize: '0.8rem', color: '#9ca3af' }}>v3.0.0 - Golden Spike</div>
                </div>
            </main>
        </div>
    `;
};

export default Reset;
