const Viz3D = () => {
    const canvasRef = React.useRef(null);
    const [points3D, setPoints3D] = React.useState([{ x: 2, y: 2, z: 8 }]);
    const [isAnimating3D, setIsAnimating3D] = React.useState(false);
    const [rotation, setRotation] = React.useState({ x: 30, y: 45 });
    const [showMath, setShowMath] = React.useState(false);

    // f(x,y) = x² + y²
    const f3D = (x, y) => x * x + y * y;
    const df3D = (x, y) => ({ dx: 2 * x, dy: 2 * y });

    const project3D = (x, y, z, rotX, rotY) => {
        const scale = 40;
        const cx = 250;
        const cy = 200;

        const rad = Math.PI / 180;
        const cosY = Math.cos(rotY * rad);
        const sinY = Math.sin(rotY * rad);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        const cosX = Math.cos(rotX * rad);
        const sinX = Math.sin(rotX * rad);
        const y1 = y * cosX - z1 * sinX;
        // z2 is depth, unused for x/y projection but useful for z-sorting if needed

        return {
            x: cx + x1 * scale,
            y: cy - y1 * scale
        };
    };

    const draw3D = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 400);

        // Draw surface grid
        const gridSize = 20;
        const range = 3;
        const step = (range * 2) / gridSize;

        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)'; // Primary color faint
        ctx.lineWidth = 1;

        for (let i = 0; i <= gridSize; i++) {
            const x = -range + i * step;
            for (let j = 0; j <= gridSize; j++) {
                const y = -range + j * step;
                const z = f3D(x, y);
                const p = project3D(x, y, z, rotation.x, rotation.y);

                if (j < gridSize) {
                    const y2 = -range + (j + 1) * step;
                    const z2 = f3D(x, y2);
                    const p2 = project3D(x, y2, z2, rotation.x, rotation.y);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }

                if (i < gridSize) {
                    const x2 = -range + (i + 1) * step;
                    const z2 = f3D(x2, y);
                    const p2 = project3D(x2, y, z2, rotation.x, rotation.y);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // Draw gradient descent path
        ctx.strokeStyle = '#6366f1'; // Primary
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(99, 102, 241, 0.5)";

        for (let i = 0; i < points3D.length; i++) {
            const p = points3D[i];
            const proj = project3D(p.x, p.y, p.z, rotation.x, rotation.y);
            if (i === 0) ctx.moveTo(proj.x, proj.y);
            else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw points
        points3D.forEach((p, i) => {
            const proj = project3D(p.x, p.y, p.z, rotation.x, rotation.y);
            ctx.fillStyle = i === points3D.length - 1 ? '#ec4899' : '#6366f1'; // Pink current, Indigo history
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, i === points3D.length - 1 ? 6 : 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw minimum point
        const minProj = project3D(0, 0, 0, rotation.x, rotation.y);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(minProj.x, minProj.y, 5, 0, Math.PI * 2);
        ctx.fill();
    };

    React.useEffect(() => {
        draw3D();
    }, [points3D, rotation]);

    const step3D = () => {
        setPoints3D(prev => {
            const last = prev[prev.length - 1];
            const grad = df3D(last.x, last.y);
            const newX = last.x - 0.1 * grad.dx;
            const newY = last.y - 0.1 * grad.dy;
            const newZ = f3D(newX, newY);
            return [...prev, { x: newX, y: newY, z: newZ }];
        });
    };

    React.useEffect(() => {
        let interval;
        if (isAnimating3D && points3D.length < 50) {
            interval = setInterval(step3D, 200);
        } else if (points3D.length >= 50) {
            setIsAnimating3D(false);
        }
        return () => clearInterval(interval);
    }, [isAnimating3D, points3D]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="card bg-white rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-2xl font-bold font-display text-gray-800">3D Descent: f(x,y) = x² + y²</h3>
                        <p className="text-gray-500">Multivariate optimization visualization</p>
                    </div>
                    <button
                        onClick={() => setShowMath(!showMath)}
                        className="btn btn-secondary text-sm"
                    >
                        <i data-lucide={showMath ? "eye-off" : "eye"} className="w-4 h-4"></i>
                        {showMath ? "Hide Math" : "Show Math"}
                    </button>
                </div>

                <div className="grid md:grid-cols-[1fr_300px] gap-6">
                    {/* Canvas Area */}
                    <div className="relative border border-gray-100 rounded-xl overflow-hidden bg-gray-50 shadow-inner cursor-grab active:cursor-grabbing">
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={400}
                            className="w-full h-auto"
                            onMouseDown={(e) => {
                                const startX = e.clientX;
                                const startY = e.clientY;
                                const startRotation = { ...rotation };

                                const handleMove = (e) => {
                                    const dx = e.clientX - startX;
                                    const dy = e.clientY - startY;
                                    setRotation({
                                        x: startRotation.x + dy * 0.5,
                                        y: startRotation.y + dx * 0.5
                                    });
                                };

                                const handleUp = () => {
                                    document.removeEventListener('mousemove', handleMove);
                                    document.removeEventListener('mouseup', handleUp);
                                };

                                document.addEventListener('mousemove', handleMove);
                                document.addEventListener('mouseup', handleUp);
                            }}
                        />
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-500 shadow-sm pointer-events-none">
                            <i data-lucide="move" className="w-3 h-3 inline mr-1"></i> Drag to rotate
                        </div>
                    </div>

                    {/* Controls Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Current State</div>
                            <div className="space-y-1 font-mono text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">x:</span>
                                    <span>{points3D[points3D.length - 1].x.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">y:</span>
                                    <span>{points3D[points3D.length - 1].y.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-primary">
                                    <span className="text-gray-500 font-normal">Cost:</span>
                                    <span>{points3D[points3D.length - 1].z.toFixed(3)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-col">
                            <button
                                onClick={() => setIsAnimating3D(!isAnimating3D)}
                                className={`btn w-full ${isAnimating3D ? 'btn-secondary' : 'btn-primary'}`}
                            >
                                {isAnimating3D ? 'Pause Descent' : 'Start Descent'}
                            </button>
                            <button
                                onClick={() => {
                                    setPoints3D([{ x: 2, y: 2, z: 8 }]);
                                    setIsAnimating3D(false);
                                }}
                                className="btn btn-secondary w-full"
                            >
                                Reset Position
                            </button>
                        </div>

                        {showMath && (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 animate-fade-in text-sm">
                                <h5 className="font-bold text-purple-900 mb-2">Gradients</h5>
                                <p className="text-gray-700">∇f = [2x, 2y]</p>
                                <p className="text-gray-700 mt-1">Min at (0,0)</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Viz3D = Viz3D;
