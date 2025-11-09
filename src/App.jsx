import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EndpointGrid from './components/EndpointGrid';
import LiveTester from './components/LiveTester';
import LogsViewer from './components/LogsViewer';

export default function App() {
  const [view, setView] = useState('docs');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Header currentView={view} onNavigate={setView} />

      {view === 'docs' && (
        <>
          <Hero />

          <main className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-emerald-500/0 to-transparent" />
            <EndpointGrid />
            <LiveTester />
          </main>
        </>
      )}

      {view === 'logs' && (
        <main className="pt-4">
          <LogsViewer />
        </main>
      )}
    </div>
  );
}
