'use client';

import { useEffect, useRef } from 'react';
import { NormativaData, NormativaSection } from '@/lib/normativas';
import NormativaBlock from './NormativaBlock';

interface NormativaPageProps {
  normativa: NormativaData;
  onBack: () => void;
}

function SectionItem({ section, normativaColor }: { section: NormativaSection; normativaColor: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="section-observe">
      <div className="glass rounded-xl p-5 sm:p-6 mb-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{
              backgroundColor: `${normativaColor}15`,
              border: `1px solid ${normativaColor}25`,
            }}
          >
            {section.icon}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {section.title}
          </h3>
        </div>

        {/* Section Content */}
        <div>
          {section.content.map((block, i) => (
            <NormativaBlock key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NormativaPage({ normativa, onBack }: NormativaPageProps) {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [normativa.id]);

  return (
    <div ref={topRef} className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#00b4ff] transition-colors mb-6 cursor-pointer group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
          style={{
            background: `linear-gradient(90deg, ${normativa.color}50, transparent)`,
          }}
        />
      </div>

      {/* Table of Contents */}
      <div className="glass rounded-xl p-4 sm:p-5 mb-6">
        <h3 className="text-xs font-semibold tracking-widest text-[#d4a843] uppercase mb-3">
          Índice de secciones
        </h3>
        <div className="flex flex-wrap gap-2">
          {normativa.sections.map((section) => (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#a1a1aa] bg-white/5 border border-white/5 hover:border-[rgba(0,180,255,0.2)] hover:text-[#00b4ff] transition-all"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(`section-${section.id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {section.icon} {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-0">
        {normativa.sections.map((section) => (
          <div key={section.id} id={`section-${section.id}`}>
            <SectionItem section={section} normativaColor={normativa.color} />
          </div>
        ))}
      </div>

      {/* Back to Top */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#a1a1aa] bg-white/5 border border-white/5 hover:border-[rgba(0,180,255,0.2)] hover:text-[#00b4ff] transition-all cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Volver arriba
        </button>
      </div>
    </div>
  );
}
