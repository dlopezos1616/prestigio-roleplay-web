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
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative hero-gradient bg-grid-pattern overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="animate-subtle-float mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex items-center justify-center animate-pulse-glow"
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 animate-fade-in-up">
              <span className="neon-text-blue">PRESTIGIO</span>
              <span className="text-white"> </span>
              <span className="neon-text-gold">ROLEPLAY</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#a1a1aa] font-medium mb-3 animate-fade-in-up stagger-2">
              Normativas del Servidor
            </p>

            {/* Description */}
            <p className="text-sm text-[#637381] max-w-lg animate-fade-in-up stagger-3">
              Conoce las reglas y normativas oficiales. El desconocimiento de la normativa no exime de su cumplimiento.
            </p>

            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-3 animate-fade-in-up stagger-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00b4ff]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4a843]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00b4ff]/40" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Explora las Normativas
          </h2>
          <p className="text-sm text-[#637381]">
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
