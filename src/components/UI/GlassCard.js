import { motion } from 'framer-motion';
import html from '../../htm.js';

const GlassCard = ({ children, className = '', style = {}, ...props }) => {
    return html`
        <${motion.div}
            initial=${{ opacity: 0, y: 10 }}
            animate=${{ opacity: 1, y: 0 }}
            transition=${{ duration: 0.4 }}
            className=${className}
            style=${{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: 'var(--shadow-md)',
            color: 'var(--color-text)',
            ...style
        }}
            ...${props}
        >
            ${children}
        <//>
    `;
};

export default GlassCard;
