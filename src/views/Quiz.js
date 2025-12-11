import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import html from '../htm.js';

// --- VISUAL ASSETS (SVG Components) ---
const MinimaDiagram = () => html`
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '8px', marginBottom: '24px' }}>
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
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '8px', marginBottom: '24px' }}>
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
    <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '8px', marginBottom: '24px' }}>
        <!-- Abstract Saddle Representation -->
        <path d="M 50 150 Q 200 50 350 150" fill="none" stroke="var(--color-secondary)" strokeWidth="4" />
        <path d="M 200 50 Q 200 150 200 180" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="4" />
        
        <circle cx="200" cy="100" r="12" fill="#f59e0b" stroke="white" strokeWidth="2"/>
        <text x="220" y="100" fontSize="16" fill="#666">Point X</text>
        <text x="20" y="30" fontSize="14" fill="#999">Flat slope, but not min or max</text>
    </svg>
`;

const DivergenceDiagram = () => html`
     <svg viewBox="0 0 400 200" style=${{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '8px', marginBottom: '24px' }}>
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
        text: "Which step size represents a very High Learning Rate?",
        visual: LearningRateDiagram,
        options: [
            "Step A (The Giant Leap)",
            "Step B (The Small Nudge)",
            "Both are equal",
            "Impossible to tell"
        ],
        correct: 0,
        explanation: "Yes! Step A is huge. If the Learning Rate is too high, the algorithm jumps straight past the minimum, often making things worse."
    },
    {
        id: 3,
        text: "What is special about 'Point X' (A Saddle Point)?",
        visual: SaddlePointDiagram,
        options: [
            "It is the global minimum.",
            "It is the global maximum.",
            "The slope is zero, but it is neither a min nor a max.",
            "The gradient is infinite."
        ],
        correct: 2,
        explanation: "Exactly. At a saddle point, the gradient is zero (flat), which can trick the algorithm into thinking it's finished even though it hasn't found the bottom."
    },
    {
        id: 4,
        text: "What is happening in this divergence graph?",
        visual: DivergenceDiagram,
        options: [
            "The model is learning perfectly.",
            "The Learning Rate is too high, causing 'Exploding Gradients'.",
            "The model has found the minimum.",
            "The data is corrupt."
        ],
        correct: 1,
        explanation: "Correct. The path is oscillating and getting further away from the center. This 'explosion' happens when step sizes are aggressively large."
    },
    {
        id: 5,
        text: "In the 2D Studio Regression, what are we optimizing?",
        options: [
            "The slope (m) and intercept (b) of the line.",
            "The X and Y values of the data points.",
            "The color of the line.",
            "The size of the graph."
        ],
        correct: 0,
        explanation: "Spot on. We tweak the parameters 'm' and 'b' to minimize the Mean Squared Error (Loss) between the line and the points."
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

    // --- CONSISTENT MERCYHURST LAYOUT ---
    const pageStyle = {
        padding: '24px 20px',
        maxWidth: '1000px', // Matches Introduction/Lab max-width feel
        margin: '0 auto',
        height: 'calc(100vh - 64px)', // Fix height to allow internal scroll
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align top for scrolling
        overflowY: 'auto' // ENABLE SCROLL
    };

    const cardStyle = {
        width: '100%',
        padding: '40px', // Generous padding
        marginTop: '20px'
    };

    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginTop: 0,
        marginBottom: '24px',
        textAlign: 'center',
        fontSize: '1.8rem'
    };

    const subheaderStyle = {
        textAlign: 'center',
        color: 'var(--color-text-dim)',
        marginBottom: '32px',
        fontFamily: 'var(--font-sans)',
        fontSize: '1.1rem'
    };

    const optionStyle = (idx) => ({
        padding: '20px',
        margin: '12px 0',
        borderRadius: '12px',
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
        fontSize: '1.05rem',
        color: 'var(--color-text)',
        boxShadow: selected === null ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
    });

    if (isFinished) {
        return html`
            <div style=${pageStyle}>
                <${GlassCard} style=${{ ...cardStyle, maxWidth: '600px', textAlign: 'center' }}>
                    <${Award} size=${80} color="var(--color-primary)" style=${{ marginBottom: '24px' }} />
                    <h2 style=${headerStyle}>Assessment Complete</h2>
                    <p style=${{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--color-secondary)', fontWeight: 'bold' }}>
                        Score: ${score} / ${questions.length}
                    </p>
                    <p style=${{ color: 'var(--color-text-dim)', marginBottom: '40px', lineHeight: 1.6 }}>
                        ${score >= 4 ? "Outstanding! You have mastered the core concepts of Gradient Descent." : "Good practice. Review the Theory sections in the Lab and try again!"}
                    </p>
                    <${Button} onClick=${reset} icon=${RotateCcw} size="large" style=${{ padding: '12px 32px' }}>Retake Quiz<//>
                <//>
            </div>
        `;
    }

    const VisualComponent = questions[current].visual;

    return html`
        <div style=${pageStyle}>
            <!-- Progress Bar -->
            <div style=${{ width: '100%', maxWidth: '800px', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '32px' }}>
                <div style=${{ width: `${((current + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--color-accent)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
            </div>

            <${GlassCard} style=${{ ...cardStyle, maxWidth: '800px' }}>
                <div style=${subheaderStyle}>Question ${current + 1} of ${questions.length}</div>
                
                ${VisualComponent && html`<div style=${{ marginBottom: '32px', padding: '10px', background: 'white', borderRadius: '12px', border: '1px solid var(--color-border)' }}><${VisualComponent} /></div>`}
                
                <h2 style=${headerStyle}>${questions[current].text}</h2>

                <div style=${{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    ${questions[current].options.map((opt, idx) => html`
                        <div 
                            key=${idx} 
                            style=${optionStyle(idx)}
                            onClick=${() => handleSelect(idx)}
                        >
                            <span style=${{ marginRight: '10px' }}>${opt}</span>
                            ${selected !== null && idx === questions[current].correct && html`<${CheckCircle} size=${24} color="#10b981" />`}
                            ${selected !== null && idx === selected && idx !== questions[current].correct && html`<${XCircle} size=${24} color="#ef4444" />`}
                        </div>
                    `)}
                </div>

                ${selected !== null && html`
                    <div style=${{ marginTop: '32px', padding: '24px', borderRadius: '12px', background: '#f8fafc', borderLeft: '6px solid var(--color-accent)', animation: 'fadeIn 0.3s ease' }}>
                        <strong style=${{ fontSize: '1.1rem', color: selected === questions[current].correct ? '#059669' : '#d97706' }}>
                            ${selected === questions[current].correct ? "Correct!" : "Explanation:"}
                        </strong>
                        <p style=${{ margin: '12px 0 0 0', color: 'var(--color-text)', lineHeight: 1.6, fontSize: '1rem' }}>
                            ${questions[current].explanation}
                        </p>
                        <div style=${{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                            <${Button} onClick=${nextQuestion} icon=${ArrowRight} variant="primary" size="large">Next<//>
                        </div>
                    </div>
                `}
            </${GlassCard}>
        </div>
    `;
};

export default Quiz;
