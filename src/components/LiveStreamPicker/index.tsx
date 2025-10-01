import { useState } from 'react';
import { getStreamConfigs } from '../../lib/streams';
import type { Stream } from '../../types/LiveStream';

export default function LiveStreamPicker() {
  const streams = getStreamConfigs();
  const [selected, setSelected] = useState<Stream | null>(streams[0] ?? null);

  if (streams.length === 0) return null;
  return (
    <div className="mt-10 max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Live Stream</h2>

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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{selected.title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
