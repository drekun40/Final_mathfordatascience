import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', icon: Icon, disabled = false, style = {} }) => {

    const baseStyle = {
        padding: '12px 24px',
        import html from '../../htm.js';

        const Button = ({ children, onClick, variant = 'primary', icon: Icon, style = {}, ...props }) => {

            // Simple variant styles (Academic)
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

            return html`
        <${motion.button}
            whileHover=${{ scale: 1.02 }}
            whileTap=${{ scale: 0.98 }}
            onClick=${onClick}
            style=${{
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    ...variantStyle,
                    ...style
                }}
            ...${props}
        >
            ${Icon && html`<${Icon} size=${18} />`}
            ${children}
        <//>
    `;
        };

        export default Button;
