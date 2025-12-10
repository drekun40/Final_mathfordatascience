import html from '../../htm.js';

const Slider = ({ label, value, min, max, step, onChange, formatValue = v => v }) => {
    return html`
        <div style=${{ marginBottom: '16px' }}>
            <div style=${{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                <span>${label}</span>
                <span style=${{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>${formatValue(value)}</span>
            </div>
            <input 
                type="range" 
                min=${min} 
                max=${max} 
                step=${step} 
                value=${value} 
                onInput=${(e) => onChange(parseFloat(e.target.value))}
                style=${{
            width: '100%',
            accentColor: 'var(--color-accent)',
            cursor: 'pointer'
        }}
            />
        </div>
    `;
};

export default Slider;
