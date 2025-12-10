import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard.js';
import Button from '../components/UI/Button.js';
import Slider from '../components/UI/Slider.js';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

const f = (x, z) => (x * x + z * z) * 0.1;
const df = (x, z) => ({ dx: 0.2 * x, dz: 0.2 * z });

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

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial
                    color="#f8fafc"
                    side={THREE.DoubleSide}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>
            <mesh geometry={geometry}>
                <meshBasicMaterial color="#94a3b8" wireframe={true} transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

const Marker = ({ position }) => {
    return (
        <mesh position={[position.x, position.y + 0.5, position.z]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#dc2626" />
        </mesh>
    );
};

const Path = ({ points }) => {
    if (points.length < 2) return null;
    const vertexPoints = points.map(p => new THREE.Vector3(p.x, p.y + 0.1, p.z));
    return <Line points={vertexPoints} color="#2563eb" lineWidth={3} />;
};

const Playground = () => {
    const [, setLocation] = useLocation();
    const [lr, setLr] = useState(0.5);
    const [isAnimating, setIsAnimating] = useState(false);
    const [points, setPoints] = useState([{ x: 8, y: f(8, 8), z: 8 }]);

    useEffect(() => {
        let interval;
        if (isAnimating) {
            interval = setInterval(() => {
                setPoints(prev => {
                    const last = prev[prev.length - 1];
                    const grad = df(last.x, last.z);

                    if (Math.abs(last.x) < 0.1 && Math.abs(last.z) < 0.1) {
                        setIsAnimating(false);
                        return prev;
                    }

                    const newX = last.x - lr * grad.dx;
                    const newZ = last.z - lr * grad.dz;
                    const newY = f(newX, newZ);

                    return [...prev, { x: newX, y: newY, z: newZ }];
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnimating, lr]);

    const reset = () => {
        setPoints([{ x: 8, y: f(8, 8), z: 8 }]);
        setIsAnimating(false);
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex' }}>

            {/* Sidebar Controls (Academic style: Left Panel) */}
            <div style={{
                width: '320px',
                background: '#fff',
                borderRight: '1px solid var(--color-border)',
                padding: '20px',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: 0 }}>Simulation Parameters</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                        Adjust the hyperparameters to observe convergence behavior.
                    </p>
                </div>

                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <Slider
                        label="Learning Rate (α)"
                        value={lr}
                        min={0.01}
                        max={1.5}
                        step={0.01}
                        onChange={setLr}
                        formatValue={v => v.toFixed(2)}
                    />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                    <Button
                        onClick={() => setIsAnimating(!isAnimating)}
                        variant={isAnimating ? 'secondary' : 'primary'}
                        icon={isAnimating ? Pause : Play}
                        style={{ flex: 1, justifyContent: 'center' }}
                    >
                        {isAnimating ? 'Pause' : 'Start'}
                    </Button>
                    <Button
                        onClick={reset}
                        variant="secondary"
                        icon={RotateCcw}
                    />
                </div>

                {/* Math Stats Box */}
                <div style={{ marginTop: 'auto', padding: '15px', background: '#f1f5f9', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span>Loss (J):</span>
                        <strong>{points[points.length - 1].y.toFixed(6)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Steps:</span>
                        <strong>{points.length - 1}</strong>
                    </div>
                </div>
            </div>

            {/* Main Canvas */}
            <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
                <Canvas camera={{ position: [20, 15, 20], fov: 35 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
                    <Surface />
                    <Marker position={points[points.length - 1]} />
                    <Path points={points} />
                    <OrbitControls makeDefault />
                    <gridHelper args={[40, 40, '#e2e8f0', '#f1f5f9']} position={[0, -5, 0]} />
                    <axesHelper args={[5]} />
                </Canvas>

                {/* Legend overlay */}
                <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                        <div style={{ width: 10, height: 10, background: '#dc2626', borderRadius: '50%' }}></div> Current Position
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 20, height: 2, background: '#2563eb' }}></div> Descent Path
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Playground;
