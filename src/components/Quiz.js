const Quiz = () => {
    const [answers, setAnswers] = React.useState({});
    const [showResults, setShowResults] = React.useState(false);

    const questions = [
        {
            q: "What does the gradient vector represent?",
            options: ["Direction of steepest ascent", "Direction of steepest descent", "A random direction", "The minimum point itself"],
            correct: 0
        },
        {
            q: "What is the role of the Learning Rate (α)?",
            options: ["It determines the final value", "It controls the step size of each iteration", "It changes the cost function", "It sets the starting position"],
            correct: 1
        },
        {
            q: "In 2D, if f(x) = x², what is the derivative f'(x) at x = 3?",
            options: ["9", "3", "6", "0"],
            correct: 2
        },
        {
            q: "Where does gradient descent stop?",
            options: ["At the maximum", "When the gradient is close to zero (convergence)", "After exactly 10 steps", "It never stops"],
            correct: 1
        }
    ];

    const checkQuiz = () => {
        setShowResults(true);
    };

    const score = Object.keys(answers).filter(k => answers[k] === questions[k].correct).length;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold font-display text-gray-800">Test Your Knowledge</h3>
                <p className="text-gray-500">Validate your understanding of gradient descent concepts.</p>
            </div>

            <div className="space-y-6">
                {questions.map((q, qIdx) => {
                    const isCorrect = showResults && answers[qIdx] === q.correct;
                    const isWrong = showResults && answers[qIdx] !== q.correct && answers[qIdx] !== undefined;

                    return (
                        <div
                            key={qIdx}
                            className={`card bg-white p-6 rounded-xl border-l-4 transition-all
                  ${showResults
                                    ? (isCorrect ? 'border-l-green-500 bg-green-50/30' : (isWrong ? 'border-l-red-500 bg-red-50/30' : 'border-l-gray-200'))
                                    : 'border-l-transparent hover:border-l-primary'
                                }`}
                        >
                            <p className="font-bold text-lg mb-4 text-gray-800">{qIdx + 1}. {q.q}</p>
                            <div className="space-y-3">
                                {q.options.map((opt, oIdx) => (
                                    <label
                                        key={oIdx}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-all
                        ${answers[qIdx] === oIdx
                                                ? 'bg-primary/5 border-primary ring-1 ring-primary'
                                                : 'bg-white border-gray-200 hover:bg-gray-50'}
                      `}
                                    >
                                        <input
                                            type="radio"
                                            name={`q${qIdx}`}
                                            value={oIdx}
                                            checked={answers[qIdx] === oIdx}
                                            onChange={() => setAnswers({ ...answers, [qIdx]: oIdx })}
                                            className="accent-primary w-4 h-4"
                                            disabled={showResults}
                                        />
                                        <span className={`flex-1 ${showResults && oIdx === q.correct ? 'font-bold text-green-700' : ''}`}>
                                            {opt}
                                            {showResults && oIdx === q.correct && " (Correct Answer)"}
                                        </span>
                                        {showResults && answers[qIdx] === oIdx && (
                                            <i data-lucide={isCorrect ? "check-circle" : "x-circle"}
                                                className={`w-5 h-5 ${isCorrect ? "text-green-500" : "text-red-500"}`}></i>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!showResults ? (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={checkQuiz}
                        disabled={Object.keys(answers).length < questions.length}
                        className="btn btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Answers
                    </button>
                </div>
            ) : (
                <div className="card bg-gradient-mesh p-8 text-center rounded-xl border border-primary/20 animate-fade-in text-white">
                    <h4 className="text-2xl font-bold font-display text-gray-900 mb-2">Quiz Results</h4>
                    <div className="text-6xl font-bold text-primary mb-2">{score} / {questions.length}</div>
                    <p className="text-gray-600 mb-6">
                        {score === questions.length ? "Perfect score! You're a gradient descent master! 🎉" : "Good effort! Review the concepts and try again."}
                    </p>
                    <button
                        onClick={() => {
                            setAnswers({});
                            setShowResults(false);
                        }}
                        className="btn btn-secondary"
                    >
                        <i data-lucide="rotate-ccw" className="w-4 h-4"></i> Retry Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

window.Quiz = Quiz;
