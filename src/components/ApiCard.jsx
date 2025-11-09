import { useState } from 'react';

const methodColors = {
  GET: 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40',
  POST: 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40',
};

export default function ApiCard({ method, path, description, params = [], sample, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur hover:bg-slate-900 transition shadow-lg overflow-hidden">
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${methodColors[method]}`}>{method}</span>
            <code className="text-slate-100 text-sm break-all">{path}</code>
          </div>
          {description && <p className="mt-2 text-slate-400 text-sm">{description}</p>}
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 px-3 py-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition touch-manipulation"
          aria-expanded={open}
        >
          {open ? 'Hide' : 'Details'}
        </button>
      </div>

      {open && (
        <div className="px-4 sm:px-5 pb-4 space-y-4">
          {params.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-slate-200 font-medium">Parameters</h4>
                <button className="md:hidden text-blue-400 underline" onClick={() => setExpanded((e) => !e)}>
                  {expanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 ${expanded ? '' : ''}`}>
                {params.map((p) => (
                  <div key={p.name} className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300 font-medium">{p.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{p.type}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sample && (
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-slate-200 font-medium">Sample</h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sample);
                  }}
                  className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition touch-manipulation"
                >
                  Copy
                </button>
              </div>
              <div className="mt-2 overflow-x-auto">
                <pre className="min-w-full whitespace-pre bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-slate-200 text-xs">
{sample}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
