'use client';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5" style={{ backgroundColor: '#08080d' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
              <img
                src="/logo.png"
                alt="Prestigio RP"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest text-white">PRESTIGIO </span>
              <span className="text-sm font-bold tracking-widest text-[#d4a843]">ROLEPLAY</span>
            </div>
          </div>

          {/* Center text */}
          <div className="text-center">
            <p className="text-xs text-[#637381]">
              Normativas del servidor &mdash; Todos los derechos reservados
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#637381]">
            &copy; {new Date().getFullYear()} Prestigio Roleplay
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
