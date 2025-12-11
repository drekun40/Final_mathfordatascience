import React from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
// NO EXTERNAL ICON IMPORTS to prevent crashes
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
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
    };

    const headerStyle = {
        fontSize: '2.5rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginBottom: '16px',
        textAlign: 'center'
    };

    const sectionTitleStyle = {
        fontSize: '1.4rem',
        color: 'var(--color-primary)',
        marginBottom: '20px',
        fontFamily: 'var(--font-serif)',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    };

    const listItemStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '20px',
        color: 'var(--color-text)',
        fontSize: '1.05rem',
        lineHeight: '1.5'
    };

    const circleNumberStyle = {
        background: 'var(--color-accent)',
        color: 'white',
        minWidth: '28px',
        height: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginTop: '2px'
    };

    return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                
                <${GlassCard} style=${{ textAlign: 'center', padding: '40px 30px' }}>
                    <h1 style=${headerStyle}>Gradient Descent Explorer</h1>
                    <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
                        Welcome to the Mercyhurst Computational Observatory.
                        <br/>
                        Master the algorithm behind modern AI.
                    </p>
                    
                    <div style=${{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                         <a href="#/playground" style=${{ textDecoration: 'none' }}>
                            <${Button} variant="primary" size="large">Start Experiment →<//>
                        </a>
                    </div>
                <//>

                <${GlassCard}>
                    <h2 style=${sectionTitleStyle}>How to use this tool</h2>
                    <div style=${{ display: 'flex', flexDirection: 'column' }}>
                        
                        <div style=${listItemStyle}>
                            <div style=${circleNumberStyle}>1</div>
                            <div>
                                <strong>3D Lab:</strong><br/>
                                Visualize the "Error Landscape". Watch how the ball rolls down the hill to find the lowest point (Minimum Error).
                            </div>
                        </div>

                        <div style=${listItemStyle}>
                            <div style=${circleNumberStyle}>2</div>
                            <div>
                                <strong>2D Studio:</strong><br/>
                                Fit a line to data points. Tweak the slope (m) and intercept (b) to reduce the Mean Squared Error (MSE).
                            </div>
                        </div>

                        <div style=${listItemStyle}>
                            <div style=${circleNumberStyle}>3</div>
                            <div>
                                <strong>Quiz Mode:</strong><br/>
                                Test your knowledge on the concepts you just practiced.
                            </div>
                        </div>

                    </div>
                <//>
            </div>
        </div>
    `;
};

export default Introduction;
