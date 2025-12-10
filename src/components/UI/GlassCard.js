import { motion } from 'framer-motion';
import html from '../../htm.js';

const GlassCard = ({ children, className = '', style = {}, ...props }) => {

    // --- STYLES ---
    const initial = { opacity: 0, y: 10 };
    const animate = { opacity: 1, y: 0 };
    const transition = { duration: 0.4 };

    const cardStyle = {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
        color: 'var(--color-text)',
        ...style
    };

    return html`
        <${motion.div}
            initial=${initial}
            animate=${animate}
            transition=${transition}
            className=${className}
            style=${cardStyle}
            ...${props}
        >
            ${children}
        <//>
    `;
};

export default GlassCard;
