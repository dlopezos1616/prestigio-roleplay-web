'use client';

import { NormativaData } from '@/lib/normativas';

interface NormativaCardProps {
  normativa: NormativaData;
  index: number;
  onClick: () => void;
}

export default function NormativaCard({ normativa, index, onClick }: NormativaCardProps) {
  return (
    <button
      onClick={onClick}
      className={`glass-card relative overflow-hidden rounded-xl p-6 text-left w-full group cursor-pointer animate-fade-in-up stagger-${index + 1}`}
      style={{
        '--hover-color': normativa.color,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${normativa.color}40`;
        el.style.boxShadow = `0 0 20px ${normativa.color}20, 0 8px 32px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Icon & Color Accent */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{
            backgroundColor: `${normativa.color}15`,
            border: `1px solid ${normativa.color}25`,
          }}
        >
          {normativa.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white group-hover:text-[#00b4ff] transition-colors leading-tight">
            {normativa.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-2 mb-4">
        {normativa.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: normativa.color }}
          />
          <span className="text-xs text-[#637381]">
            {normativa.sections.length} secciones
          </span>
        </div>

        <div
          className="flex items-center gap-1 text-xs font-medium transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
          style={{ color: normativa.color }}
        >
          Leer más
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Top color line accent */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${normativa.color}60, transparent)`,
        }}
      />
    </button>
  );
}
