import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw, BookOpen, X } from 'lucide-react';
import { useLocation } from 'wouter';
import html from '../htm.js';

// ... [Math Functions f and df remain same] ...
const f = (x, z) => (x * x + z * z) * 0.1;
const df = (x, z) => ({ dx: 0.2 * x, dz: 0.2 * z });

// ... [Surface, Marker, Path Components remain same] ...
const Surface = () => {
    const meshRef = useRef();
    const count = 60;
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(20, 20, count, count);
        const positions = geo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const z = positions.getY(i);
            positions.setZ(i, -f(x, z));
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    return html`
        <group rotation=${[-Math.PI / 2, 0, 0]}>
            <mesh ref=${meshRef} geometry=${geometry}>
                <meshStandardMaterial color="var(--color-bg)" side=${THREE.DoubleSide} roughness=${0.6} metalness=${0.2} />
            </mesh>
            <mesh geometry=${geometry}>
                <meshBasicMaterial color="var(--color-primary)" wireframe=${true} transparent opacity=${0.15} />
            </mesh>
        </group>
    `;
};

const Marker = ({ position }) => html`<mesh position=${[position.x, position.y + 0.5, position.z]}><sphereGeometry args=${[0.6, 32, 32]} /><meshStandardMaterial color="var(--color-secondary)" roughness=${0.2} metalness=${0.5} /></mesh>`;
const Path = ({ points }) => {
    if (points.length < 2) return null;
    const vertexPoints = points.map(p => new THREE.Vector3(p.x, p.y + 0.1, p.z));
    return html`<${Line} points=${vertexPoints} color="var(--color-accent)" lineWidth=${4} />`;
};

