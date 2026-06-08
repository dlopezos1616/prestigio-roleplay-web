'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { NormativaData, NormativaSection } from '@/lib/normativas';
import NormativaBlock from './NormativaBlock';

interface NormativaPageProps {
  normativa: NormativaData;
  onBack: () => void;
}

export default function NormativaPage({ normativa, onBack }: NormativaPageProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const totalPages = normativa.sections.length;

  // Animate header in
  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, [normativa.id]);

  // Reset page when normativa changes
  useEffect(() => {
    setCurrentPage(0);
    setShowIndex(false);
    setHeaderVisible(false);
  }, [normativa.id]);

  // Scroll to top on page change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      setShowIndex(false);
    }
  }, [totalPages]);

  const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentPage < totalPages - 1) goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentPage > 0) goPrev();
      } else if (e.key === 'Escape') {
        setShowIndex(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentPage, totalPages, goNext, goPrev]);

  const section = normativa.sections[currentPage];
  const progress = ((currentPage + 1) / totalPages) * 100;
  const prevSection = currentPage > 0 ? normativa.sections[currentPage - 1] : null;
  const nextSection = currentPage < totalPages - 1 ? normativa.sections[currentPage + 1] : null;

  return (
    <div ref={topRef} className="animate-fade-in">
      {/* GTA-style Themed Header Banner */}
      <div className="gta-header-banner relative overflow-hidden rounded-2xl mb-6">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${normativa.backgroundImage})` }}
        />
        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              rgba(10,10,15,0.7) 0%,
              rgba(10,10,15,0.5) 40%,
              ${normativa.color}15 70%,
              rgba(10,10,15,0.95) 100%)`,
          }}
        />
        {/* Color Tint */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${normativa.color}15 0%, transparent 60%)`,
          }}
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 gta-scanlines pointer-events-none" style={{ opacity: 0.15 }} />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-all cursor-pointer group mb-6"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase">Volver</span>
          </button>

          {/* Title Area */}
          <div
            className="flex items-center gap-4 sm:gap-5 mb-4 transition-all duration-700"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-3xl sm:text-4xl shrink-0"
              style={{
                backgroundColor: `${normativa.color}20`,
                border: `1px solid ${normativa.color}35`,
                boxShadow: `0 0 25px ${normativa.color}20, inset 0 0 15px ${normativa.color}08`,
              }}
            >
              {normativa.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {normativa.title}
              </h1>
              <p className="text-sm text-[#a1a1aa] mt-1 font-medium">{normativa.description}</p>
            </div>
          </div>

          {/* GTA-style section count bar */}
          <div
            className="flex items-center gap-3 mt-5 transition-all duration-700 delay-200"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <span
              className="gta-tag px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase"
              style={{
                backgroundColor: `${normativa.color}20`,
                color: normativa.color,
                border: `1px solid ${normativa.color}30`,
              }}
            >
              {normativa.sections.length} SECCIONES
            </span>
            <span
              className="gta-tag px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#637381',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              LOS SANTOS
            </span>
            <span
              className="gta-tag px-3 py-1 rounded text-[10px] font-black tracking-widest uppercase"
              style={{
                backgroundColor: 'rgba(212,168,67,0.1)',
                color: '#d4a843',
                border: '1px solid rgba(212,168,67,0.2)',
              }}
            >
              PRESTIGIO RP
            </span>
          </div>
        </div>

        {/* Bottom Neon Accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${normativa.color}80, ${normativa.color}, ${normativa.color}80, transparent)`,
            boxShadow: `0 0 20px ${normativa.color}40, 0 0 40px ${normativa.color}15`,
          }}
        />
      </div>

      {/* Book Navigation Bar - GTA Style */}
      <div className="gta-nav-bar rounded-xl p-3 sm:p-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          {/* Index Toggle */}
          <button
            onClick={() => setShowIndex(!showIndex)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shrink-0 ${
              showIndex
                ? 'text-white'
                : 'text-[#637381] hover:text-white'
            }`}
            style={{
              backgroundColor: showIndex ? `${normativa.color}20` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${showIndex ? normativa.color + '30' : 'rgba(255,255,255,0.06)'}`,
              color: showIndex ? normativa.color : '#637381',
            }}
            title="Índice de secciones"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Índice</span>
          </button>

          {/* Current Section Title */}
          <div className="flex-1 text-center min-w-0 px-2">
            <p className="text-[10px] text-[#637381] font-bold tracking-widest uppercase mb-0.5">
              Sección {currentPage + 1} de {totalPages}
            </p>
            <p className="text-sm font-bold text-white truncate">
              {section.icon} {section.title}
            </p>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="gta-nav-btn p-2.5 rounded-lg transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
              style={{
                color: currentPage === 0 ? '#637381' : normativa.color,
                backgroundColor: currentPage === 0 ? 'transparent' : `${normativa.color}10`,
                border: `1px solid ${currentPage === 0 ? 'rgba(255,255,255,0.05)' : `${normativa.color}25`}`,
              }}
              title="Sección anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className="gta-nav-btn p-2.5 rounded-lg transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
              style={{
                color: currentPage === totalPages - 1 ? '#637381' : normativa.color,
                backgroundColor: currentPage === totalPages - 1 ? 'transparent' : `${normativa.color}10`,
                border: `1px solid ${currentPage === totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${normativa.color}25`}`,
              }}
              title="Sección siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar - GTA style */}
        <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${normativa.color}40, ${normativa.color})`,
              boxShadow: `0 0 10px ${normativa.color}40`,
            }}
          />
        </div>
      </div>

      {/* Index Panel - GTA Style */}
      {showIndex && (
        <div className="gta-index-panel rounded-xl p-4 sm:p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black tracking-widest text-[#d4a843] uppercase">
              Índice de Secciones
            </h3>
            <button
              onClick={() => setShowIndex(false)}
              className="p-1 rounded text-[#637381] hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={`grid gap-1.5 ${totalPages <= 8 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
            {normativa.sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToPage(i)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-xs font-medium transition-all cursor-pointer ${
                  i === currentPage
                    ? 'text-white'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
                style={{
                  backgroundColor: i === currentPage ? `${normativa.color}15` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === currentPage ? normativa.color + '25' : 'transparent'}`,
                }}
              >
                <span
                  className="w-6 h-6 rounded text-[10px] flex items-center justify-center shrink-0 font-black"
                  style={{
                    backgroundColor: i === currentPage ? `${normativa.color}20` : 'rgba(255,255,255,0.05)',
                    color: i === currentPage ? normativa.color : '#637381',
                    border: `1px solid ${i === currentPage ? normativa.color + '25' : 'rgba(255,255,255,0.05)'}`,
                  }}
                >
                  {i + 1}
                </span>
                <span className="truncate">{s.icon} {s.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Page Content */}
      <div className="book-page-content" key={section.id}>
        <div className="gta-content-card rounded-xl p-5 sm:p-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                backgroundColor: `${normativa.color}15`,
                border: `1px solid ${normativa.color}25`,
                boxShadow: `0 0 12px ${normativa.color}10`,
              }}
            >
              {section.icon}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {section.title}
              </h2>
              <p className="text-[10px] text-[#637381] font-bold tracking-widest uppercase mt-0.5">
                Página {currentPage + 1} de {totalPages}
              </p>
            </div>
          </div>

          {/* Separator */}
          <div
            className="h-px w-full mb-5"
            style={{
              background: `linear-gradient(90deg, ${normativa.color}30, ${normativa.color}08, transparent)`,
            }}
          />

          {/* Section Content */}
          <div>
            {section.content.map((block, i) => (
              <NormativaBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - GTA Style */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {/* Previous */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="gta-bottom-nav flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
          style={{
            color: currentPage === 0 ? '#637381' : normativa.color,
            backgroundColor: currentPage === 0 ? 'transparent' : `${normativa.color}08`,
            border: `1px solid ${currentPage === 0 ? 'rgba(255,255,255,0.05)' : `${normativa.color}18`}`,
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline truncate max-w-[150px]">
            {prevSection ? prevSection.title : 'Anterior'}
          </span>
          <span className="sm:hidden">Anterior</span>
        </button>

        {/* Page Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {totalPages <= 20 ? (
            normativa.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === currentPage ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
                }`}
                style={{
                  backgroundColor: i === currentPage ? normativa.color : 'rgba(255,255,255,0.12)',
                  boxShadow: i === currentPage ? `0 0 8px ${normativa.color}50` : 'none',
                  opacity: i === currentPage ? 1 : (Math.abs(i - currentPage) <= 2 ? 0.6 : 0.25),
                }}
                title={s.title}
              />
            ))
          ) : (
            <span className="text-xs text-[#637381] font-bold tabular-nums tracking-wider">
              {currentPage + 1} / {totalPages}
            </span>
          )}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="gta-bottom-nav flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
          style={{
            color: currentPage === totalPages - 1 ? '#637381' : normativa.color,
            backgroundColor: currentPage === totalPages - 1 ? 'transparent' : `${normativa.color}08`,
            border: `1px solid ${currentPage === totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${normativa.color}18`}`,
          }}
        >
          <span className="hidden sm:inline truncate max-w-[150px]">
            {nextSection ? nextSection.title : 'Siguiente'}
          </span>
          <span className="sm:hidden">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="mt-5 flex justify-center">
        <p className="text-[10px] text-[#4a4a55] flex items-center gap-2 font-medium">
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[#637381]">←</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[#637381]">→</span>
          Navegar entre secciones
        </p>
      </div>
    </div>
  );
}
