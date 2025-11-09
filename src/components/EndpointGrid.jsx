import ApiCard from './ApiCard';

const cards = [
  {
    method: 'GET',
    path: '/download/youtube/audio',
    description: 'Download YouTube audio stream.',
    params: [
      { name: 'url', type: 'string', desc: 'YouTube video URL.' },
      { name: 'quality', type: 'string', desc: 'Audio quality (e.g., 128kbps).' },
    ],
    sample: `curl -L "http://51.222.14.176:25576/download/youtube/audio?url=VIDEO_URL"`,
  },
  {
    method: 'GET',
    path: '/download/youtube/video',
    description: 'Download YouTube video stream.',
    params: [
      { name: 'url', type: 'string', desc: 'YouTube video URL.' },
      { name: 'quality', type: 'string', desc: 'Video quality (e.g., 720p).' },
    ],
    sample: `curl -L "http://51.222.14.176:25576/download/youtube/video?url=VIDEO_URL&quality=720p"`,
  },
  {
    method: 'GET',
    path: '/download/youtube/videofhd',
    description: 'Download YouTube video full HD.',
    params: [
      { name: 'url', type: 'string', desc: 'YouTube video URL.' },
    ],
    sample: `curl -L "http://51.222.14.176:25576/download/youtube/videofhd?url=VIDEO_URL"`,
  },
  {
    method: 'GET',
    path: '/download/youtube/search',
    description: 'Search YouTube and get results.',
    params: [
      { name: 'query', type: 'string', desc: 'Search keywords.' },
      { name: 'media_type', type: 'string', desc: 'audio | video' },
      { name: 'max_results', type: 'number', desc: 'Max results to return.' },
    ],
    sample: `curl -L "http://51.222.14.176:25576/download/youtube/search?query=lofi&media_type=video&max_results=5"`,
  },
  {
    method: 'GET',
    path: '/download/{platform}/{media_type}',
    description: 'Generic downloader for instagram/facebook/tiktok/spotify + video/audio.',
    params: [
      { name: 'platform', type: 'string', desc: 'instagram | facebook | tiktok | spotify' },
      { name: 'media_type', type: 'string', desc: 'video | audio' },
      { name: 'url', type: 'string', desc: 'Source URL.' },
    ],
    sample: `curl -L "http://51.222.14.176:25576/download/instagram/video?url=..."`,
  },
  {
    method: 'POST',
    path: '/download/infofile',
    description: 'Submit a file or JSON to retrieve media info.',
    params: [
      { name: 'payload', type: 'json', desc: 'Body with url or metadata.' },
    ],
    sample: `curl -L -X POST "http://51.222.14.176:25576/download/infofile" -H 'Content-Type: application/json' -d '{"url":"..."}'`,
  },
  {
    method: 'GET',
    path: '/health',
    description: 'Service health check.',
    params: [],
    sample: `curl -L "http://51.222.14.176:25576/health"`,
  },
];

export default function EndpointGrid() {
  return (
    <section id="endpoints" className="bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-slate-100 text-2xl font-bold">Endpoints</h2>
        <p className="text-slate-400 text-sm mt-1">Cards stack vertically on mobile and adapt to a grid on larger screens. Tap to expand details.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cards.map((c) => (
            <ApiCard key={c.path} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
