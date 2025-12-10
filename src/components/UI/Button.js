import { motion } from 'framer-motion';
import html from '../../htm.js';

const Button = ({ children, onClick, variant = 'primary', icon: Icon, style = {}, ...props }) => {

    // --- STYLES ---
    const baseStyle = {
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const variants = {
        primary: {
            background: 'var(--color-primary)',
            color: 'white',
            boxShadow: 'var(--shadow-sm)'
        },
        secondary: {
            background: 'white',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
        },
        danger: {
            background: '#ef4444',
            color: 'white'
        }
    };

    const variantStyle = variants[variant] || variants.primary;

    const combinedStyle = {
        ...baseStyle,
        ...variantStyle,
        ...style
    };

    const hoverAnim = { scale: 1.02 };
    const tapAnim = { scale: 0.98 };

    return html`
        <${motion.button}
            whileHover=${hoverAnim}
            whileTap=${tapAnim}
            onClick=${onClick}
            style=${combinedStyle}
            ...${props}
        >
            ${Icon && html`<${Icon} size=${18} />`}
            ${children}
        <//>
    `;
};

export default Button;
