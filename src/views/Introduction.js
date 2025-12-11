import React from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { ArrowRight, Mountain, TrendingDown, Target } from 'lucide-react';
import html from '../htm.js';

const Introduction = () => {

    // --- STYLES ---
    // Matches Quiz.js convention, but allows content to flow since Intro is longer
    const pageStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px',
        minHeight: '100%' // Ensure it takes at least full height
    };

    const contentContainer = {
        width: '100%',
        maxWidth: '900px', // Consistent width with Quiz
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
    };

    const headerStyle = {
        fontSize: '2.5rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-accent)',
        paddingBottom: '24px',
        textAlign: 'center'
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                
                <!-- Hero Section -->
                <div style=${{ textAlign: 'center' }}>
                    <h1 style=${headerStyle}>Welcome to Gradient Descent</h1>
                    <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                        An interactive guide to understanding how machines learn. 
                        Master the algorithm that powers modern Artificial Intelligence.
                    </p>
                </div>

                <!-- Concepts Cards -->
                <div>
                    <h2 style=${{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', textAlign: 'center', marginBottom: '24px' }}>Core Concepts</h2>
                    <div style=${cardGridStyle}>
                        <${GlassCard}>
                            <div style=${iconBoxStyle}><${Mountain} size=${24} /><//>
                            <h3 style=${stepTitleStyle}>The Landscape</h3>
                            <p style=${{ lineHeight: 1.5, color: 'var(--color-text)' }}>Imagine standing on a mountain at night. Your goal is to find the lowest point in the valley (minimize Loss).</p>
                        <//>
                        
                        <${GlassCard}>
                            <div style=${iconBoxStyle}><${TrendingDown} size=${24} /><//>
                            <h3 style=${stepTitleStyle}>The Slope</h3>
                            <p style=${{ lineHeight: 1.5, color: 'var(--color-text)' }}>Feel the steepness under your feet. The <strong>Gradient</strong> tells you which direction is uphill, so you go the other way.</p>
                        <//>

                        <${GlassCard}>
                            <div style=${iconBoxStyle}><${Target} size=${24} /><//>
                            <h3 style=${stepTitleStyle}>The Step</h3>
                            <p style=${{ lineHeight: 1.5, color: 'var(--color-text)' }}>You take a step downhill. The size of this step is the <strong>Learning Rate</strong>—too big, you miss; too small, it takes forever.</p>
                        <//>
                    </div>
                </div>

                <!-- Guide Section -->
                <div>
                    <h2 style=${{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', textAlign: 'center', marginBottom: '24px' }}>Your Journey</h2>
                    <${GlassCard} style=${{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
                        
                        <div style=${{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style=${{ background: 'var(--color-accent)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '1.1rem' }}>1</div>
                            <div>
                                <strong style=${{ display: 'block', marginBottom: '6px', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>Explore in 3D</strong>
                                <p style=${{ margin: 0, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>Visualize the "Mountain" in 3D space. Adjust parameters to see how the path to the bottom changes.</p>
                            </div>
                        </div>

                        <div style=${{ height: '1px', background: '#e2e8f0', margin: '0 10px' }}></div>

                        <div style=${{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style=${{ background: 'var(--color-accent)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '1.1rem' }}>2</div>
                            <div>
                                <strong style=${{ display: 'block', marginBottom: '6px', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>Analyze in 2D</strong>
                                <p style=${{ margin: 0, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>Switch to the Contour Map to track the exact path and error values with precision.</p>
                            </div>
                        </div>

                        <div style=${{ height: '1px', background: '#e2e8f0', margin: '0 10px' }}></div>

                        <div style=${{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style=${{ background: 'var(--color-accent)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, fontSize: '1.1rem' }}>3</div>
                            <div>
                                <strong style=${{ display: 'block', marginBottom: '6px', color: 'var(--color-secondary)', fontSize: '1.1rem' }}>Master the Quiz</strong>
                                <p style=${{ margin: 0, color: 'var(--color-text-dim)', lineHeight: 1.5 }}>Challenge yourself with visual questions to prove your understanding.</p>
                            </div>
                        </div>

                        <div style=${{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                            <a href="#/playground" style=${{ textDecoration: 'none' }}>
                                <${Button} icon=${ArrowRight} variant="primary" size="large">Begin Observatory<//>
                            </a>
                        </div>
                    <//>
                </div>
            </div>
        </div>
    `;
};

export default Introduction;
