import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import Button from '../components/UI/Button.js';
import GlassCard from '../components/UI/GlassCard.js'; // Kept imports
import { ArrowRight } from 'lucide-react';
import html from '../htm.js';

const WireframeSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    });

    return html`
        <${Sphere} ref=${sphereRef} args=${[1, 32, 32]} scale=${2.2}>
            <meshBasicMaterial 
                color=${"#004E42"} 
                wireframe=${true}
                transparent
                opacity=${0.15}
            />
        <//>
    `;
};

const Landing = () => {
    const [, setLocation] = useLocation();

    return html`
        <div style=${{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            <!-- Background 3D Scene (Subtle) -->
            <div style=${{ position: 'absolute', top: 0, right: '-20%', width: '60%', height: '100%', zIndex: 0, opacity: 0.6 }}>
                <${Canvas} camera=${{ position: [0, 0, 5] }}>
                    <${WireframeSphere} />
                    <${OrbitControls} enableZoom=${false} autoRotate autoRotateSpeed=${0.5} />
                <//>
            </div>

            <!-- Content Left Aligned -->
            <div style=${{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 10%',
            maxWidth: '800px'
        }}>
                <${motion.div}
                    initial=${{ opacity: 0, x: -30 }}
                    animate=${{ opacity: 1, x: 0 }}
                    transition=${{ duration: 0.8 }}
                >
                    <div style=${{
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            color: 'var(--color-text-dim)',
            marginBottom: '1rem',
            fontWeight: 600
        }}>
                        Mercyhurst University
                    </div>

                    <h1 style=${{
            fontFamily: 'var(--font-serif)',
            fontSize: '3.5rem',
            margin: '0 0 20px 0',
            color: 'var(--color-primary)', // Green
            lineHeight: 1.1
        }}>
                        Gradient Descent <br/>
                        <span style=${{ fontStyle: 'italic', fontWeight: 400 }}>Optimization</span>
                    </h1>
                    
                    <p style=${{
            fontSize: '1.15rem',
            color: 'var(--color-text-dim)',
            maxWidth: '500px',
            margin: '0 0 40px 0',
            lineHeight: 1.6
        }}>
                        An interactive exploration of the fundamental algorithm behind machine learning. 
                        Visualize loss landscapes and hyperparameters in a controlled 3D environment.
                    </p>

                    <${Button} 
                        onClick=${() => setLocation('/playground')}
                        style=${{ fontSize: '1rem', padding: '14px 28px' }}
                        icon=${ArrowRight}
                    >
                        Enter Simulation
                    <//>
                <//>
            </div>

             <!-- Footer Info -->
             <div style=${{
            position: 'absolute',
            bottom: 40,
            left: '10%',
            color: 'var(--color-text-dim)',
            fontSize: '0.9rem',
            display: 'flex',
            gap: 40
        }}>
                 <div>
                     <strong>v2.0.1+Mercyhurst</strong><br/>
                     Stable Build
                 </div>
                 <div>
                     <strong>Three.js</strong><br/>
                     r160
                 </div>
                 <div>
                    <strong>React</strong><br/>
                    18.2.0
                 </div>
             </div>
        </div>
    `;
};

export default Landing;
