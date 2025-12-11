import React from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { ArrowRight, CheckCircle } from 'lucide-react';
import html from '../htm.js';

const Introduction = () => {

    const pageStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px',
        minHeight: '100%'
    };

    const contentContainer = {
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const headerStyle = {
        fontSize: '2.5rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginBottom: '16px',
        textAlign: 'center'
    };

    const sectionTitleStyle = {
        fontSize: '1.5rem',
        color: 'var(--color-primary)',
        marginBottom: '16px',
        fontFamily: 'var(--font-serif)'
    };

    const listItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        color: 'var(--color-text)',
        fontSize: '1.1rem'
    };

    return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                
                <${GlassCard} style=${{ textAlign: 'center', padding: '40px 24px' }}>
                    <h1 style=${headerStyle}>Gradient Descent Explorer</h1>
                    <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
                        An interactive environment to master the fundamental algorithm of machine learning.
                    </p>
                    
                    <div style=${{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                         <a href="#/playground" style=${{ textDecoration: 'none' }}>
                            <${Button} icon=${ArrowRight} variant="primary" size="large">Start Experiment<//>
                        </a>
                    </div>
                <//>

                <${GlassCard}>
                    <h2 style=${sectionTitleStyle}>Observatory Modules</h2>
                    <ul style=${{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style=${listItemStyle}>
                            <${CheckCircle} size=${24} color="var(--color-accent)" />
                            <span><strong>3D Lab:</strong> Interactive visualization of the error landscape.</span>
                        </li>
                        <li style=${listItemStyle}>
                            <${CheckCircle} size=${24} color="var(--color-accent)" />
                            <span><strong>2D Studio:</strong> Precise contour map analysis.</span>
                        </li>
                        <li style=${listItemStyle}>
                            <${CheckCircle} size=${24} color="var(--color-accent)" />
                            <span><strong>Quiz Mode:</strong> Assess your understanding.</span>
                        </li>
                    </ul>
                <//>
            </div>
        </div>
    `;
};

export default Introduction;
