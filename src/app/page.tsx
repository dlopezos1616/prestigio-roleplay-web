'use client';

import { useState, useEffect, useCallback } from 'react';
import { normativas, getNormativaById } from '@/lib/normativas';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NormativaCard from '@/components/NormativaCard';
import NormativaPage from '@/components/NormativaPage';

function parseHash(hash: string): { page: string; id: string } {
  const clean = hash.replace(/^#\/?/, '');
  if (!clean || clean === '') return { page: 'home', id: '' };

  const parts = clean.split('/');
  if (parts[0] === 'normativa' && parts[1]) {
    return { page: 'normativa', id: parts[1] };
  }

  return { page: 'home', id: '' };
}

function HomePage({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section - GTA RP Immersive */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/40 to-[#0a0a0f]" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,180,255,0.08) 0%, transparent 60%)',
          }}
        />
        {/* Scanline overlay */}
        <div className="absolute inset-0 gta-scanlines pointer-events-none" style={{ opacity: 0.08 }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.8) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div
              className="mb-8 transition-all duration-1000"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              }}
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'rgba(0, 180, 255, 0.05)',
                  border: '1px solid rgba(0, 180, 255, 0.2)',
                }}
              >
                <img
                  src="/logo.png"
                  alt="Prestigio Roleplay"
                  className="w-20 h-20 sm:w-26 sm:h-26 object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 transition-all duration-1000 delay-200"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              <span className="neon-text-blue">PRESTIGIO</span>
              <span className="text-white"> </span>
              <span className="neon-text-gold">ROLEPLAY</span>
            </h1>

            {/* Subtitle with GTA tag */}
            <div
              className="flex items-center gap-3 mb-3 transition-all duration-1000 delay-300"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00b4ff]/40" />
              <span className="gta-tag px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase"
                style={{
                  backgroundColor: 'rgba(0,180,255,0.1)',
                  color: '#00b4ff',
                  border: '1px solid rgba(0,180,255,0.2)',
                }}
              >
                LOS SANTOS
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00b4ff]/40" />
            </div>

            <p
              className="text-lg sm:text-xl text-[#e4e4e7] font-bold mb-2 transition-all duration-1000 delay-400"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Normativas del Servidor
            </p>

            {/* Description */}
            <p
              className="text-sm text-[#637381] max-w-lg transition-all duration-1000 delay-500"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(16px)',
              }}
            >
              Conoce las reglas y normativas oficiales. El desconocimiento de la normativa no exime de su cumplimiento.
            </p>

            {/* Decorative line */}
            <div
              className="mt-8 flex items-center gap-3 transition-all duration-1000 delay-600"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00b4ff]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4a843]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00b4ff]/40" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

        {/* Bottom neon line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,180,255,0.4), rgba(212,168,67,0.3), rgba(0,180,255,0.4), transparent)',
            boxShadow: '0 0 20px rgba(0,180,255,0.2), 0 0 40px rgba(0,180,255,0.08)',
          }}
        />
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
            Explora las Normativas
          </h2>
          <p className="text-sm text-[#637381] font-medium">
            Selecciona una normativa para ver todos los detalles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {normativas.map((normativa, index) => (
            <NormativaCard
              key={normativa.id}
              normativa={normativa}
              index={index}
              onClick={() => onNavigate(`#/normativa/${normativa.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [currentHash, setCurrentHash] = useState<string>(
    typeof window !== 'undefined' ? (window.location.hash || '') : ''
  );

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  const { page, id } = parseHash(currentHash);
  const normativa = page === 'normativa' && id ? getNormativaById(id) : undefined;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar onNavigate={navigate} currentHash={currentHash} />

      <main className="flex-1">
        {page === 'normativa' && normativa ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NormativaPage
              normativa={normativa}
              onBack={() => navigate('#/')}
            />
          </div>
        ) : (
          <HomePage onNavigate={navigate} />
        )}
      </main>

      <Footer />
    </div>
  );
}
