import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw, RefreshCw } from 'lucide-react';
import html from '../htm.js';

// --- MATH & REGRESSION LOGIC ---
const generateData = () => {
    // Generate linear-ish data: y = 0.5x + 2 + noise
    const points = [];
    for (let i = 0; i < 6; i++) {
        const x = i * 2 + 1; // 1, 3, 5, 7...
        const y = 0.5 * x + 2 + (Math.random() - 0.5) * 3;
        points.push({ x, y });
    }
    return points;
};

// Mean Squared Error
const computeLoss = (m, b, points) => {
    let sumError = 0;
    for (let p of points) sumError += (p.y - (m * p.x + b)) ** 2;
    return sumError / points.length;
};

// Gradient of MSE
const computeGradient = (m, b, points) => {
    let dm = 0;
    let db = 0;
    const n = points.length;
    for (let p of points) {
        const diff = p.y - (m * p.x + b);
        dm += -2 * p.x * diff;
        db += -2 * diff;
    }
    return { dm: dm / n, db: db / n };
};

const Lab2D = () => {
    // State
    const [data, setData] = useState(generateData());
    const [params, setParams] = useState({ m: 0, b: 0 }); // Current Slope/Intercept
    const [path, setPath] = useState([{ m: 0, b: 0 }]);   // History of steps
    const [lr, setLr] = useState(0.02);
    const [isAnimating, setIsAnimating] = useState(false);

    // Animation Loop
    useEffect(() => {
        let interval;
        if (isAnimating) {
            interval = setInterval(() => {
                setParams(current => {
                    const grads = computeGradient(current.m, current.b, data);

                    // Update Step
                    const nextM = current.m - lr * grads.dm;
                    const nextB = current.b - lr * grads.db;

                    // Stop if converged (tiny gradients)
                    if (Math.abs(grads.dm) < 0.001 && Math.abs(grads.db) < 0.001) {
                        setIsAnimating(false);
                        return current; // No change
                    }

                    // Update History (efficiently)
                    setPath(prev => [...prev, { m: nextM, b: nextB }]);
                    return { m: nextM, b: nextB };
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isAnimating, lr, data]);

    const reset = () => {
        setParams({ m: 0, b: 0 });
        setPath([{ m: 0, b: 0 }]);
        setIsAnimating(false);
    };

    const newData = () => {
        setData(generateData());
        reset();
    };

    // --- VISUALIZATION HELPERS ---
    // Scale scales for Data Plot (x: 0-12, y: 0-12)
    const toScreen = (val, size) => (val / 12) * size;
    const toYScreen = (val, size) => size - (val / 12) * size;

    // --- STYLES ---
    const pageStyle = {
        padding: '20px',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        overflowY: 'auto'
    };

    const topBarStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center'
    };

    const chartsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        flex: 1,
        minHeight: '400px'
    };

    const chartCardStyle = {
        flex: '1 1 400px',
        minWidth: '300px',
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    };

    return html`
        <div style=${pageStyle}>
            
            <!-- HEADER & CONTROLS -->
            <${GlassCard}>
                <div style=${topBarStyle}>
                    <div style=${{ flex: 1, minWidth: '200px' }}>
                        <h2 style=${{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>Curve Fitter</h2>
                        <p style=${{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                            Visualize Gradient Descent training a Linear Regression model (y = mx + b).
                        </p>
                    </div>

                    <!-- Controls -->
                    <div style=${{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div style=${{ width: '200px' }}>
                             <${Slider} 
                                label="Learning Rate" 
                                value=${lr} 
                                min=${0.001} 
                                max=${0.1} 
                                step=${0.001} 
                                onChange=${setLr} 
                                formatValue=${v => v.toFixed(3)}
                            />
                        </div>
                        <${Button} 
                            onClick=${() => setIsAnimating(!isAnimating)}
                            variant=${isAnimating ? 'secondary' : 'primary'}
                            icon=${isAnimating ? Pause : Play}
                        >
                            ${isAnimating ? 'Pause' : 'Train'}
                        <//>
                        <${Button} onClick=${reset} variant="secondary" icon=${RotateCcw} title="Reset Weights" />
                        <${Button} onClick=${newData} variant="secondary" icon=${RefreshCw} title="New Dataset" />
                    </div>
                </div>
            <//>

            <!-- MAIN VISUALIZATION AREA -->
            <div style=${chartsContainerStyle}>
                
                <!-- LEFT: DATA SPACE -->
                <${GlassCard} style=${chartCardStyle}>
                    <h3 style=${{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '8px', color: 'var(--color-secondary)' }}>
                        1. Data Space
                        <span style=${{ float: 'right', fontSize: '0.8rem', fontWeight: 'normal', color: '#666' }}>
                             y = ${params.m.toFixed(2)}x + ${params.b.toFixed(2)}
                        </span>
                    </h3>
                    
                    <div style=${{ flex: 1, position: 'relative', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
                            <!-- Grid -->
                            <defs>
                                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#eee" strokeWidth="1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />

                            <!-- Axes -->
                            <path d="M 20 0 L 20 300 M 0 280 L 400 280" stroke="#ccc" strokeWidth="2" />

                            <!-- Data Points -->
                            ${data.map((p, i) => html`
                                <circle 
                                    key=${i} 
                                    cx=${toScreen(p.x, 400)} 
                                    cy=${toYScreen(p.y, 300)} 
                                    r="6" 
                                    fill="var(--color-secondary)"
                                    opacity="0.8"
                                />
                            `)}

                            <!-- Regression Line -->
                            <line 
                                x1="0" 
                                y1=${toYScreen(params.b, 300)} 
                                x2="400" 
                                y2=${toYScreen(params.m * 12 + params.b, 300)} 
                                stroke="var(--color-primary)" 
                                strokeWidth="3" 
                                strokeDasharray="5,5"
                            />
                        </svg>
                        
                        <!-- Axis Labels -->
                        <div style=${{ position: 'absolute', bottom: 5, right: 10, fontSize: '0.7rem', color: '#999' }}>input (x)</div>
                        <div style=${{ position: 'absolute', top: 10, left: 5, fontSize: '0.7rem', color: '#999' }}>output (y)</div>
                    </div>
                <//>

                <!-- RIGHT: PARAMETER SPACE (LOSS) -->
                <${GlassCard} style=${chartCardStyle}>
                    <h3 style=${{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '8px', color: 'var(--color-secondary)' }}>
                        2. Loss Landscape
                        <span style=${{ float: 'right', fontSize: '0.8rem', fontWeight: 'normal', color: '#666' }}>
                             Loss: ${computeLoss(params.m, params.b, data).toFixed(4)}
                        </span>
                    </h3>
                    
                    <div style=${{ flex: 1, position: 'relative', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden' }}>
                        <svg width="100%" height="100%" viewBox="-1 -1 4 8" preserveAspectRatio="none">
                            <!-- 
                                Param Space:
                                X axis: Slope (m) from -1 to 3
                                Y axis: Intercept (b) from -1 to 7
                             -->
                            
                            <!-- Contour Approximation (Static Background Rings) -->
                            ${[10, 5, 2, 1, 0.5, 0.2].map(r => html`
                                <ellipse 
                                    cx="0.5" 
                                    cy="2" 
                                    rx=${r * 0.8} 
                                    ry=${r * 1.5} 
                                    fill="var(--color-accent)" 
                                    fillOpacity="0.1" 
                                    stroke="white" 
                                    strokeWidth="0.02"
                                />
                            `)}

                            <!-- Axes -->
                            <line x1="-1" y1="0" x2="3" y2="0" stroke="#ccc" strokeWidth="0.05" /> <!-- m axis -->
                            <line x1="0" y1="-1" x2="0" y2="7" stroke="#ccc" strokeWidth="0.05" /> <!-- b axis -->

                            <!-- Gradient Path -->
                            <polyline 
                                points=${path.map(p => `${p.m},${p.b}`).join(' ')} 
                                fill="none" 
                                stroke="var(--color-secondary)" 
                                strokeWidth="0.05"
                                strokeLinejoin="round"
                            />

                            <!-- Current Position -->
                            <circle 
                                cx=${params.m} 
                                cy=${params.b} 
                                r="0.1" 
                                fill="#dc2626"
                                stroke="white"
                                strokeWidth="0.02"
                            />
                        </svg>

                        <!-- Labels -->
                        <div style=${{ position: 'absolute', bottom: 5, right: 10, fontSize: '0.7rem', color: '#999' }}>Slope (m)</div>
                        <div style=${{ position: 'absolute', top: 10, left: 5, fontSize: '0.7rem', color: '#999' }}>Intercept (b)</div>
                    </div>
                <//>
            </div>

            <!-- THEORY FOOTER -->
            <${GlassCard}>
                <h4 style=${{ margin: '0 0 8px 0', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>What is happening?</h4>
                <div style=${{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                    <div>
                        <strong>Left: The Model</strong><br/>
                        We are trying to fit the dashed line <code>y = mx + b</code> to the blue dots. 
                        The gradient descent algorithm tweaks <code>m</code> (slope) and <code>b</code> (intercept) slightly in each step to reduce the distance between the line and the dots.
                    </div>
                    <div>
                        <strong>Right: The Cost</strong><br/>
                        Each combination of <code>(m, b)</code> has a "Cost" (how bad the fit is).
                        The red dot represents our current model. We want to move it to the center of the rings, where the Cost is lowest (zero error).
                    </div>
                </div>
            <//>

        </div>
    `;
};

export default Lab2D;
