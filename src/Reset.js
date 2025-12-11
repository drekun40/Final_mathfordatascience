import { Router, Route, Switch } from 'wouter';
import { useState, useEffect } from 'react';
import html from './htm.js';

// --- ROBUST HASH ROUTING HOOK ---
// Standard implementation listening to hashchange events
const useHashLocation = () => {
    const [loc, setLoc] = useState(window.location.hash.replace(/^#/, '') || '/');

    useEffect(() => {
        const handler = () => setLoc(window.location.hash.replace(/^#/, '') || '/');

        // Subscribe to hash changes
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    const navigate = (to) => (window.location.hash = to);
    return [loc, navigate];
};

// --- Re-integrating Components with Cache Busting v=3.20 ---
import Landing from './views/Landing.js?v=3.20';
import Playground from './views/Playground.js?v=3.20';
import Lab2D from './views/Lab2D.js?v=3.20';
import Quiz from './views/Quiz.js?v=3.20';
import Introduction from './views/Introduction.js?v=3.20';

// --- APP SHELL: THE COMPUTATIONAL OBSERVATORY ---
const Reset = () => {

    // --- MERCYHURST ACADEMIC PALETTE (Source of Truth) ---
    const theme = {
        primary: '#0B3A2E',   // Heritage Deep Green
        secondary: '#003057', // Mercyhurst Navy
        accent: '#7BAF9E',    // Campus Light Green
        bg: '#F5F6F7',        // Dissertation Gray
        surface: '#FFFFFF',   // Thesis White
        text: '#1a1a1a',
        textDim: '#64748b',
        border: '#e2e8f0'
    };

    const brandStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: 'white',
        textDecoration: 'none'
    };

    const logoTextStyle = {
        fontFamily: "'Lora', serif",
        fontWeight: 600,
        fontSize: '1.25rem',
        letterSpacing: '0.02em'
    };

    const subBrandStyle = {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: '0.9rem',
        opacity: 0.8,
        borderLeft: '1px solid rgba(255,255,255,0.3)',
        paddingLeft: '12px',
        marginLeft: '4px'
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '4px',
        background: 'rgba(0,0,0,0.2)',
        padding: '4px',
        borderRadius: '8px'
    };

    const linkBaseStyle = {
        color: 'rgba(255,255,255,0.8)',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '0.85rem',
        padding: '8px 16px',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        display: 'block'
    };

    // Helper to calculate active style (Updated for Hash Routing)
    const getLinkStyle = (path) => {
        // We compare against the current hash location roughly
        const currentHash = window.location.hash.replace(/^#/, '') || '/';
        const isActive = currentHash === path;
        return {
            ...linkBaseStyle,
            background: isActive ? theme.accent : 'transparent',
            color: isActive ? theme.primary : 'rgba(255,255,255,0.8)',
            fontWeight: isActive ? 600 : 500
        };
    };

    // --- MANUAL ROUTING LOGIC ---
    // We bypass wouter's Switch/Route matching to guarantee rendering
    const [loc] = useHashLocation();

    // Determine if the current view should have global scrolling
    // Intro and Quiz are "Documents" -> Scroll AUTO
    // Playground and Lab2D are "Apps" -> Scroll HIDDEN
    const isDocumentView = loc === '/' || loc === '/intro' || loc === '/quiz';

    const contentStyle = {
        flex: 1,
        position: 'relative',
        // Critical Fix: Toggle scroll based on view type
        overflowY: isDocumentView ? 'auto' : 'hidden',
        overflowX: 'hidden'
    };

    let ActiveComponent;
    if (loc === '/' || loc === '') {
        ActiveComponent = Landing;
    } else if (loc === '/intro') {
        ActiveComponent = Introduction;
    } else if (loc === '/playground') {
        ActiveComponent = Playground;
    } else if (loc === '/2d') {
        ActiveComponent = Lab2D;
    } else if (loc === '/quiz') {
        ActiveComponent = Quiz;
    } else {
        ActiveComponent = () => html`
            <div style=${{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1 style=${{ fontFamily: "'Lora', serif", color: '#003057' }}>404</h1>
                <p>Path: ${loc}</p>
                <a href="#/" style=${{ color: '#0B3A2E', marginTop: '1rem' }}>Return to Abstract</a>
            </div>
        `;
    }

    // --- RENDER ---
    return html`
    <${Router} hook=${useHashLocation}>
        <!-- Global CSS Variables Injection -->
        <style>
            :root {
                --color-primary: ${theme.primary};
                --color-secondary: ${theme.secondary};
                --color-accent: ${theme.accent};
                --color-bg: ${theme.bg};
                --color-surface: ${theme.surface};
                --color-text: ${theme.text};
                --color-text-dim: ${theme.textDim};
                --color-border: ${theme.border};
                --font-serif: 'Lora', serif;
                --font-sans: 'Inter', system-ui, sans-serif;
            }
            body { margin: 0; font-family: var(--font-sans); background: var(--color-bg); color: var(--color-text); }
            * { box-sizing: border-box; }
        </style>

        <div style=${{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            
            <!-- Observatory Header -->
            <nav style=${{
            height: '64px',
            background: 'var(--color-primary)',
            borderBottom: '1px solid var(--color-secondary)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 50,
            flexShrink: 0
        }}>
                <a href="#/" style=${brandStyle}>
                    <span style=${logoTextStyle}>Mercyhurst</span>
                    <span style=${subBrandStyle}>Gradient Descent Explorer</span>
                </a>
                
                <div style=${navLinksStyle}>
                    <a href="#/" style=${getLinkStyle('/')}>Abstract</a>
                    <a href="#/intro" style=${getLinkStyle('/intro')}>Intro</a>
                    <a href="#/playground" style=${getLinkStyle('/playground')}>3D Lab</a>
                    <a href="#/2d" style=${getLinkStyle('/2d')}>2D Studio</a>
                    <a href="#/quiz" style=${getLinkStyle('/quiz')}>Quiz Mode</a>
                </div>
            </nav>

            <!-- Main Dashboard Area -->
            <div style=${contentStyle}>
                <${ActiveComponent} />
            </div>

        </div>
    <//>
    `;
};

export default Reset;
