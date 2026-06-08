'use client';

import { useState } from 'react';
import { NormativaData } from '@/lib/normativas';

interface NormativaCardProps {
  normativa: NormativaData;
  index: number;
  onClick: () => void;
}

export default function NormativaCard({ normativa, index, onClick }: NormativaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`gta-card relative overflow-hidden rounded-xl text-left w-full group cursor-pointer animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image - Appears on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url(${normativa.backgroundImage})`,
          opacity: isHovered ? 0.35 : 0,
          transform: isHovered ? 'scale(1.08)' : 'scale(1.1)',
        }}
      />

      {/* Dark Overlay Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)`
            : `linear-gradient(180deg, rgba(17,17,24,0.5) 0%, rgba(17,17,24,0.9) 70%, rgba(17,17,24,0.98) 100%)`,
        }}
      />

      {/* Color Tint Overlay on Hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 mix-blend-overlay"
        style={{
          background: `radial-gradient(ellipse at center, ${normativa.color}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Scanline Effect on Hover */}
      <div
        className="absolute inset-0 gta-scanlines transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovered ? 0.4 : 0 }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, transparent, ${normativa.color}, ${normativa.color}80, transparent)`
            : `linear-gradient(90deg, transparent, ${normativa.color}30, transparent)`,
          boxShadow: isHovered ? `0 0 15px ${normativa.color}50` : 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-300"
            style={{
              backgroundColor: isHovered ? `${normativa.color}25` : `${normativa.color}12`,
              border: `1px solid ${isHovered ? normativa.color + '40' : normativa.color + '20'}`,
              boxShadow: isHovered ? `0 0 20px ${normativa.color}25, inset 0 0 12px ${normativa.color}10` : 'none',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {normativa.icon}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-bold leading-tight transition-all duration-300"
              style={{ color: isHovered ? normativa.color : '#ffffff' }}
            >
              {normativa.title}
            </h3>
            {/* GTA-style tag */}
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="gta-tag px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? `${normativa.color}25` : 'rgba(255,255,255,0.05)',
                  color: isHovered ? normativa.color : '#637381',
                  border: `1px solid ${isHovered ? normativa.color + '30' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {normativa.sections.length} SECCIONES
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-2 mb-5 transition-all duration-300"
          style={{ color: isHovered ? '#e4e4e7' : '#a1a1aa' }}
        >
          {normativa.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Section indicator dots */}
          <div className="flex items-center gap-1.5">
            {normativa.sections.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === 0 ? normativa.color : (isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'),
                }}
              />
            ))}
            {normativa.sections.length > 5 && (
              <span className="text-[10px] text-[#637381] ml-1">
                +{normativa.sections.length - 5}
              </span>
            )}
          </div>

          {/* Read more - GTA style */}
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-all duration-300"
            style={{
              color: isHovered ? normativa.color : '#637381',
              opacity: isHovered ? 1 : 0.6,
              transform: isHovered ? 'translateX(0)' : 'translateX(4px)',
            }}
          >
            <span>ACCEDER</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Color Glow on Hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, transparent, ${normativa.color}80, transparent)`
            : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${normativa.color}40, 0 0 40px ${normativa.color}15` : 'none',
        }}
      />

      {/* Corner Accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${normativa.color}15, transparent 70%)`,
          opacity: isHovered ? 1 : 0.3,
        }}
      />
    </button>
  );
}
