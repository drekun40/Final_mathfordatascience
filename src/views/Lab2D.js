import React, { useState, useEffect } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw } from 'lucide-react';
import html from '../htm.js';

// --- MATH LOGIC ---
const f = (x, y) => 0.1 * (x * x + y * y); // Same parabola
const df = (x, y) => ({ dx: 0.2 * x, dy: 0.2 * y });

const Lab2D = () => {
    const [lr, setLr] = useState(0.5);
    const [isAnimating, setIsAnimating] = useState(false);
    const [points, setPoints] = useState([{ x: 8, y: 8 }]);

    // Animation Loop
    useEffect(() => {
        let interval;
        if (isAnimating) {
            interval = setInterval(() => {
                setPoints(prev => {
                    const last = prev[prev.length - 1];
                    const grad = df(last.x, last.y);

                    if (Math.abs(last.x) < 0.1 && Math.abs(last.y) < 0.1) {
                        setIsAnimating(false);
                        return prev;
                    }

                    const newX = last.x - lr * grad.dx;
                    const newY = last.y - lr * grad.dy;
                    return [...prev, { x: newX, y: newY }];
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnimating, lr]);

    const reset = () => {
        setPoints([{ x: 8, y: 8 }]);
        setIsAnimating(false);
    };

    // Calculate Loss History
    const history = points.map((p, i) => ({ i, loss: f(p.x, p.y) }));

    // --- STYLES ---
    const layoutStyle = {
        padding: '24px',
        height: 'calc(100vh - 64px)',
        background: 'var(--color-bg)',
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '24px',
        boxSizing: 'border-box'
    };

    const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const headerStyle = {
        fontFamily: 'var(--font-serif)',
        color: 'var(--color-primary)',
        margin: '0 0 10px 0',
        fontSize: '1.5rem'
    };

    return html`
        <div style=${layoutStyle}>
            
            <!-- Left Panel: Controls & Telemetry -->
            <div style=${panelStyle}>
                <${GlassCard}>
                    <h3 style=${{ marginTop: 0, color: 'var(--color-secondary)' }}>Analysis Controls</h3>
                    <${Slider} 
                        label="Learning Rate (α)" 
                        value=${lr} 
                        min=${0.01} 
                        max=${1.5} 
                        step=${0.01} 
                        onChange=${setLr} 
                        formatValue=${v => v.toFixed(2)}
                    />
                    <div style=${{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <${Button} 
                            onClick=${() => setIsAnimating(!isAnimating)}
                            variant=${isAnimating ? 'secondary' : 'primary'}
                            icon=${isAnimating ? Pause : Play}
                            style=${{ flex: 1 }}
                        >
                            ${isAnimating ? 'Pause' : 'Run'}
                        <//>
                        <${Button} onClick=${reset} variant="secondary" icon=${RotateCcw} />
                    </div>
                <//>

                <${GlassCard} style=${{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style=${{ marginTop: 0, color: 'var(--color-secondary)' }}>Convergence Plot</h3>
                    <div style=${{ flex: 1, position: 'relative', borderLeft: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path 
                                d=${`M 0 100 ${history.map(h => `L ${h.i * 2} ${100 - h.loss * 5}`).join(' ')}`} 
                                fill="none" 
                                stroke="var(--color-accent)" 
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>
                <//>
            </div>

            <!-- Right Panel: Contour Studio -->
            <${GlassCard} style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
                <h3 style=${{ position: 'absolute', top: 20, right: 20, margin: 0, color: 'var(--color-text-dim)', opacity: 0.5 }}>Topological View</h3>
                
                <svg width="80%" height="80%" viewBox="-10 -10 20 20">
                    <!-- Axes -->
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--color-border)" strokeWidth="0.05" />
                    <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--color-border)" strokeWidth="0.05" />

                    <!-- Contours -->
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => html`
                        <circle key=${r} cx="0" cy="0" r=${r} fill="none" stroke="var(--color-primary)" strokeWidth="0.05" opacity="0.2" />
                    `)}

                    <!-- Path -->
                    <polyline 
                        points=${points.map(p => `${p.x},${-p.y}`).join(' ')} 
                        fill="none" 
                        stroke="var(--color-secondary)" 
                        strokeWidth="0.1" 
                        strokeOpacity="0.8"
                    />

                    <!-- Points -->
                    ${points.map((p, i) => html`
                         <circle 
                            key=${i} 
                            cx=${p.x} 
                            cy=${-p.y} 
                            r="0.3" 
                            fill=${i === points.length - 1 ? '#dc2626' : 'var(--color-primary)'}
                            opacity=${i === points.length - 1 ? 1 : 0.4}
                        />
                    `)}
                </svg>
            <//>

        </div>
    `;
};

export default Lab2D;
