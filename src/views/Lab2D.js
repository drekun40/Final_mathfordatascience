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
    // Responsive Layout: Stacks vertically on small screens, side-by-side on large
    const layoutStyle = {
        padding: '24px',
        minHeight: 'calc(100vh - 64px)',
        background: 'var(--color-bg)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        alignContent: 'flex-start'
    };

    const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: '1 1 350px', // Grow, shrink, base width 350px
        minWidth: '300px',
        maxWidth: '100%'
    };

    const chartStyle = {
        flex: 1,
        minHeight: '200px',
        position: 'relative',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        background: '#fff',
        padding: '12px'
    };

    const h3Style = {
        margin: '0 0 12px 0',
        color: 'var(--color-secondary)',
        fontFamily: 'var(--font-serif)',
        fontSize: '1.2rem'
    };

    const captionStyle = {
        fontSize: '0.8rem',
        color: 'var(--color-text-dim)',
        marginTop: '8px',
        fontStyle: 'italic'
    };

    return html`
        <div style=${layoutStyle}>
            
            <!-- Left Panel: Controls & Telemetry -->
            <div style=${panelStyle}>
                
                <!-- Controls Card -->
                <${GlassCard}>
                    <h3 style=${h3Style}>Analysis Controls</h3>
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

                <!-- Loss Curve Card -->
                <${GlassCard} style=${{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style=${h3Style}>Loss Curve</h3>
                    <div style=${chartStyle}>
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
                    <p style=${captionStyle}>
                        This graph shows how quickly the error (Cost) decreases over time.
                    </p>
                <//>

                <!-- Theory Card -->
                <${GlassCard} style=${{ borderLeft: '4px solid var(--color-primary)' }}>
                    <h4 style=${{ margin: '0 0 8px 0', color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>Concept: Contour Maps</h4>
                    <p style=${{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: 1.5, margin: 0 }}>
                        Contour lines represent points of <strong>equal height</strong> (loss).
                        When the lines are close together, the slope is steep.
                        The algorithm moves perpendicular to these lines, seeking the center (minimum).
                    </p>
                <//>
            </div>

            <!-- Right Panel: Contour Studio -->
            <div style=${{ flex: '2 1 500px', minHeight: '500px', position: 'relative', minWidth: '300px' }}>
                <${GlassCard} style=${{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', padding: 0, overflow: 'hidden' }}>
                    <h3 style=${{ position: 'absolute', top: 20, right: 30, margin: 0, color: 'var(--color-text-dim)', opacity: 0.5, pointerEvents: 'none' }}>Topological View</h3>
                    
                    <svg width="90%" height="90%" viewBox="-12 -12 24 24" style=${{ overflow: 'visible' }}>
                        <!-- Axes -->
                        <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--color-border)" strokeWidth="0.05" />
                        <line x1="0" y1="-12" x2="0" y2="12" stroke="var(--color-border)" strokeWidth="0.05" />

                        <!-- Contours -->
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => html`
                            <circle key=${r} cx="0" cy="0" r=${r} fill="none" stroke="var(--color-primary)" strokeWidth="0.05" opacity="0.15" />
                        `)}

                        <!-- Path -->
                        <polyline 
                            points=${points.map(p => `${p.x},${p.y}`).join(' ')} 
                            fill="none" 
                            stroke="var(--color-secondary)" 
                            strokeWidth="0.15" 
                            strokeOpacity="0.8"
                            strokeLinejoin="round"
                        />

                        <!-- Points -->
                        ${points.map((p, i) => html`
                             <circle 
                                key=${i} 
                                cx=${p.x} 
                                cy=${p.y} 
                                r=${i === points.length - 1 ? 0.3 : 0.15}
                                fill=${i === points.length - 1 ? '#dc2626' : 'var(--color-primary)'}
                                opacity=${i === points.length - 1 ? 1 : 0.5}
                            />
                        `)}
                    </svg>
                <//>
            </div>

        </div>
    `;
};

export default Lab2D;
