import { useEffect, useRef, useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';

const LOG_URL = '/logs.txt';

function Badge({ level }) {
  const color = level === 'ERROR' ? 'bg-red-500/20 text-red-400 ring-red-500/40' : level === 'WARNING' ? 'bg-amber-500/20 text-amber-300 ring-amber-500/40' : 'bg-blue-500/20 text-blue-300 ring-blue-500/40';
  return <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ring-1 ${color}`}>{level}</span>;
}

export default function LogsViewer() {
  const [logs, setLogs] = useState('');
  const [auto, setAuto] = useState(true);
  const [query, setQuery] = useState('');
  const scroller = useRef(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch(LOG_URL + `?t=${Date.now()}`);
      const text = await res.text();
      setLogs(text);
      if (auto && scroller.current) {
        scroller.current.scrollTop = scroller.current.scrollHeight;
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchLogs();
    const id = setInterval(fetchLogs, 3000);
    return () => clearInterval(id);
  }, [auto]);

  const lines = logs.split('\n').filter(Boolean);
  const filtered = lines.filter((l) => l.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="min-h-[60vh] flex flex-col">
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-800 p-3" style={{paddingTop: 'env(safe-area-inset-top)'}}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2 items-center">
          <h2 className="text-slate-100 font-semibold mr-auto">Application Logs - Debraj's API</h2>
          <div className="w-full sm:w-auto flex gap-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search logs" className="flex-1 sm:w-64 rounded-md bg-slate-900 border border-slate-800 text-slate-100 px-3 py-2" />
            <button onClick={fetchLogs} className="px-3 py-2 rounded-md bg-slate-800 text-slate-100 hover:bg-slate-700 active:scale-95 transition"><RefreshCw size={16} /></button>
          </div>
        </div>
      </div>

      <div ref={scroller} className="flex-1 overflow-auto bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-sm leading-relaxed">
          {filtered.length === 0 && (
            <div className="text-slate-400">No logs yet...</div>
          )}
          {filtered.map((line, idx) => {
            const match = line.match(/^(\[.*?\])\s+(INFO|WARNING|ERROR)\s+-(.*)$/);
            const ts = match ? match[1] : '';
            const lvl = match ? match[2] : 'INFO';
            const msg = match ? match[3] : line;
            return (
              <div key={idx} className="flex items-start gap-2 py-1 border-b border-slate-800/50">
                <span className="text-emerald-400 shrink-0">{ts}</span>
                <Badge level={lvl} />
                <span className="text-slate-200 break-words">{msg}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          setAuto((a) => !a);
          if (!auto && scroller.current) {
            scroller.current.scrollTop = scroller.current.scrollHeight;
          }
        }}
        className="fixed right-4 bottom-20 sm:bottom-6 z-20 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 active:scale-95 transition flex items-center gap-2"
      >
        <ChevronDown size={18} />
        {auto ? 'Auto-scroll On' : 'Auto-scroll Off'}
      </button>
    </section>
  );
}
