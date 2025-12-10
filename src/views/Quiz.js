import React, { useState } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import { CheckCircle, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import html from '../htm.js';

const questions = [
    {
        id: 1,
        text: "What does the 'Gradient' vector represent in optimization?",
        options: [
            "The direction of steepest descent (downhill).",
            "The direction of steepest ascent (uphill).",
            "The current value of the loss function.",
            "The shortest path to the global minimum."
        ],
        correct: 1, // 0-indexed
        explanation: "Correct! The gradient points in the direction of steepest increase. We subtract it (Go opposite) to minimize loss."
    },
    {
        id: 2,
        text: "If the Learning Rate (α) is set too high, what is the likely outcome?",
        options: [
            "The model will converge very slowly.",
            "The algorithm may overshoot the minimum and diverge.",
            "The loss function will become convex.",
            "The computation time will decrease linearly."
        ],
        correct: 1,
        explanation: "Exactly. A large step size can cause the optimizer to bounce across the valley or spiral out of control."
    },
    {
        id: 3,
        text: "What is a 'Local Minimum'?",
        options: [
            "The lowest point in the entire landscape.",
            "A point lower than its immediate neighbors, but not necessarily the lowest overall.",
            "The starting point of the descent.",
            "A point where the gradient is infinite."
        ],
        correct: 1,
        explanation: "Right. In complex landscapes, gradient descent can get 'stuck' in these valleys, missing the true global best solution."
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
        padding: '40px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--color-bg)'
    };

    const cardStyle = {
        maxWidth: '600px',
        width: '100%',
        padding: '32px'
    };

    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        marginTop: 0,
        marginBottom: '24px',
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
        fontWeight: 500
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

    return html`
        <div style=${layoutStyle}>
            <${GlassCard} style=${cardStyle}>
                <div style=${progressStyle}>Question ${current + 1} of ${questions.length}</div>
                
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
