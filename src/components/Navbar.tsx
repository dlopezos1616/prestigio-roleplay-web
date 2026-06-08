'use client';

import { useState } from 'react';
import { normativas } from '@/lib/normativas';

interface NavbarProps {
  onNavigate: (hash: string) => void;
  currentHash: string;
}

export default function Navbar({ onNavigate, currentHash }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isHome = currentHash === '' || currentHash === '#' || currentHash === '#/';

  return (
    <nav className="navbar-glass sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <button
            onClick={() => onNavigate('#/')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(0,180,255,0.2)]"
              style={{
                backgroundColor: 'rgba(0,180,255,0.05)',
                border: '1px solid rgba(0,180,255,0.12)',
              }}
            >
              <img
                src="/logo.png"
                alt="Prestigio RP"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-white group-hover:text-[#00b4ff] transition-colors">
                PRESTIGIO
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4a843] -mt-0.5">
                ROLEPLAY
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('#/')}
              className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all cursor-pointer ${
                isHome
                  ? 'text-[#00b4ff] bg-[rgba(0,180,255,0.1)]'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio
            </button>

            {/* Normativas Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                  !isHome
                    ? 'text-[#00b4ff] bg-[rgba(0,180,255,0.1)]'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                }`}
              >
                Normativas
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 glass-strong rounded-xl overflow-hidden shadow-2xl shadow-black/50 animate-fade-in gta-scanlines">
                  <div className="py-1">
                    {normativas.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onNavigate(`#/normativa/${n.id}`);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-white/5 transition-colors cursor-pointer group/item"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                          style={{
                            backgroundColor: `${n.color}12`,
                            border: `1px solid ${n.color}20`,
                          }}
                        >
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-bold group-hover/item:text-[#00b4ff] transition-colors">{n.shortTitle}</div>
                          <div className="text-xs text-[#637381] line-clamp-1">{n.description}</div>
                        </div>
                        <svg className="w-3.5 h-3.5 text-[#4a4a55] group-hover/item:text-[#00b4ff] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => {
                onNavigate('#/');
                setMenuOpen(false);
              }}
              className={`w-full px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide text-left transition-all cursor-pointer ${
                isHome
                  ? 'text-[#00b4ff] bg-[rgba(0,180,255,0.1)]'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio
            </button>
            <div className="pt-1 pb-1">
              <span className="px-4 text-xs font-black tracking-widest text-[#d4a843] uppercase">
                Normativas
              </span>
            </div>
            {normativas.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  onNavigate(`#/normativa/${n.id}`);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 rounded-lg text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="text-lg">{n.icon}</span>
                <span className="text-sm text-[#e4e4e7] font-medium">{n.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
