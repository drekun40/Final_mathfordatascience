import React from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { ArrowRight, Mountain, TrendingDown, Target } from 'lucide-react';
import html from '../htm.js';

const Introduction = () => {

    // --- STYLES ---
    const layoutStyle = {
        padding: '24px 20px',
        maxWidth: '1000px', // Matches standard max-width
        margin: '0 auto',
        height: '100%',
        overflowY: 'auto'
    };

    const headerStyle = {
        fontSize: '2.5rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginBottom: '10px',
        borderBottom: '2px solid var(--color-accent)',
        paddingBottom: '20px'
    };

    const sectionStyle = {
        marginTop: '40px',
        marginBottom: '40px'
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '24px'
    };

    const iconBoxStyle = {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'rgba(11, 58, 46, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        color: 'var(--color-primary)'
    };

    const stepTitleStyle = {
        fontFamily: 'var(--font-serif)',
        fontSize: '1.25rem',
        color: 'var(--color-secondary)',
        margin: '0 0 8px 0'
    };

    return html`
        <div style=${layoutStyle}>
            <div style=${{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style=${headerStyle}>Welcome to Gradient Descent</h1>
                <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                    An interactive guide to understanding how machines learn. 
                    Master the algorithm that powers modern Artificial Intelligence.
                </p>
            </div>

            <div style=${sectionStyle}>
                <h2 style=${{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>What is it?</h2>
                <div style=${cardGridStyle}>
                    <${GlassCard}>
                        <div style=${iconBoxStyle}><${Mountain} size=${24} /><//>
                        <h3 style=${stepTitleStyle}>The Landscape</h3>
                        <p>Imagine being lost in the mountains in the dark. Your goal is to find the lowest point in the valley (where the "Loss" is zero).</p>
                    <//>
                    
                    <${GlassCard}>
                        <div style=${iconBoxStyle}><${TrendingDown} size=${24} /><//>
                        <h3 style=${stepTitleStyle}>The Slope</h3>
                        <p>You can feels the slope of the ground under your feet. The <strong>Gradient</strong> tells you which way is "uphill".</p>
                    <//>

                    <${GlassCard}>
                        <div style=${iconBoxStyle}><${Target} size=${24} /><//>
                        <h3 style=${stepTitleStyle}>The Step</h3>
                        <p>You take a step <strong>opposite</strong> to the gradient to go downhill. The size of this step is the <strong>Learning Rate</strong>.</p>
                    <//>
                </div>
            </div>

            <div style=${sectionStyle}>
                <h2 style=${{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>How to use this Observatory</h2>
                <${GlassCard} style=${{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div style=${{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style=${{ background: 'var(--color-accent)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                        <div>
                            <strong style=${{ display: 'block', marginBottom: '4px', color: 'var(--color-secondary)' }}>Explore the 3D Lab</strong>
                            <p style=${{ margin: 0, color: 'var(--color-text-dim)' }}>Visualize the "Mountain" in 3D. Play with the controls to see how step size affects the path down.</p>
                        </div>
                    </div>

                    <div style=${{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style=${{ background: 'var(--color-accent)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                        <div>
                            <strong style=${{ display: 'block', marginBottom: '4px', color: 'var(--color-secondary)' }}>Analyze in 2D Studio</strong>
                            <p style=${{ margin: 0, color: 'var(--color-text-dim)' }}>See the "Map View" (Contours) and track the exact error curve over time.</p>
                        </div>
                    </div>

                    <div style=${{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style=${{ background: 'var(--color-accent)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                        <div>
                            <strong style=${{ display: 'block', marginBottom: '4px', color: 'var(--color-secondary)' }}>Test Your Knowledge</strong>
                            <p style=${{ margin: 0, color: 'var(--color-text-dim)' }}>Head to the Quiz Mode to challenge your understanding of Learning Rates and Local Minima.</p>
                        </div>
                    </div>

                    <div style=${{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                        <a href="#/playground" style=${{ textDecoration: 'none' }}>
                            <${Button} icon=${ArrowRight} variant="primary">Start Exploration<//>
                        </a>
                    </div>
                <//>
            </div>
        </div>
    `;
};

export default Introduction;
