import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import html from '../htm.js';

// --- VISUAL ASSETS (SVG Components) ---
const MinimaDiagram = () => html`
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '160px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 20 40 Q 100 240 180 80 T 380 40" fill="none" stroke="var(--color-secondary)" strokeWidth="4" />
        <!-- Points -->
        <circle cx="180" cy="80" r="10" fill="#ef4444" stroke="white" strokeWidth="2" /> <!-- A: Local Max -->
        <text x="170" y="60" fontSize="18" fill="#666" fontWeight="bold">A</text>

        <circle cx="100" cy="170" r="10" fill="#10b981" stroke="white" strokeWidth="2" /> <!-- B: Minimum -->
        <text x="90" y="200" fontSize="18" fill="#666" fontWeight="bold">B</text>
        
        <circle cx="300" cy="120" r="10" fill="#3b82f6" stroke="white" strokeWidth="2" /> <!-- C: Slope -->
        <text x="290" y="150" fontSize="18" fill="#666" fontWeight="bold">C</text>
    </svg>
`;

const LearningRateDiagram = () => html`
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '160px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 20 180 Q 200 180 380 20" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="8" />
        <!-- Hill -->
        <path d="M 40 160 L 360 40" fill="none" stroke="var(--color-primary)" strokeWidth="3" opacity="0.3" />
        
        <!-- Big Step -->
        <line x1="80" y1="140" x2="320" y2="50" stroke="#ef4444" strokeWidth="6" marker-end="url(#arrowhead)" />
        <text x="180" y="80" fontSize="16" fill="#ef4444" fontWeight="bold">Step A</text>

        <!-- Small Step -->
        <line x1="80" y1="150" x2="120" y2="135" stroke="#10b981" strokeWidth="6" />
        <text x="70" y="180" fontSize="16" fill="#10b981" fontWeight="bold">Step B</text>
    </svg>
`;

const SaddlePointDiagram = () => html`
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '160px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <!-- Abstract Saddle Representation -->
        <path d="M 50 150 Q 200 50 350 150" fill="none" stroke="var(--color-secondary)" strokeWidth="4" />
        <path d="M 200 50 Q 200 150 200 180" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="4" />
        
        <circle cx="200" cy="100" r="12" fill="#f59e0b" stroke="white" strokeWidth="2"/>
        <text x="220" y="100" fontSize="16" fill="#666">Point X</text>
        <text x="20" y="30" fontSize="14" fill="#999">Flat slope, but not min or max</text>
    </svg>
`;

const DivergenceDiagram = () => html`
     <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '160px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 200 180 L 180 140 L 220 100 L 160 40 L 260 0" fill="none" stroke="#ef4444" strokeWidth="3" />
        <circle cx="200" cy="180" r="6" fill="var(--color-primary)" />
        <text x="180" y="195" fontSize="14" fill="#666">Start</text>
        <text x="270" y="20" fontSize="14" fill="#ef4444">Exploding!</text>
    </svg>
`;

// ... (questions array unchanged)

// ...

// --- CONSISTENT MERCYHURST LAYOUT (Compacted) ---
// Note: Scrolling is now handled by Reset.js container
const pageStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px 16px'
};

const contentContainer = {
    width: '100%',
    maxWidth: '800px', // Reduced from 1000px for better vertical fit
    display: 'flex',
    flexDirection: 'column',
};

const cardStyle = {
    width: '100%',
    padding: '24px', // Reduced from 40px
    marginTop: '16px'
};

// ... (rest of styles)

if (isFinished) {
    return html`
            <div style=${pageStyle}>
                <div style=${contentContainer}>
                    <${GlassCard} style=${{ ...cardStyle, textAlign: 'center' }}>
                        <${Award} size=${64} color="var(--color-primary)" style=${{ marginBottom: '24px' }} />
                        <h2 style=${headerStyle}>Assessment Complete</h2>
                        <p style=${{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--color-secondary)', fontWeight: 'bold' }}>
                            Score: ${score} / ${questions.length}
                        </p>
                        <p style=${{ color: 'var(--color-text-dim)', marginBottom: '32px', lineHeight: 1.6 }}>
                            ${score >= 4 ? "Outstanding!" : "Good practice."}
                        </p>
                        <${Button} onClick=${reset} icon=${RotateCcw} size="large">Retake Quiz<//>
                    <//>
                </div>
            </div>
        `;
}

const VisualComponent = questions[current].visual;

return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                <!-- Progress Bar -->
                <div style=${{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '24px' }}>
                    <div style=${{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--color-accent)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                </div>

                <${GlassCard} style=${cardStyle}>
                    <div style=${subheaderStyle}>Question ${current + 1} of ${questions.length}</div>
                    
                    ${VisualComponent && html`<div style=${{ marginBottom: '24px', padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}><${VisualComponent} /></div>`}
                    
                    <h2 style=${headerStyle}>${questions[current].text}</h2>

                    <div style=${{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        ${questions[current].options.map((opt, idx) => html`
                            <div 
                                key=${idx} 
                                style=${optionStyle(idx)}
                                onClick=${() => handleSelect(idx)}
                            >
                                <span style=${{ marginRight: '10px' }}>${opt}</span>
                                ${selected !== null && idx === questions[current].correct && html`<${CheckCircle} size=${20} color="#10b981" />`}
                                ${selected !== null && idx === selected && idx !== questions[current].correct && html`<${XCircle} size=${20} color="#ef4444" />`}
                            </div>
                        `)}
                    </div>

                    ${selected !== null && html`
                        <div style=${{ marginTop: '24px', padding: '16px', borderRadius: '8px', background: '#f8fafc', borderLeft: '4px solid var(--color-accent)', animation: 'fadeIn 0.3s ease' }}>
                            <strong style=${{ fontSize: '1.05rem', color: selected === questions[current].correct ? '#059669' : '#d97706' }}>
                                ${selected === questions[current].correct ? "Correct!" : "Explanation:"}
                            </strong>
                            <p style=${{ margin: '8px 0 0 0', color: 'var(--color-text)', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                ${questions[current].explanation}
                            </p>
                            <div style=${{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                <${Button} onClick=${nextQuestion} icon=${ArrowRight} variant="primary">Next<//>
                            </div>
                        </div>
                    `}
                </${GlassCard}>
            </div>
        </div>
    `;
};

export default Quiz;
