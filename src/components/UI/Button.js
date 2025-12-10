import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', icon: Icon, disabled = false, style = {} }) => {

    const baseStyle = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: disabled ? 0.5 : 1,
        ...style
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

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyle, ...variants[variant] }}
        >
            {Icon && <Icon size={18} />}
            {children}
        </motion.button>
    );
};

export default Button;
