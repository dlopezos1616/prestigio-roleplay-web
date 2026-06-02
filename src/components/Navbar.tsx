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
            <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[rgba(0,180,255,0.3)] transition-colors">
              <img
                src="/logo.png"
                alt="Prestigio RP"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest text-white group-hover:text-[#00b4ff] transition-colors">
                PRESTIGIO
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#d4a843] -mt-0.5">
                ROLEPLAY
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('#/')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
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
                <div className="absolute top-full right-0 mt-2 w-64 glass-strong rounded-xl overflow-hidden shadow-2xl shadow-black/40 animate-fade-in">
                  <div className="py-2">
                    {normativas.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onNavigate(`#/normativa/${n.id}`);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <span className="text-lg">{n.icon}</span>
                        <div>
                          <div className="text-sm text-white font-medium">{n.shortTitle}</div>
                          <div className="text-xs text-[#a1a1aa] line-clamp-2">{n.description}</div>
                        </div>
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
              className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all cursor-pointer ${
                isHome
                  ? 'text-[#00b4ff] bg-[rgba(0,180,255,0.1)]'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio
            </button>
            <div className="pt-1 pb-1">
              <span className="px-4 text-xs font-semibold tracking-wider text-[#d4a843] uppercase">
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
                <span className="text-sm text-[#e4e4e7]">{n.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
