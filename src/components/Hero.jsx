import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/60 to-slate-900 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-24 md:py-28 lg:py-32">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50 drop-shadow">Media Downloader API by Debraj</h1>
        <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg">Fast, reliable endpoints to fetch audio, video, and metadata from YouTube, Instagram, Facebook, TikTok, Spotify and more. Built for developers, optimized for mobile testing.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href="#tester" className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] transition touch-manipulation">Open Live Tester</a>
          <a href="#endpoints" className="px-5 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800/60 active:scale-[0.98] transition touch-manipulation">Explore Endpoints</a>
        </div>
      </div>
    </section>
  );
}
