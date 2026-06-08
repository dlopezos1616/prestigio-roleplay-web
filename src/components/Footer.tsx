'use client';

export default function Footer() {
  return (
    <footer className="w-full relative" style={{ backgroundColor: '#08080d' }}>
      {/* Top neon accent */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,180,255,0.2), rgba(212,168,67,0.15), rgba(0,180,255,0.2), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(0,180,255,0.05)',
                border: '1px solid rgba(0,180,255,0.15)',
              }}
            >
              <img
                src="/logo.png"
                alt="Prestigio RP"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-black tracking-widest text-white">PRESTIGIO </span>
              <span className="text-sm font-black tracking-widest text-[#d4a843]">ROLEPLAY</span>
            </div>
          </div>

          {/* Center text */}
          <div className="text-center">
            <p className="text-xs text-[#637381] font-medium tracking-wide">
              Normativas del servidor &mdash; Todos los derechos reservados
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#4a4a55] font-medium">
            &copy; {new Date().getFullYear()} Prestigio Roleplay
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
