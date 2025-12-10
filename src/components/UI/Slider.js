import React from 'react';

const Slider = ({ label, value, min, max, step, onChange, formatValue = (v) => v }) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {label}
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                    {formatValue(value)}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                style={{
                    width: '100%',
                    accentColor: 'var(--color-primary)',
                    cursor: 'pointer'
                }}
            />
        </div>
    );
};

export default Slider;
