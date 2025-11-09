import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ currentView, onNavigate }) {
  const [open, setOpen] = useState(false);

  const NavButton = ({ id, label }) => (
    <button
      onClick={() => {
        onNavigate(id);
        setOpen(false);
      }}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors touch-manipulation ${
        currentView === id
          ? 'bg-blue-600 text-white'
          : 'text-slate-200 hover:bg-slate-700/60'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-800/70" style={{paddingTop: 'env(safe-area-inset-top)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 ring-1 ring-blue-500/40 flex items-center justify-center text-blue-400 font-bold">D</div>
            <span className="text-slate-100 font-semibold select-none">Debraj API</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavButton id="docs" label="Docs" />
            <NavButton id="logs" label="Logs" />
            <a href="http://51.222.14.176:25576/health" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md text-sm font-medium text-emerald-400 hover:bg-slate-700/60">Health</a>
          </nav>
          <button
            className="md:hidden p-2 rounded-md text-slate-200 hover:bg-slate-700/60 active:scale-95 transition"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-800/70 bg-slate-900/95">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavButton id="docs" label="Docs" />
            <NavButton id="logs" label="Logs" />
            <a href="http://51.222.14.176:25576/health" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md text-sm font-medium text-emerald-400 hover:bg-slate-700/60">Health</a>
          </div>
        </div>
      )}
    </header>
  );
}
