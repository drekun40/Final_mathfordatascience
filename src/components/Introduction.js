const Introduction = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <i data-lucide="book-open" className="w-6 h-6"></i>
                    What is Gradient Descent?
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Gradient descent is an iterative optimization algorithm for finding a local minimum of a differentiable function.
                    It works by taking steps proportional to the negative of the gradient (or approximate gradient) of the function at the current point.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-white p-6 rounded-xl border-l-4 border-l-purple-500">
                    <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                        <i data-lucide="activity" className="w-5 h-5 text-purple-600"></i>
                        The Algorithm
                    </h4>
                    <div className="space-y-3 text-gray-600">
                        <p className="flex items-start gap-2">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-sm mt-0.5">1</span>
                            Start at a random point <span className="font-mono bg-gray-100 px-1 rounded">x₀</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-sm mt-0.5">2</span>
                            Calculate the gradient <span className="font-mono bg-gray-100 px-1 rounded">∇f(x)</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-sm mt-0.5">3</span>
                            Update: <span className="font-mono bg-gray-100 px-1 rounded">x_{n + 1} = x_n - α∇f(x_n)</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-sm mt-0.5">4</span>
                            Repeat until convergence
                        </p>
                    </div>
                </div>

                <div className="card bg-white p-6 rounded-xl border-l-4 border-l-cyan-500">
                    <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
                        <i data-lucide="settings" className="w-5 h-5 text-cyan-600"></i>
                        Key Parameters
                    </h4>
                    <ul className="space-y-4 text-gray-600">
                        <li className="flex flex-col">
                            <span className="font-semibold text-cyan-900">Learning Rate (α)</span>
                            <span className="text-sm">Determines the size of the steps we take to reach a minimum. Too low = slow, Too high = overshoot.</span>
                        </li>
                        <li className="flex flex-col">
                            <span className="font-semibold text-cyan-900">Cost Function (J)</span>
                            <span className="text-sm">Measues how wrong the model is in terms of its ability to estimate the relationship between X and y.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-3 text-yellow-900 flex items-center gap-2">
                    <i data-lucide="lightbulb" className="w-6 h-6"></i>
                    Intuition: The "Mountain" Analogy
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Imagine you are standing on top of a mountain in dense fog. You can only feel the slope of the ground under your feet.
                    To get to the bottom (the minimum), you constantly check the steepest way down and take a small step in that direction.
                    Gradient descent works exactly the same way!
                </p>
            </div>
        </div>
    );
};

window.Introduction = Introduction;