const Playground = () => {
    const [lr, setLr] = useState(0.5);
    const [isAnimating, setIsAnimating] = useState(false);
    const [points, setPoints] = useState([{ x: 8, y: f(8, 8), z: 8 }]);
    const [showTheory, setShowTheory] = useState(false);

    // ... [Effect and Reset logic remain same] ...
    useEffect(() => {
        let interval;
        if (isAnimating) {
            interval = setInterval(() => {
                setPoints(prev => {
                    const last = prev[prev.length - 1];
                    const grad = df(last.x, last.z);
                    if (Math.abs(last.x) < 0.1 && Math.abs(last.z) < 0.1) { setIsAnimating(false); return prev; }
                    const newX = last.x - lr * grad.dx;
                    const newZ = last.z - lr * grad.dz;
                    const newY = f(newX, newZ);
                    return [...prev, { x: newX, y: newY, z: newZ }];
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnimating, lr]);

    const reset = () => { setPoints([{ x: 8, y: f(8, 8), z: 8 }]); setIsAnimating(false); };

    // --- STYLES ---
    const layoutStyle = { width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' };
    const controlsStyle = { position: 'absolute', top: 20, right: 20, width: '300px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 10 };
    const headerStyle = { fontFamily: 'var(--font-serif)', marginTop: 0, color: 'var(--color-primary)' };
    const labelStyle = { fontSize: '0.85rem', color: 'var(--color-text-dim)', marginBottom: '16px', display: 'block' };
    const readoutStyle = { marginTop: '20px', padding: '12px', background: 'var(--color-bg)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', border: '1px solid var(--color-border)' };
    const flexRow = { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' };
    const canvasContainerStyle = { flex: 1, background: '#f1f5f9' };

    // Theory Panel Style
    const theoryPanelStyle = {
        position: 'absolute', left: 20, top: 20, bottom: 20, width: '350px',
        background: 'white', borderRight: '1px solid var(--color-border)',
        padding: '30px', zIndex: 20, overflowY: 'auto',
        boxShadow: '4px 0 24px rgba(0,0,0,0.05)', borderRadius: '12px'
    };

    return html`
        <div style=${layoutStyle}>
            <div style=${canvasContainerStyle}>
                <${Canvas} camera=${{ position: [20, 15, 20], fov: 35 }}>
                    <ambientLight intensity=${0.8} />
                    <directionalLight position=${[10, 20, 10]} intensity=${1.5} castShadow />
                    <${Surface} />
                    <${Marker} position=${points[points.length - 1]} />
                    <${Path} points=${points} />
                    <${OrbitControls} makeDefault />
                    <gridHelper args=${[40, 40, '#cbd5e1', '#e2e8f0']} position=${[0, -5, 0]} />
                <//>
            </div>

            <!-- Theory Toggle Button (Bottom Left) -->
            <div style=${{ position: 'absolute', bottom: 30, left: 30, zIndex: 15 }}>
                <${Button} onClick=${() => setShowTheory(!showTheory)} icon=${BookOpen} variant="secondary">
                    ${showTheory ? 'Hide Theory' : 'Show Theory'}
                </${Button}>
            </div>

            <!-- Theory Sidebar -->
            <${AnimatePresence}>
                ${showTheory && html`
                    <${motion.div}
                        initial=${{ x: -350, opacity: 0 }}
                        animate=${{ x: 0, opacity: 1 }}
                        exit=${{ x: -350, opacity: 0 }}
                        transition=${{ type: 'spring', stiffness: 300, damping: 30 }}
                        style=${theoryPanelStyle}
                    >
                        <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style=${{ margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>Scholarly Context</h2>
                            <button onClick=${() => setShowTheory(false)} style=${{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-dim)' }}><${X} size=${20}/></button>
                        </div>
                        
                        <h4 style=${{ color: 'var(--color-secondary)' }}>The Gradient Vector (∇f)</h4>
                        <p style=${{ lineHeight: 1.6, color: 'var(--color-text-dim)', fontSize: '0.95rem' }}>
                            The gradient is a vector that points in the direction of the steepest ascent. To find the minimum (the bottom of the valley), we move in the <strong>opposite</strong> direction:
                            <br/><br/>
                            <code style=${{ background: '#f1f5f9', padding: '4px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>x_{new} = x_{old} - α * ∇f(x)</code>
                        </p>

                        <h4 style=${{ color: 'var(--color-secondary)', marginTop: '24px' }}>Hyperparameters</h4>
                        <p style=${{ lineHeight: 1.6, color: 'var(--color-text-dim)', fontSize: '0.95rem' }}>
                            <strong>Learning Rate (α):</strong> Controls the step size. 
                            <ul style=${{ paddingLeft: '20px', marginTop: '8px' }}>
                                <li><strong>Too Small:</strong> Slow convergence.</li>
                                <li><strong>Too Large:</strong> Overshooting and divergence.</li>
                            </ul>
                        </p>
                    </${motion.div}>
                `}
            </${AnimatePresence}>

            <!-- Controls -->
            <div style=${controlsStyle}>
                <h3 style=${headerStyle}>Experiment Controls</h3>
                <span style=${labelStyle}>Adjust parameters to observe convergence.</span>
                <${Slider} label="Learning Rate (α)" value=${lr} min=${0.01} max=${1.5} step=${0.01} onChange=${setLr} formatValue=${v => v.toFixed(2)} />
                <div style=${{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <${Button} onClick=${() => setIsAnimating(!isAnimating)} variant=${isAnimating ? 'secondary' : 'primary'} icon=${isAnimating ? Pause : Play} style=${{ flex: 1 }}>${isAnimating ? 'Pause' : 'Start'}<//>
                    <${Button} onClick=${reset} variant="secondary" icon=${RotateCcw} />
                </div>
                <!-- Telemetry -->
                <div style=${readoutStyle}>
                    <div style=${flexRow}><span>Loss (J):</span><strong style=${{ color: 'var(--color-secondary)' }}>${points[points.length - 1].y.toFixed(5)}</strong></div>
                    <div style=${flexRow}><span>Steps:</span><strong>${points.length - 1}</strong></div>
                </div>
            </div>
        </div>
    `;
};
export default Playground;
