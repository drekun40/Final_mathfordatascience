import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import html from '../htm.js';

// --- MATH LOGIC ---
const f = (x, y) => 0.1 * (x * x + y * y); // Same parabola
const df = (x, y) => ({ dx: 0.2 * x, dy: 0.2 * y });

const Lab2D = () => {
    const [, setLocation] = useLocation();
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
    const containerStyle = { padding: '20px', height: '100vh', boxSizing: 'border-box', overflowY: 'auto' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 };
    const titleStyle = { margin: 0, fontFamily: 'var(--font-display)', color: 'var(--color-primary)' };
    const spacerStyle = { width: 100 };
    const gridStyle = { display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '20px', height: 'calc(100% - 80px)' };
    const controlsColStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
    const h3topStyle = { marginTop: 0 };
    const btnGroupStyle = { display: 'flex', gap: 10, marginTop: 20 };
    const flex1Style = { flex: 1 };

    const svgContainerStyle = { position: 'relative', width: '100%', height: '200px', borderLeft: '1px solid #475569', borderBottom: '1px solid #475569' };
    const captionStyle = { color: 'var(--color-text-dim)', fontSize: '0.8rem', marginTop: 10 };

    const contourCardStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' };
    const contourSvgStyle = { background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' };
    const contourTitlePosStyle = { position: 'absolute', top: 20, right: 20, textAlign: 'right', pointerEvents: 'none' };
    const contourTitleStyle = { margin: 0, color: 'var(--color-text-dim)', opacity: 0.5 };

    return html`
        <div style=${containerStyle}>
            <div style=${headerStyle}>
                <${Button} onClick=${() => setLocation('/')} variant="secondary" icon=${ArrowLeft}>Back<//>
                <h2 style=${titleStyle}>2D Analysis Lab</h2>
                <div style=${spacerStyle}></div> <!-- Spacer -->
            </div>

            <div style=${gridStyle}>
                <!-- Controls -->
                <div style=${controlsColStyle}>
                    <${GlassCard}>
                        <h3 style=${h3topStyle}>Descent Controls</h3>
                        <${Slider} 
                            label="Learning Rate (α)" 
                            value=${lr} 
                            min=${0.01} 
                            max=${1.5} 
                            step=${0.01} 
                            onChange=${setLr} 
                            formatValue=${v => v.toFixed(2)}
                        />
                        <div style=${btnGroupStyle}>
                            <${Button} 
                                onClick=${() => setIsAnimating(!isAnimating)}
                                variant=${isAnimating ? 'secondary' : 'primary'}
                                icon=${isAnimating ? Pause : Play}
                                style=${flex1Style}
                            >
                                ${isAnimating ? 'Pause' : 'Start'}
                            <//>
                            <${Button} 
                                onClick=${reset}
                                variant="secondary"
                                icon=${RotateCcw}
                            />
                        </div>
                    <//>

                    <${GlassCard} style=${flex1Style}>
                        <h3 style=${h3topStyle}>Loss Curve</h3>
                        <div style=${svgContainerStyle}>
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path 
                                    d=${`M 0 100 ${history.map(h => `L ${h.i * 2} ${100 - h.loss * 5}`).join(' ')}`} 
                                    fill="none" 
                                    stroke="var(--color-primary)" 
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                        <p style=${captionStyle}>
                            This graph shows how quickly the error (Cost) decreases over time.
                        </p>
                    <//>
                </div>

                <!-- Contour Map -->
                <${GlassCard} style=${contourCardStyle}>
                    
                    <svg width="600" height="600" viewBox="-10 -10 20 20" style=${contourSvgStyle}>
                        
                        <!-- Contours (Circles for x^2 + y^2) -->
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => html`
                            <circle key=${r} cx="0" cy="0" r=${r} fill="none" stroke="#cbd5e1" strokeWidth="0.1" />
                        `)}
                        
                        <!-- Axes -->
                        <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="0.1" />
                        <line x1="0" y1="-10" x2="0" y2="10" stroke="#94a3b8" strokeWidth="0.1" />

                        <!-- Path Line -->
                        <polyline 
                            points=${points.map(p => `${p.x},${-p.y}`).join(' ')} 
                            fill="none" 
                            stroke="var(--color-accent)" 
                            strokeWidth="0.2" 
                            strokeOpacity="0.8"
                        />

                        <!-- Current Point -->
                        ${points.map((p, i) => html`
                             <circle 
                                key=${i} 
                                cx=${p.x} 
                                cy=${-p.y} 
                                r="0.4" 
                                fill=${i === points.length - 1 ? '#dc2626' : 'var(--color-primary)'}
                                opacity=${i === points.length - 1 ? 1 : 0.3}
                            />
                        `)}
                    </svg>
                    
                    <div style=${contourTitlePosStyle}>
                        <h2 style=${contourTitleStyle}>Top-Down View</h2>
                    </div>

                <//>
            </div>
        </div>
    `;
};

export default Lab2D;
