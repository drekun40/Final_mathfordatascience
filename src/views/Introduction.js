import React from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
// Using only known-safe icons for now to prevent crash
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
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

    return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                
                <${GlassCard} style=${{ textAlign: 'center', padding: '40px' }}>
                    <h1 style=${headerStyle}>Welcome to Gradient Descent</h1>
                    <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
                        An interactive guide to understanding how machines learn.
                    </p>
                    
                    <div style=${{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                         <a href="#/playground" style=${{ textDecoration: 'none' }}>
                            <${Button} icon=${ArrowRight} variant="primary" size="large">Begin Exploration<//>
                        </a>
                    </div>
                <//>

                <${GlassCard}>
                    <h2 style=${{ fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '16px' }}>Overview</h2>
                    <ul style=${{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style=${{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--color-text)' }}>
                            <${CheckCircle} size=${20} color="var(--color-accent)" />
                            <span><strong>3D Lab:</strong> Visualize the landscape.</span>
                        </li>
                        <li style=${{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--color-text)' }}>
                            <${CheckCircle} size=${20} color="var(--color-accent)" />
                            <span><strong>2D Studio:</strong> Analyze contours.</span>
                        </li>
                        <li style=${{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--color-text)' }}>
                            <${CheckCircle} size=${20} color="var(--color-accent)" />
                            <span><strong>Quiz:</strong> Test your knowledge.</span>
                        </li>
                    </ul>
                <//>
            </div>
        </div>
    `;
};

export default Introduction;
