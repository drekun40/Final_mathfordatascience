import html from '../../htm.js';

const Slider = ({ label, value, min, max, step, onChange, formatValue = v => v }) => {

    // --- STYLES ---
    const containerStyle = { marginBottom: '16px' };
    const labelRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text)' };
    const valueStyle = { fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' };
    const inputStyle = {
        width: '100%',
        accentColor: 'var(--color-accent)',
        cursor: 'pointer'
    };

    return html`
        <div style=${containerStyle}>
            <div style=${labelRowStyle}>
                <span>${label}</span>
                <span style=${valueStyle}>${formatValue(value)}</span>
            </div>
            <input 
                type="range" 
                min=${min} 
                max=${max} 
                step=${step} 
                value=${value} 
                onInput=${(e) => onChange(parseFloat(e.target.value))}
                style=${inputStyle}
            />
        </div>
    `;
};

export default Slider;
