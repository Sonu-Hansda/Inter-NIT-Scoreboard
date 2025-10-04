import { useState, useEffect, useRef } from 'react';
import ScoreTable from './components/ScoreTable';

export default function App() {
  const [showLiveHint, setShowLiveHint] = useState(false);
  const [isLiveVideoAvailable, setIsLiveVideoAvailable] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoSectionRef.current) {
        const { top, bottom } = videoSectionRef.current.getBoundingClientRect();
        const isVideoSectionInView = top < window.innerHeight && bottom >= 0;
        setShowLiveHint(!isVideoSectionInView);
      } else {
        setShowLiveHint(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoSectionRef]); 

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setShowLiveHint(false);
  };

  const handleVideoSourceAvailableChange = (isAvailable: boolean) => {
    setIsLiveVideoAvailable(isAvailable);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <ScoreTable
        videoSectionRef={videoSectionRef}
        onVideoSourceAvailableChange={handleVideoSourceAvailableChange}
      />
      {showLiveHint && isLiveVideoAvailable && (
        <>
          <div className="fixed bottom-16 right-8 z-50 animate-bounce text-red-600 text-4xl">
            👇
          </div>
          <button
            className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-50 animate-pulse"
            onClick={scrollToVideo}
            aria-label="Scroll to Live Video"
          >
            LIVE
          </button>
        </>
      )}
    </main>
  );
}
