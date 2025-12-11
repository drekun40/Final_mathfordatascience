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
        fontSize: '1.6rem',
        color: 'var(--color-primary)',
        marginBottom: '20px',
        fontFamily: 'var(--font-serif)',
        borderBottom: '2px solid var(--color-border)',
        paddingBottom: '12px'
    };

    const subTitleStyle = {
        fontSize: '1.2rem',
        color: 'var(--color-secondary)',
        fontWeight: '600',
        marginBottom: '8px',
        marginTop: '24px'
    };

    const paragraphStyle = {
        fontSize: '1.05rem',
        lineHeight: '1.7',
        color: 'var(--color-text)',
        marginBottom: '16px'
    };

    const conceptBoxStyle = {
        background: 'rgba(255,255,255,0.6)',
        borderLeft: '4px solid var(--color-accent)',
        padding: '16px',
        borderRadius: '4px',
        marginBottom: '24px'
    };

    return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                
                <!-- HERO SECTION -->
                <${GlassCard} style=${{ textAlign: 'center', padding: '40px 30px' }}>
                    <h1 style=${headerStyle}>Gradient Descent Explorer</h1>
                    <p style=${{ fontSize: '1.2rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
                        Welcome to the Mercyhurst Computational Observatory.
                        <br/>
                        A beginner's guide to the "Engine of AI".
                    </p>
                    
                    <div style=${{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                         <a href="#/playground" style=${{ textDecoration: 'none' }}>
                            <${Button} variant="primary" size="large">Start Experiment →<//>
                        </a>
                    </div>
                <//>

                <!-- THEORY PART 1: THE ANALOGY -->
                <${GlassCard}>
                    <h2 style=${sectionTitleStyle}>Part 1: The Intuition</h2>
                    
                    <h3 style=${subTitleStyle}>The Mountain in the Fog</h3>
                    <p style=${paragraphStyle}>
                        Imagine you are lost on a huge mountain range at night. It's pitch black, and you can only see the ground directly beneath your feet. You want to get to the very bottom of the lowest valley (the village) because that's where it's safe.
                    </p>
                    <p style=${paragraphStyle}>
                        Since you can't see the whole map, what do you do?
                        <br/><br/>
                        <strong>You feel the slope of the ground under your feet.</strong> If the ground slopes down to the right, you take a step to the right. Then you stop, feel the slope again, and take another step. 
                    </p>
                    <div style=${conceptBoxStyle}>
                        <strong>This is Gradient Descent.</strong>
                        <ul style=${{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                            <li>The <strong>Mountain</strong> is the Error (we want to get to the bottom).</li>
                            <li>The <strong>Slope</strong> is the Gradient (tells us which way is down).</li>
                            <li>The <strong>Step Size</strong> is the Learning Rate (how far we walk).</li>
                        </ul>
                    </div>
                <//>

                <!-- THEORY PART 2: KEY CONCEPTS -->
                <${GlassCard}>
                    <h2 style=${sectionTitleStyle}>Part 2: The Vocabulary</h2>

                    <h3 style=${subTitleStyle}>1. The Loss Function (The "Mountain")</h3>
                    <p style=${paragraphStyle}>
                        In Machine Learning, we want our model to make good predictions. The "Loss" is a score of how <em>bad</em> the model is currently doing.
                        <br/>
                        <strong>High Loss = Bad Model (High on the mountain)</strong>
                        <br/>
                        <strong>Low Loss = Good Model (Low in the valley)</strong>
                    </p>

                    <h3 style=${subTitleStyle}>2. The Gradient (The "Compass")</h3>
                    <p style=${paragraphStyle}>
                        The Gradient is just a fancy word for "slope" or "steepness". It tells the math exactly which direction will increase the error the fastest. To improve the model, we simply go the <em>opposite</em> direction.
                    </p>

                    <h3 style=${subTitleStyle}>3. The Learning Rate (The "Stride")</h3>
                    <p style=${paragraphStyle}>
                        How big of a step should we take?
                    </p>
                    <ul style=${{ listStyle: 'disc', paddingLeft: '24px', lineHeight: '1.6', color: 'var(--color-text)' }}>
                        <li><strong>Too Small:</strong> You will reach the bottom eventually, but it might take 10,000 years (slow training).</li>
                        <li><strong>Too Big:</strong> You might jump right over the valley and land on the other side (overshooting).</li>
                        <li><strong>Just Right:</strong> You descend quickly and safely.</li>
                    </ul>
                <//>

                <!-- GUIDE SECTION -->
                <${GlassCard}>
                    <h2 style=${sectionTitleStyle}>How to use this Observatory</h2>
                    <p style=${paragraphStyle}>
                        Now that you know the theory, try it yourself in the tabs above:
                    </p>
                    <div style=${{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        <div style=${{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style=${{ background: 'var(--color-bg)', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold' }}>3D Lab</div>
                            <div style=${{ color: 'var(--color-text-dim)' }}>Visually watch the ball roll down the hill. Tweak the Learning Rate to see it succeed or fail.</div>
                        </div>

                        <div style=${{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style=${{ background: 'var(--color-bg)', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold' }}>2D Studio</div>
                            <div style=${{ color: 'var(--color-text-dim)' }}>Adjust the slope (m) and intercept (b) of a line to match data points. Minimizing the "MSE" is the same as finding the bottom of the valley!</div>
                        </div>

                        <div style=${{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style=${{ background: 'var(--color-bg)', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold' }}>Quiz</div>
                            <div style=${{ color: 'var(--color-text-dim)' }}>Prove you understand the concepts of m, b, MSE, and Learning Rates.</div>
                        </div>

                    </div>
                <//>
            </div>
        </div>
    `;
};

export default Introduction;
