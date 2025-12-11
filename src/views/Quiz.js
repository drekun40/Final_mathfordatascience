import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import html from '../htm.js';

// --- VISUAL ASSETS (SVG Components) ---
const MinimaDiagram = () => html`
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '140px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
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
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '140px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
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
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '140px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <!-- Abstract Saddle Representation -->
        <path d="M 50 150 Q 200 50 350 150" fill="none" stroke="var(--color-secondary)" strokeWidth="4" />
        <path d="M 200 50 Q 200 150 200 180" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="4" />
        
        <circle cx="200" cy="100" r="12" fill="#f59e0b" stroke="white" strokeWidth="2"/>
        <text x="220" y="100" fontSize="16" fill="#666">Point X</text>
        <text x="20" y="30" fontSize="14" fill="#999">Flat slope, but not min or max</text>
    </svg>
`;

const DivergenceDiagram = () => html`
     <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '140px', background: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
        <path d="M 200 180 L 180 140 L 220 100 L 160 40 L 260 0" fill="none" stroke="#ef4444" strokeWidth="3" />
        <circle cx="200" cy="180" r="6" fill="var(--color-primary)" />
        <text x="180" y="195" fontSize="14" fill="#666">Start</text>
        <text x="270" y="20" fontSize="14" fill="#ef4444">Exploding!</text>
    </svg>
`;

const questions = [
    {
        id: 1,
        text: "Which labelled point represents a 'Local Minimum'?",
        // visual: REMOVED for simplicity
        options: [
            "The highest peak on the graph",
            "The lowest point in a local valley",
            "Any point with a steep slope",
            "A point where the function explodes"
        ],
        correct: 1,
        explanation: "Correct! A Local Minimum is the bottom of a valley where the slope is zero and surrounding points are higher."
    },
    {
        id: 2,
        text: "Which step size represents a very High Learning Rate?",
        visual: LearningRateDiagram, // Keeping this as it's visual-dependent
        options: [
            "Step A (The Giant Leap)",
            "Step B (The Small Nudge)",
            "Both are equal",
            "Impossible to tell"
        ],
        correct: 0,
        explanation: "Yes! Step A is huge. If the Learning Rate is too high, the algorithm jumps straight past the minimum."
    },
    {
        id: 3,
        text: "What is special about a 'Saddle Point'?",
        // visual: REMOVED
        options: [
            "It is the global minimum.",
            "It is the global maximum.",
            "The slope is zero, but it is neither a min nor a max.",
            "The gradient is infinite."
        ],
        correct: 2,
        explanation: "Exactly. At a saddle point, the gradient is zero (flat), which can trick the algorithm into thinking it's finished."
    },
    {
        id: 4,
        text: "What is happening in this divergence graph?",
        visual: DivergenceDiagram, // Keeping this as it's visual-dependent
        options: [
            "The model is learning perfectly.",
            "The Learning Rate is too high (Exploding).",
            "The model has found the minimum.",
            "The data is corrupt."
        ],
        correct: 1,
        explanation: "Correct. The path is oscillating and getting further away. This 'explosion' happens when step sizes are too large."
    },
    {
        id: 5,
        text: "In the 2D Studio Regression, what are we optimizing?",
        // Text-only question
        options: [
            "The slope (m) and intercept (b).",
            "The X and Y values of data points.",
            "The color of the line.",
            "The graph size."
        ],
        correct: 0,
        explanation: "Spot on. We tweak 'm' and 'b' to minimize the error between the line and the points."
    }
];

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (idx) => {
        if (selected !== null) return;
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

    // --- CONSISTENT MERCYHURST LAYOUT (Single Page Fit) ---
    const pageStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
    };

    const contentContainer = {
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
    };

    const cardStyle = {
        width: '100%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto'
    };

    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginTop: 0,
        marginBottom: '16px',
        textAlign: 'center',
        fontSize: '1.4rem'
    };

    const subheaderStyle = {
        textAlign: 'center',
        color: 'var(--color-text-dim)',
        marginBottom: '16px',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9rem'
    };

    const optionsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px',
        marginTop: '8px'
    };

    const optionStyle = (idx) => ({
        padding: '16px',
        borderRadius: '8px',
        border: '2px solid',
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
        fontSize: '0.95rem',
        color: 'var(--color-text)',
        minHeight: '60px'
    });

    if (isFinished) {
        return html`
            <div style=${pageStyle}>
                <div style=${contentContainer}>
                    <${GlassCard} style=${{ ...cardStyle, textAlign: 'center', justifyContent: 'center' }}>
                        <div style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <${Award} size=${64} color="var(--color-primary)" />
                            <h2 style=${headerStyle}>Assessment Complete</h2>
                            <p style=${{ fontSize: '1.5rem', color: 'var(--color-secondary)', fontWeight: 'bold', margin: 0 }}>
                                Score: ${score} / ${questions.length}
                            </p>
                            <p style=${{ color: 'var(--color-text-dim)', lineHeight: 1.5, margin: 0 }}>
                                ${score >= 4 ? "Outstanding work!" : "Good practice."}
                            </p>
                            <${Button} onClick=${reset} icon=${RotateCcw} size="large">Retake Quiz<//>
                        </div>
                    <//>
                </div>
            </div>
        `;
    }

    const VisualComponent = questions[current].visual;

    return html`
        <div style=${pageStyle}>
            <div style=${contentContainer}>
                <div style=${{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '16px', flexShrink: 0 }}>
                    <div style=${{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--color-accent)', borderRadius: '2px', transition: 'width 0.3s ease' }}></div>
                </div>

                <${GlassCard} style=${cardStyle}>
                    <div style=${subheaderStyle}>Question ${current + 1} of ${questions.length}</div>
                    
                    ${VisualComponent && html`
                        <div style=${{
                marginBottom: '16px',
                padding: '8px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                height: '140px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
            }}>
                            <${VisualComponent} />
                        </div>
                    `}
                    
                    <h2 style=${headerStyle}>${questions[current].text}</h2>

                    <div style=${optionsGridStyle}>
                        ${questions[current].options.map((opt, idx) => html`
                            <div 
                                key=${idx} 
                                style=${optionStyle(idx)}
                                onClick=${() => handleSelect(idx)}
                            >
                                <span style=${{ marginRight: '8px' }}>${opt}</span>
                                ${selected !== null && idx === questions[current].correct && html`<${CheckCircle} size=${18} color="#10b981" />`}
                                ${selected !== null && idx === selected && idx !== questions[current].correct && html`<${XCircle} size=${18} color="#ef4444" />`}
                            </div>
                        `)}
                    </div>

                    ${selected !== null && html`
                        <div style=${{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: '#f8fafc', borderLeft: '4px solid var(--color-accent)', animation: 'fadeIn 0.3s ease' }}>
                            <strong style=${{ fontSize: '0.95rem', color: selected === questions[current].correct ? '#059669' : '#d97706' }}>
                                ${selected === questions[current].correct ? "Correct!" : "Explanation:"}
                            </strong>
                            <p style=${{ margin: '4px 0 0 0', color: 'var(--color-text)', lineHeight: 1.4, fontSize: '0.9rem' }}>
                                ${questions[current].explanation}
                            </p>
                            <div style=${{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                                <${Button} onClick=${nextQuestion} icon=${ArrowRight} variant="primary" size="small">Next<//>
                            </div>
                        </div>
                    `}
                </${GlassCard}>
            </div>
        </div>
    `;
};

export default Quiz;
