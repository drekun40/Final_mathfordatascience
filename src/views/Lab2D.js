import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';

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

    return (
        <div style={{ padding: '20px', height: '100vh', boxSizing: 'border-box', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Button onClick={() => setLocation('/')} variant="secondary" icon={ArrowLeft}>Back</Button>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'white' }}>2D Analysis Lab</h2>
                <div style={{ width: 100 }}></div> {/* Spacer */}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '20px', height: 'calc(100% - 80px)' }}>
                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <GlassCard>
                        <h3 style={{ marginTop: 0 }}>Descent Controls</h3>
                        <Slider
                            label="Learning Rate (α)"
                            value={lr}
                            min={0.01}
                            max={1.5}
                            step={0.01}
                            onChange={setLr}
                            formatValue={v => v.toFixed(2)}
                        />
                        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                            <Button
                                onClick={() => setIsAnimating(!isAnimating)}
                                variant={isAnimating ? 'secondary' : 'primary'}
                                icon={isAnimating ? Pause : Play}
                                style={{ flex: 1 }}
                            >
                                {isAnimating ? 'Pause' : 'Start'}
                            </Button>
                            <Button
                                onClick={reset}
                                variant="secondary"
                                icon={RotateCcw}
                            />
                        </div>
                    </GlassCard>

                    <GlassCard style={{ flex: 1 }}>
                        <h3 style={{ marginTop: 0 }}>Loss Curve</h3>
                        <div style={{ position: 'relative', width: '100%', height: '200px', borderLeft: '1px solid #475569', borderBottom: '1px solid #475569' }}>
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path
                                    d={`M 0 100 ${history.map(h => `L ${h.i * 2} ${100 - h.loss * 5}`).join(' ')}`}
                                    fill="none"
                                    stroke="var(--color-primary)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', marginTop: 10 }}>
                            This graph shows how quickly the error (Cost) decreases over time.
                        </p>
                    </GlassCard>
                </div>

                {/* Contour Map */}
                <GlassCard style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

                    <svg width="600" height="600" viewBox="-10 -10 20 20" style={{ background: '#0f172a', borderRadius: '8px' }}>

                        {/* Contours (Circles for x^2 + y^2) */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => (
                            <circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#334155" strokeWidth="0.1" />
                        ))}

                        {/* Axes */}
                        <line x1="-10" y1="0" x2="10" y2="0" stroke="#475569" strokeWidth="0.1" />
                        <line x1="0" y1="-10" x2="0" y2="10" stroke="#475569" strokeWidth="0.1" />

                        {/* Path Line */}
                        <polyline
                            points={points.map(p => `${p.x},${-p.y}`).join(' ')} // Flip Y for SVG coords
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth="0.2"
                            strokeOpacity="0.8"
                        />

                        {/* Current Point */}
                        {points.map((p, i) => (
                            <circle
                                key={i}
                                cx={p.x}
                                cy={-p.y} // Flip Y
                                r="0.4"
                                fill={i === points.length - 1 ? 'var(--color-secondary)' : 'var(--color-primary)'}
                                opacity={i === points.length - 1 ? 1 : 0.3}
                            />
                        ))}
                    </svg>

                    <div style={{ position: 'absolute', top: 20, right: 20, textAlign: 'right', pointerEvents: 'none' }}>
                        <h2 style={{ margin: 0, color: 'var(--color-text-dim)', opacity: 0.5 }}>Top-Down View</h2>
                    </div>

                </GlassCard>
            </div>
        </div>
    );
};

export default Lab2D;
