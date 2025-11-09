import { useEffect, useMemo, useRef, useState } from 'react';

const BASE = 'http://51.222.14.176:25576';

export default function LiveTester() {
  const [endpoint, setEndpoint] = useState('/download/youtube/audio');
  const [method, setMethod] = useState('GET');
  const [query, setQuery] = useState('');
  const [body, setBody] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const viewerRef = useRef(null);

  const url = useMemo(() => {
    const q = query.trim();
    return q ? `${BASE}${endpoint}?${q}` : `${BASE}${endpoint}`;
  }, [endpoint, query]);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.scrollTop = 0;
    }
  }, [response]);

  const run = async () => {
    setLoading(true);
    setStatus(null);
    setResponse(null);
    try {
      const opts = { method };
      if (method !== 'GET' && body.trim()) {
        opts.headers = { 'Content-Type': 'application/json' };
        opts.body = body;
      }
      const res = await fetch(url, opts);
      const ct = res.headers.get('content-type') || '';
      let data;
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const txt = await res.text();
        data = { creator: 'Debraj', status: res.status, success: res.ok, result: { raw: txt } };
      }
      setStatus(res.status);
      setResponse(data);
    } catch (e) {
      setStatus(0);
      setResponse({ creator: 'Debraj', status: 0, success: false, result: { error: e.message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tester" className="relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-slate-100 text-2xl font-bold">Live Tester</h2>
        <p className="text-slate-400 text-sm mt-1">Test endpoints with touch-friendly controls. Responses render in a bottom sheet on mobile.</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full rounded-lg bg-slate-900 border border-slate-800 text-slate-100 p-3">
                <option>GET</option>
                <option>POST</option>
              </select>
              <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="sm:col-span-2 w-full rounded-lg bg-slate-900 border border-slate-800 text-slate-100 p-3" placeholder="/download/youtube/audio" />
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg bg-slate-900 border border-slate-800 text-slate-100 p-3" placeholder="query string e.g. url=...&quality=..." />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} className="w-full rounded-lg bg-slate-900 border border-slate-800 text-slate-100 p-3" placeholder='{"url":"..."}' />

            <div className="flex gap-3">
              <button onClick={run} disabled={loading} className="flex-1 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60 active:scale-[0.99] transition touch-manipulation">{loading ? 'Running...' : 'Send Request'}</button>
              <button onClick={() => { navigator.clipboard.writeText(url); }} className="px-5 py-3 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 active:scale-95 transition touch-manipulation">Copy URL</button>
            </div>

            <div className="text-xs text-slate-400">
              <div>Base URL: <code className="text-slate-200">{BASE}</code></div>
              <div>Resolved: <code className="text-slate-200 break-all">{url}</code></div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div ref={viewerRef} className="h-[420px] rounded-xl border border-slate-800 bg-slate-900 overflow-auto">
              <ResponseView status={status} data={response} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet on mobile */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4" style={{paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)'}}>
          <div className="rounded-t-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="p-3 flex items-center justify-between">
              <div className="w-10 h-1.5 bg-slate-700 rounded-full mx-auto" />
            </div>
            <div ref={viewerRef} className="max-h-[45vh] overflow-auto">
              <ResponseView status={status} data={response} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponseView({ status, data }) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Status</span>
        <span className={`font-mono ${status === 200 ? 'text-emerald-400' : status ? 'text-amber-400' : 'text-slate-400'}`}>{status ?? '-'}</span>
      </div>
      <div className="mt-3 overflow-x-auto">
        <pre className="whitespace-pre text-xs text-slate-200 bg-slate-950/60 border border-slate-800 rounded-lg p-3 min-w-full">
{JSON.stringify(data || { creator: 'Debraj', status: 200, success: true, result: {} }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
