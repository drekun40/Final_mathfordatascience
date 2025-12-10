// Import components
import Introduction from './components/Introduction.js';
import Viz2D from './components/Viz2D.js';
import Viz3D from './components/Viz3D.js';
import Quiz from './components/Quiz.js';

const App = () => {
    const [currentSection, setCurrentSection] = React.useState('intro');

    const renderSection = () => {
        switch (currentSection) {
            case 'intro': return <Introduction />;
            case '2d': return <Viz2D />;
            case '3d': return <Viz3D />;
            case 'quiz': return <Quiz />;
            default: return <Introduction />;
        }
    };

    const navItems = [
        { id: 'intro', label: 'Introduction' },
        { id: '2d', label: '2D Visualization' },
        { id: '3d', label: '3D Visualization' },
        { id: 'quiz', label: 'Quiz' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50/50">

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <i data-lucide="trending-down" className="w-6 h-6 text-primary"></i>
                        </div>
                        <h1 className="text-xl font-bold font-display text-gray-900 tracking-tight">
                            Gradient<span className="text-primary">Descent</span>
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-lg border border-gray-200/50">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentSection(item.id)}
                                className={`nav-pill ${currentSection === item.id ? 'active' : ''}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Placeholder - can be expanded if needed */}
                    <div className="md:hidden">
                        <span className="text-sm font-medium text-gray-500">{navItems.find(i => i.id === currentSection).label}</span>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation (Bottom Bar) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-50 pb-safe">
                <div className="flex justify-around">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentSection(item.id)}
                            className={`flex flex-col items-center p-2 rounded-lg text-xs font-medium w-full
                        ${currentSection === item.id ? 'text-primary' : 'text-gray-400'}
                    `}
                        >
                            <i data-lucide={
                                item.id === 'intro' ? 'book' :
                                    item.id === '2d' ? 'bar-chart-2' :
                                        item.id === '3d' ? 'layers' : 'check-square'
                            } className="w-5 h-5 mb-1"></i>
                            {item.label.split(' ')[0]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 pb-24 md:pb-12">
                {renderSection()}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-400">
                <p>© 2025 Gradient Descent Explorer. Built with React & Vanilla CSS.</p>
            </footer>
        </div>
    );
};

export default App;
