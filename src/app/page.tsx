'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<SubmitState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // ⚡ REAL THUNDER SYSTEM
    const triggerThunder = useCallback(() => {
        const flash = document.getElementById('lightning-flash');
        const body = document.body;

        if (!flash) return;

        const intensity = Math.random();

        const duration =
            intensity > 0.85 ? 180 :
                intensity > 0.5 ? 120 : 80;

        const shakeClass =
            intensity > 0.85 ? 'shake-hard' :
                intensity > 0.5 ? 'shake' :
                    'shake-soft';

        setTimeout(() => {
            flash.style.opacity = intensity.toString();
            body.classList.add(shakeClass);

            setTimeout(() => {
                flash.style.opacity = '0';
                body.classList.remove(shakeClass);
            }, duration);
        }, Math.random() * 300);
    }, []);

    // ⚡ RANDOM STORM LOOP
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const loop = () => {
            const delay = 2000 + Math.random() * 5000;

            timeout = setTimeout(() => {
                if (Math.random() > 0.55) {
                    triggerThunder();
                }
                loop();
            }, delay);
        };

        loop();

        return () => clearTimeout(timeout);
    }, [triggerThunder]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('loading');
        setErrorMsg('');

        try {
            const cleanEmail = email.trim().toLowerCase();

            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to join waitlist');
            }

            setState('success');
            setEmail('');
            setTimeout(() => setState('idle'), 3000);
        } catch (error) {
            setErrorMsg(error instanceof Error ? error.message : 'Something went wrong');
            setState('error');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
              style={{ background: 'var(--primary-bg-navy)' }}>

            {/* ⚡ LIGHTNING FLASH */}
            <div
                id="lightning-flash"
                className="fixed inset-0 pointer-events-none z-50"
                style={{
                    background:
                        'radial-gradient(circle at 50% 30%, white, rgba(180,220,255,0.4), transparent)',
                    opacity: 0,
                    transition: 'opacity 60ms ease-out',
                    filter: 'blur(1px)',
                    mixBlendMode: 'screen',
                }}
            />

            {/* 🌫️ STORM DARK LAYER */}
            <div
                className="fixed inset-0 pointer-events-none z-40"
                style={{
                    background:
                        'radial-gradient(circle at center, rgba(0,0,0,0.0), rgba(0,0,0,0.65))',
                    opacity: 0.25,
                }}
            />

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
                     style={{ background: 'linear-gradient(135deg, #185fa5, #1f73c2)' }} />

                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
                     style={{ background: 'linear-gradient(135deg, #1d9e75, #185fa5)' }} />
            </div>

            <div className="max-w-md w-full relative z-10">

                {/* LOGO */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl card-polish hero-glass animate-glow mb-8"
                         style={{ boxShadow: '0 8px 32px rgba(24, 95, 165, 0.3)' }}>

                        <img
                            src="https://r2.fivemanage.com/MstMs66haaJ9Pm7JfZ7kO/icon_transparent_blue_512.png"
                            alt="Virenix Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </div>

                    <h1 className="text-5xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}>
                        Virenix
                    </h1>

                    <p className="text-lg"
                       style={{ color: 'var(--text-secondary)' }}>
                        Game Server Hosting
                    </p>
                </div>

                {/* HEADLINE */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}>
                        Coming Soon
                    </h2>

                    <p className="text-base leading-relaxed"
                       style={{ color: 'var(--text-secondary)' }}>
                        Lightning-fast game server hosting. Built for performance, designed for gamers.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                              style={{ color: 'var(--text-tertiary)' }} />

                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={state === 'loading' || state === 'success'}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-lg text-white font-medium"
                            style={{
                                backgroundColor: 'var(--primary-bg-blue-dark)',
                                border: '1px solid var(--border-secondary)',
                                color: 'var(--text-primary)',
                            }}
                        />
                    </div>

                    <div className="relative">
                        <button
                            type="submit"
                            disabled={state === 'loading' || state === 'success'}
                            className="w-full py-3 px-4 text-white font-bold rounded-lg btn-polish transition-opacity duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #185fa5, #1f73c2)',
                                opacity: state === 'loading' || state === 'success' ? 0.7 : 1,
                            }}
                        >
                            {state === 'loading' && 'Joining...'}
                            {state === 'idle' && 'Join Waitlist'}
                            {state === 'success' && 'Joined!'}
                            {state === 'error' && 'Already on waitlist!'}
                        </button>
                    </div>
                </form>

                {/* WHY VIRENIX SECTION */}
                <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--text-tertiary)' }}>
                        Why Virenix?
                    </p>
                    <ul className="space-y-4">
                        {[
                            { label: 'Ultra-Fast Provisioning', desc: 'Servers ready in seconds' },
                            { label: '99.9% Uptime Guarantee', desc: 'Enterprise-grade reliability' },
                            { label: '24/7 Premium Support', desc: 'Expert help when you need it' },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #185fa5, #1f73c2)' }} />
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </main>
    );
}