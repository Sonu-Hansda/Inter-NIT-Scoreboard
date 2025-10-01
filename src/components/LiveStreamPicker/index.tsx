import { useEffect, useState } from 'react';
import { getStreamConfigs } from '../../lib/streams';
import type { Stream } from '../../types/LiveStream';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function LiveStreamPicker() {
  const streams = getStreamConfigs();
  const [selected, setSelected] = useState<Stream | null>(streams[0] ?? null);
  const [viewers, setViewers] = useState<number | null>(null);

  useEffect(() => {
    if (!selected) return;
    if (window.YT) return;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('yt-player', {
        videoId: selected.id,
        events: {
          onReady: (e: any) => {
            setInterval(() => {
              try {
                const stats = e.target.getVideoStats?.();
                if (stats?.viewCount) setViewers(parseInt(stats.viewCount, 10));
              } catch {
                setViewers(null);
              }
            }, 5000);
          },
        },
      });
    };
  }, [selected]);

  if (streams.length === 0) return null;
  return (
    <div className="mt-10 max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Live Stream</h2>

      {/* selector pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {streams.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition border ${
              selected?.id === s.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="aspect-video">
            <iframe
              id="yt-player"
              className="w-full h-full"
              src={`${selected.url}?autoplay=1&mute=1&rel=0`}
              title={selected.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{selected.title}</span>
            {viewers && (
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {viewers.toLocaleString()} viewers
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}