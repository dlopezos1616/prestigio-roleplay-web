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
  const topRef = useRef<HTMLDivElement>(null);
  const totalPages = normativa.sections.length;

  // Reset page when normativa changes
  useEffect(() => {
    setCurrentPage(0);
    setShowIndex(false);
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
      {/* Header */}
      <div className="mb-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#00b4ff] transition-colors mb-5 cursor-pointer group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a normativas
        </button>

        {/* Title Area */}
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
            style={{
              backgroundColor: `${normativa.color}15`,
              border: `1px solid ${normativa.color}30`,
              boxShadow: `0 0 20px ${normativa.color}10`,
            }}
          >
            {normativa.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {normativa.title}
            </h1>
            <p className="text-sm text-[#a1a1aa] mt-1">{normativa.description}</p>
          </div>
        </div>

        {/* Color Accent Line */}
        <div
          className="h-px w-full mt-4"
          style={{ background: `linear-gradient(90deg, ${normativa.color}50, transparent)` }}
        />
      </div>

      {/* Book Navigation Bar */}
      <div className="book-nav-bar glass rounded-xl p-3 sm:p-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          {/* Index Toggle */}
          <button
            onClick={() => setShowIndex(!showIndex)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
              showIndex
                ? 'text-[#00b4ff] bg-[rgba(0,180,255,0.1)] border border-[rgba(0,180,255,0.2)]'
                : 'text-[#a1a1aa] bg-white/5 border border-white/5 hover:border-[rgba(0,180,255,0.2)] hover:text-[#00b4ff]'
            }`}
            title="Índice de secciones"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline">Índice</span>
          </button>

          {/* Current Section Title */}
          <div className="flex-1 text-center min-w-0 px-2">
            <p className="text-[11px] text-[#637381] mb-0.5">
              Sección {currentPage + 1} de {totalPages}
            </p>
            <p className="text-sm font-semibold text-white truncate">
              {section.icon} {section.title}
            </p>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={goPrev}
              disabled={currentPage === 0}
              className="book-nav-btn p-2 rounded-lg transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                color: currentPage === 0 ? '#637381' : normativa.color,
                backgroundColor: currentPage === 0 ? 'transparent' : `${normativa.color}10`,
                border: `1px solid ${currentPage === 0 ? 'rgba(255,255,255,0.05)' : `${normativa.color}25`}`,
              }}
              title="Sección anterior (←)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentPage === totalPages - 1}
              className="book-nav-btn p-2 rounded-lg transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                color: currentPage === totalPages - 1 ? '#637381' : normativa.color,
                backgroundColor: currentPage === totalPages - 1 ? 'transparent' : `${normativa.color}10`,
                border: `1px solid ${currentPage === totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${normativa.color}25`}`,
              }}
              title="Sección siguiente (→)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${normativa.color}, ${normativa.color}80)`,
              boxShadow: `0 0 8px ${normativa.color}40`,
            }}
          />
        </div>
      </div>

      {/* Index Panel */}
      {showIndex && (
        <div className="glass rounded-xl p-4 sm:p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold tracking-widest text-[#d4a843] uppercase">
              Índice de secciones
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
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-medium transition-all cursor-pointer ${
                  i === currentPage
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-[#a1a1aa] bg-white/[0.02] border border-transparent hover:bg-white/5 hover:text-white'
                }`}
              >
                <span
                  className="w-5 h-5 rounded text-[10px] flex items-center justify-center shrink-0 font-bold"
                  style={{
                    backgroundColor: i === currentPage ? `${normativa.color}20` : 'rgba(255,255,255,0.05)',
                    color: i === currentPage ? normativa.color : '#637381',
                    border: `1px solid ${i === currentPage ? `${normativa.color}30` : 'rgba(255,255,255,0.05)'}`,
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
        <div className="glass rounded-xl p-5 sm:p-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
              style={{
                backgroundColor: `${normativa.color}15`,
                border: `1px solid ${normativa.color}25`,
              }}
            >
              {section.icon}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {section.title}
              </h2>
              <p className="text-xs text-[#637381] mt-0.5">
                Página {currentPage + 1} de {totalPages}
              </p>
            </div>
          </div>

          {/* Section Content */}
          <div>
            {section.content.map((block, i) => (
              <NormativaBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {/* Previous */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
          style={{
            color: currentPage === 0 ? '#637381' : normativa.color,
            backgroundColor: currentPage === 0 ? 'transparent' : `${normativa.color}10`,
            border: `1px solid ${currentPage === 0 ? 'rgba(255,255,255,0.05)' : `${normativa.color}20`}`,
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline truncate max-w-[150px]">
            {prevSection ? prevSection.title : 'Anterior'}
          </span>
          <span className="sm:hidden">Anterior</span>
        </button>

        {/* Page Indicator Dots */}
        <div className="flex items-center gap-1">
          {totalPages <= 20 ? (
            normativa.sections.map((s, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === currentPage ? 'scale-125' : 'opacity-30 hover:opacity-60'
                }`}
                style={{
                  backgroundColor: i === currentPage ? normativa.color : '#637381',
                  boxShadow: i === currentPage ? `0 0 6px ${normativa.color}50` : 'none',
                }}
                title={s.title}
              />
            ))
          ) : (
            <span className="text-xs text-[#637381] tabular-nums">
              {currentPage + 1} / {totalPages}
            </span>
          )}
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:opacity-15 disabled:cursor-not-allowed"
          style={{
            color: currentPage === totalPages - 1 ? '#637381' : normativa.color,
            backgroundColor: currentPage === totalPages - 1 ? 'transparent' : `${normativa.color}10`,
            border: `1px solid ${currentPage === totalPages - 1 ? 'rgba(255,255,255,0.05)' : `${normativa.color}20`}`,
          }}
        >
          <span className="hidden sm:inline truncate max-w-[150px]">
            {nextSection ? nextSection.title : 'Siguiente'}
          </span>
          <span className="sm:hidden">Siguiente</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="mt-4 flex justify-center">
        <p className="text-[10px] text-[#4a4a55] flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[#637381]">←</span>
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[#637381]">→</span>
          Navegar entre secciones
        </p>
      </div>
    </div>
  );
}
