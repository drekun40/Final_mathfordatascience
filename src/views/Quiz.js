import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import html from '../htm.js';

// --- VISUAL ASSETS (SVG Components) ---
const MinimaDiagram = () => html`
    <svg viewBox="0 0 200 100" style=${{ width: '100%', height: '150px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 10 20 Q 50 120 90 40 T 190 20" fill="none" stroke="var(--color-secondary)" strokeWidth="3" />
        <!-- Points -->
        <circle cx="90" cy="40" r="6" fill="#ef4444" /> <!-- A: Local Max -->
        <text x="85" y="30" fontSize="14" fill="#666">A</text>

        <circle cx="50" cy="85" r="6" fill="#10b981" /> <!-- B: Minimum -->
        <text x="45" y="105" fontSize="14" fill="#666">B</text>
        
        <circle cx="150" cy="60" r="6" fill="#3b82f6" /> <!-- C: Slope -->
        <text x="145" y="80" fontSize="14" fill="#666">C</text>
    </svg>
`;

const LearningRateDiagram = () => html`
    <svg viewBox="0 0 200 100" style=${{ width: '100%', height: '150px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 10 90 Q 100 90 190 10" fill="none" stroke="#ddd" strokeWidth="2" strokeDasharray="4" />
        <!-- Hill -->
        <path d="M 20 80 L 180 20" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
        
        <!-- Big Step -->
        <line x1="40" y1="70" x2="160" y2="25" stroke="#ef4444" strokeWidth="4" marker-end="url(#arrowhead)" />
        <text x="80" y="40" fontSize="12" fill="#ef4444">Arrow A (Big Jump)</text>

        <!-- Small Step -->
        <line x1="40" y1="75" x2="60" y2="67" stroke="#10b981" strokeWidth="4" />
        <text x="35" y="90" fontSize="12" fill="#10b981">Arrow B (Small Step)</text>
    </svg>
`;

const questions = [
    {
        id: 1,
        text: "Which labelled point represents a 'Local Minimum'?",
        visual: MinimaDiagram,
        options: [
            "Point A (The Peak)",
            "Point B (The Valley Bottom)",
            "Point C (The Slope)",
            "None of the above"
        ],
        correct: 1, // B
        explanation: "Correct! The bottom of the valley (B) is where the slope is zero and the function value is lowest in that neighborhood."
    },
    {
        id: 2,
        text: "Which arrow represents a High Learning Rate?",
        visual: LearningRateDiagram,
        options: [
            "Arrow A (The Red Long Jump)",
            "Arrow B (The Green Short Step)",
            "Both represent the same rate",
            "Neither"
        ],
        correct: 0,
        explanation: "Yes! A high learning rate takes huge steps. While faster, it risks 'overshooting' the goal, as shown by Arrow A flying past the target."
    },
    {
        id: 3,
        text: "In the 2D Studio, what defines the 'Loss'?",
        options: [
            "The distance between the regression line and the data points.",
            "The steepness of the gradient.",
            "The speed of the animation.",
            "The number of iterations."
        ],
        correct: 0,
        explanation: "Precisely. The 'Loss' (or MSE) measures the error: how far off our prediction line is from the actual data."
    }
];

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null); // null, or index 0-3
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (idx) => {
        if (selected !== null) return; // Prevent changing answer
        setSelected(idx);
        if (idx === questions[current].correct) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (current < questions.length - 1) {
            setCurrent(c => c + 1);
            setSelected(null);
        } else {
            setIsFinished(true);
        }
    };

    const reset = () => {
        setCurrent(0);
        setScore(0);
        setSelected(null);
        setIsFinished(false);
    };

    // --- STYLES ---
    const layoutStyle = {
        padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--color-bg)',
        overflowY: 'auto'
    };

    const cardStyle = {
        maxWidth: '600px',
        width: '100%',
        padding: '32px',
        margin: '20px'
    };

    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginTop: 0,
        marginBottom: '16px',
        textAlign: 'center'
    };

    const progressStyle = {
        fontSize: '0.9rem',
        color: 'var(--color-text-dim)',
        marginBottom: '24px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)'
    };

    const optionStyle = (idx) => ({
        padding: '16px',
        margin: '8px 0',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: selected === null
            ? 'var(--color-border)'
            : (idx === questions[current].correct ? '#10b981' : (idx === selected ? '#ef4444' : 'var(--color-border)')),
        background: selected === null
            ? 'white'
            : (idx === questions[current].correct ? '#ecfdf5' : (idx === selected ? '#fef2f2' : 'white')),
        cursor: selected === null ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 500,
        color: 'var(--color-text)'
    });

    const feedbackStyle = {
        marginTop: '24px',
        padding: '16px',
        borderRadius: '8px',
        background: '#f8fafc',
        borderLeft: '4px solid var(--color-accent)',
        animation: 'fadeIn 0.3s ease'
    };

    const resultStyle = {
        textAlign: 'center',
        animation: 'scaleIn 0.3s ease'
    };

    if (isFinished) {
        return html`
            <div style=${layoutStyle}>
                <${GlassCard} style=${cardStyle}>
                    <div style=${resultStyle}>
                        <${Award} size=${64} color="var(--color-primary)" style=${{ marginBottom: '16px' }} />
                        <h2 style=${headerStyle}>Assessment Complete</h2>
                        <p style=${{ fontSize: '1.2rem', marginBottom: '24px' }}>
                            You scored <strong>${score} / ${questions.length}</strong>
                        </p>
                        <p style=${{ color: 'var(--color-text-dim)', marginBottom: '32px' }}>
                            ${score === questions.length ? "Excellent! You have a strong grasp of optimization theory." : "Good effort. Review the labs to deepen your intuition."}
                        </p>
                        <${Button} onClick=${reset} icon=${RotateCcw} style=${{ margin: '0 auto' }}>Retake Quiz<//>
                    </div>
                <//>
            </div>
        `;
    }

    const VisualComponent = questions[current].visual;

    return html`
        <div style=${layoutStyle}>
            <${GlassCard} style=${cardStyle}>
                <div style=${progressStyle}>Question ${current + 1} of ${questions.length}</div>
                
                ${VisualComponent && html`<${VisualComponent} />`}
                
                <h2 style=${headerStyle}>${questions[current].text}</h2>

                <div>
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
                    <div style=${feedbackStyle}>
                        <strong>${selected === questions[current].correct ? "Correct!" : "Note:"}</strong>
                        <p style=${{ margin: '8px 0 0 0', color: 'var(--color-text-dim)' }}>
                            ${questions[current].explanation}
                        </p>
                        <div style=${{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                            <${Button} onClick=${nextQuestion} icon=${ArrowRight} variant="primary">Next<//>
                        </div>
                    </div>
                `}
            </${GlassCard}>
        </div>
    `;
};

export default Quiz;
