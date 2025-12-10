import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button.js?v=3.3';
import { ArrowRight, Activity, Box, Layers } from 'lucide-react';
import html from '../htm.js';

// --- 3D Hero Component: The "Glass" Planet ---
const HeroSphere = () => {
    const sphereRef = useRef();
    useFrame(({ clock }) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
            sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return html`
        <${Sphere} ref=${sphereRef} args=${[1, 64, 64]} scale=${2.4}>
            <${MeshDistortMaterial}
                color="#003057"
                attach="material"
                distort=${0.4}
                speed=${1.5}
                roughness=${0.2}
                metalness=${0.8}
                wireframe=${false}
                transparent=${true}
                opacity=${0.8}
            />
        <//>
        <ambientLight intensity=${0.5} />
        <directionalLight position=${[10, 10, 5]} intensity=${1} />
        <pointLight position=${[-10, -10, -5]} color="#7BAF9E" intensity=${2} />
    `;
};

const Landing = () => {
    const [, setLocation] = useLocation();

    // --- STYLES (Scope: Component) ---
    const layoutStyle = {
        display: 'flex',
        height: '100%',
        width: '100%',
        background: 'var(--color-bg)',
        fontFamily: 'var(--font-sans)'
    };

    // Left Panel: Introduction & Content
    const leftPanelStyle = {
        width: '40%',
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRight: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        zIndex: 10,
        boxShadow: '4px 0 24px rgba(0,0,0,0.05)'
    };

    // Right Panel: 3D Visualization
    const rightPanelStyle = {
        flex: 1,
        position: 'relative',
        background: '#09121d', // Deep space dark for contrast with glass sphere
        overflow: 'hidden'
    };

    const h1Style = {
        fontFamily: 'var(--font-serif)',
        fontSize: '3rem',
        color: 'var(--color-secondary)',
        marginBottom: '1rem',
        lineHeight: 1.1
    };

    const subheaderStyle = {
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--color-primary)',
        fontWeight: 700,
        fontSize: '0.85rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const pStyle = {
        fontSize: '1.1rem',
        color: 'var(--color-text-dim)',
        lineHeight: 1.6,
        marginBottom: '2rem',
        maxWidth: '500px'
    };

    const statsRowStyle = {
        display: 'flex',
        gap: '30px',
        marginTop: 'auto',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '20px'
    };

    const statItemStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const statNumStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--color-secondary)',
        fontFamily: 'var(--font-mono)'
    };

    const statLabelStyle = {
        fontSize: '0.8rem',
        color: 'var(--color-text-dim)',
        marginTop: '4px'
    };

    return html`
        <div style=${layoutStyle}>
            
            <!-- Left: Scholarship -->
            <${motion.div} 
                initial=${{ x: -50, opacity: 0 }} 
                animate=${{ x: 0, opacity: 1 }} 
                transition=${{ duration: 0.6 }}
                style=${leftPanelStyle}
            >
                <div style=${subheaderStyle}>
                    <${Activity} size=${16} />
                    <span>Computation & Optimization</span>
                </div>

                <h1 style=${h1Style}>
                    Intuition for <br/>
                    <i style=${{ fontWeight: 300 }}>Gradient Descent</i>
                </h1>

                <p style=${pStyle}>
                    Welcome to the Computational Observatory. This platform provides an interactive environment to explore the topology of loss functions and the mechanics of optimization algorithms.
                </p>

                <div style=${{ display: 'flex', gap: '16px' }}>
                    <${Button} onClick=${() => setLocation('/playground')} icon=${Box}>
                        Launch 3D Lab
                    </${Button}>
                    <${Button} variant="secondary" onClick=${() => setLocation('/2d')} icon=${Layers}>
                        Open 2D Studio
                    </${Button}>
                </div>

                <div style=${statsRowStyle}>
                    <div style=${statItemStyle}>
                        <span style=${statNumStyle}>3D</span>
                        <span style=${statLabelStyle}>Interactive Surface</span>
                    </div>
                    <div style=${statItemStyle}>
                        <span style=${statNumStyle}>2D</span>
                        <span style=${statLabelStyle}>Contour Analysis</span>
                    </div>
                    <div style=${statItemStyle}>
                        <span style=${statNumStyle}>v3.3</span>
                        <span style=${statLabelStyle}>Mercyhurst Build</span>
                    </div>
                </div>
            </${motion.div}>

            <!-- Right: Visualization -->
            <div style=${rightPanelStyle}>
                <${Canvas} camera=${{ position: [0, 0, 6] }}>
                    <${HeroSphere} />
                    <${OrbitControls} enableZoom=${false} autoRotate autoRotateSpeed=${0.5} />
                <//>
                
                <!-- Overlay Decoration -->
                <div style=${{
            position: 'absolute',
            bottom: 30,
            right: 40,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: 'monospace',
            textAlign: 'right',
            pointerEvents: 'none'
        }}>
                    COORD: 42.12° N, 80.08° W<br/>
                    ESTD: 1926
                </div>
            </div>
        </div>
    `;
};

export default Landing;
