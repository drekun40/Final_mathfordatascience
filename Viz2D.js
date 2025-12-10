const Viz2D = () => {
    const [points, setPoints] = React.useState([{ x: -8, y: 64 }]);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [learningRate, setLearningRate] = React.useState(0.1);

    // f(x) = x^2, f'(x) = 2x
    const f = (x) => x * x;
    const df = (x) => 2 * x;

    const step = () => {
        setPoints(prev => {
            const last = prev[prev.length - 1];
            const gradient = df(last.x);
            const newX = last.x - learningRate * gradient;
            const newY = f(newX);
            return [...prev, { x: newX, y: newY }];
        });
    };

    React.useEffect(() => {
        let interval;
        if (isAnimating && points.length < 50) {
            interval = setInterval(step, 200);
        } else if (points.length >= 50) {
            setIsAnimating(false);
        }
        return () => clearInterval(interval);
    }, [isAnimating, points, learningRate]);

    const reset = () => {
        setPoints([{ x: -8, y: 64 }]);
        setIsAnimating(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="card bg-white p-6 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold font-display text-gray-800">2D Descent: f(x) = x²</h3>
                        <p className="text-gray-500">Visualizing optimization on a simple convex function</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-primary">
                            {points[points.length - 1].y.toFixed(4)}
                        </div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Cost</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-wrap gap-6 items-center border border-gray-100">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            className={`btn ${isAnimating ? 'btn-secondary' : 'btn-primary'}`}
                        >
                            {isAnimating ? (
                                <><i data-lucide="pause" className="w-4 h-4"></i> Pause</>
                            ) : (
                                <><i data-lucide="play" className="w-4 h-4"></i> Start Descent</>
                            )}
                        </button>

                        <button onClick={reset} className="btn btn-secondary">
                            <i data-lucide="rotate-ccw" className="w-4 h-4"></i> Reset
                        </button>
                    </div>

                    <div className="flex items-center gap-4 flex-1">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Learning Rate (α):
                        </label>
                        <input
                            type="range"
                            min="0.01"
                            max="0.5"
                            step="0.01"
                            value={learningRate}
                            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                            className="input-range flex-1"
                        />
                        <span className="text-sm font-mono font-bold bg-white px-2 py-1 rounded border border-gray-200">
                            {learningRate.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Visualization */}
                <div className="relative w-full h-[400px] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-inner">
                    <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        {[...Array(11)].map((_, i) => (
                            <line
                                key={`grid-${i}`}
                                x1={50 + i * 50}
                                y1={0}
                                x2={50 + i * 50}
                                y2={300}
                                stroke="#f1f5f9"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Coordinate System - Y Axis */}
                        <line x1="300" y1="0" x2="300" y2="300" stroke="#e2e8f0" strokeWidth="2" />
                        {/* X Axis */}
                        <line x1="0" y1="270" x2="600" y2="270" stroke="#e2e8f0" strokeWidth="2" />

                        {/* Function Curve */}
                        <path
                            d={`M 50 270 ${[...Array(100)].map((_, i) => {
                                const x = -10 + i * 0.2;
                                const y = f(x);
                                const px = 300 + x * 25; // Center at 300
                                const py = 270 - y * 3;  // Scale y slightly
                                return `L ${px} ${py}`;
                            }).join(' ')}`}
                            fill="none"
                            stroke="var(--color-primary-light)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        {/* Path History */}
                        {points.length > 1 && (
                            <path
                                d={points.map((p, i) => {
                                    const px = 300 + p.x * 25;
                                    const py = 270 - p.y * 3;
                                    return i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`;
                                }).join(' ')}
                                fill="none"
                                stroke="var(--color-secondary)"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                                opacity="0.6"
                            />
                        )}

                        {/* Active Points */}
                        {points.map((p, i) => {
                            const px = 300 + p.x * 25;
                            const py = 270 - p.y * 3;
                            const isHead = i === points.length - 1;
                            return (
                                <g key={i}>
                                    {isHead && (
                                        <circle cx={px} cy={py} r="12" fill="var(--color-secondary)" opacity="0.2">
                                            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                    )}
                                    <circle
                                        cx={px}
                                        cy={py}
                                        r={isHead ? 6 : 3}
                                        fill={isHead ? "var(--color-secondary)" : "var(--color-primary)"}
                                        className="transition-all duration-300"
                                    />
                                </g>
                            );
                        })}

                        <text x="50" y="290" fill="#94a3b8" fontSize="12">-10</text>
                        <text x="300" y="290" fill="#94a3b8" fontSize="12">0</text>
                        <text x="550" y="290" fill="#94a3b8" fontSize="12">10</text>
                    </svg>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <div>Step: {points.length - 1}</div>
                    <div>Position: x = {points[points.length - 1].x.toFixed(3)}</div>
                </div>
            </div>
        </div>
    );
};

export default Viz2D;
