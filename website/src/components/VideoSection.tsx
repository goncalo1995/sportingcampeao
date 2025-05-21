
import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
      {/* Placeholder for the actual video */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/src/assets/video-thumbnail.jpg"
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/src/assets/promo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play/Pause button overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center group hover:bg-black/30 transition-colors duration-300"
        >
          <div className={`
            ${isPlaying ? 'opacity-0' : 'opacity-100'} 
            group-hover:opacity-100
            bg-sporting/90 rounded-full p-4 transition-all duration-300 hover:bg-sporting
          `}>
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white" />
            )}
          </div>
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Veja o vídeo para perceber melhor o projeto!
      </div>
    </div>
  );
};

export default VideoSection;
