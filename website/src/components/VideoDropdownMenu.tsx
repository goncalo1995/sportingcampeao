// VideoDropdownMenu.jsx
import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon, PlayCircleIcon } from 'lucide-react';

// Define the expected shape of video objects
// interface VideoItem {
//   id: string | number;
//   label: string;
//   url: string;
// }

// Example video list (replace with your actual data source)
const exampleVideoList = [
  { id: 'vid1', label: 'Edit', url: 'https://cdn.sportingcampeao.pt/edit.mp4' },
  { id: 'vid2', label: 'Short', url: 'https://cdn.sportingcampeao.pt/short.mp4' },
  { id: 'vid3', label: 'Completo', url: 'https://cdn.sportingcampeao.pt/completo_low.mp4' },
];

const VideoDropdownMenu = ({
  videos = exampleVideoList, // Prop for video list, defaults to example
  onVideoSelect, // Callback function when a video is selected, passes the video object
  triggerLabel = "Selecionar Vídeo", // Label for the dropdown trigger button
  selectedVideoId = null, // Optional: ID of the currently selected video for visual feedback
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedVideoLabel = () => {
    if (selectedVideoId) {
      const selected = videos.find(v => v.id === selectedVideoId);
      return selected ? selected.label : triggerLabel;
    }
    return triggerLabel;
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
                     bg-white text-slate-700 border border-slate-300
                     hover:bg-slate-50 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-sporting focus-visible:ring-opacity-75
                     data-[state=open]:bg-slate-50 data-[state=open]:ring-2 data-[state=open]:ring-sporting data-[state=open]:ring-opacity-75
                     transition-colors"
          aria-label="Escolher vídeo"
        >
          <PlayCircleIcon className="mr-2 h-5 w-5 text-sporting" aria-hidden="true" />
          <span className="truncate max-w-[150px] sm:max-w-[200px]">{getSelectedVideoLabel()}</span>
          <ChevronDownIcon
            className={`ml-2 h-5 w-5 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 mt-2 w-64 origin-top-right rounded-md bg-white p-1 shadow-xl
                     ring-1 ring-black ring-opacity-5 focus:outline-none
                     animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                     data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
                     data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={5}
          align="end" // Aligns the dropdown to the right edge of the trigger
        >
          {videos.map((video) => (
            <DropdownMenu.Item
              key={video.id}
              onSelect={() => {
                onVideoSelect(video);
                // setIsOpen(false); // Radix handles this by default on item select
              }}
              className={`group relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm
                          outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50
                          hover:bg-sporting hover:text-white focus:bg-sporting focus:text-white
                          ${selectedVideoId === video.id ? 'bg-sporting/10 text-sporting font-medium' : 'text-slate-800'}`}
            >
              <PlayCircleIcon className={`mr-2 h-4 w-4 ${selectedVideoId === video.id ? 'text-sporting' : 'text-slate-400 group-hover:text-white group-focus:text-white' }`} />
              <span className="flex-grow truncate">{video.label}</span>
              {selectedVideoId === video.id && (
                <CheckIcon className="ml-auto h-4 w-4 text-sporting group-hover:text-white group-focus:text-white" aria-hidden="true" />
              )}
            </DropdownMenu.Item>
          ))}
          {videos.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-500">Nenhum vídeo disponível.</div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default VideoDropdownMenu;

// --- Example Usage in another component ---
// import VideoDropdownMenu from './VideoDropdownMenu';
//
// const MyPage = () => {
//   const [currentVideo, setCurrentVideo] = useState(null);
//
//   const customVideoList = [
//     { id: 'promo1', label: 'Promoção Sporting TV', url: '/videos/promo.mp4'},
//     { id: 'matchHighlight', label: 'Resumo do Jogo X', url: '/videos/jogo_x.mp4'},
//   ];
//
//   const handleVideoSelection = (video) => {
//     console.log('Selected video:', video);
//     setCurrentVideo(video);
//     // Here you would typically update the src of your <video> element
//     // e.g., if you have a videoRef: videoRef.current.src = video.url; videoRef.current.load(); videoRef.current.play();
//   };
//
//   return (
//     <div className="p-10">
//       <VideoDropdownMenu
//         videos={customVideoList}
//         onVideoSelect={handleVideoSelection}
//         triggerLabel="Escolher um Vídeo"
//         selectedVideoId={currentVideo?.id}
//       />
//
//       {currentVideo && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold">A Reproduzir: {currentVideo.label}</h3>
//           <video key={currentVideo.url} width="640" height="360" controls autoPlay src={currentVideo.url} className="mt-2 rounded-lg">
//             Seu navegador não suporta vídeos.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// };