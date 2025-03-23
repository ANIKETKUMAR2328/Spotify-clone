import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

function NowPlaying() {
  const { currentSong, isPlaying, progress, volume, togglePlay, setProgress, setVolume } = usePlayerStore();
  const [currentTime, setCurrentTime] = useState('0:00');
  const progressInterval = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, setProgress]);

  useEffect(() => {
    if (currentSong) {
      const totalSeconds = parseFloat(currentSong.duration.split(':')[0]) * 60 + 
                          parseFloat(currentSong.duration.split(':')[1]);
      const currentSeconds = (progress / 100) * totalSeconds;
      const minutes = Math.floor(currentSeconds / 60);
      const seconds = Math.floor(currentSeconds % 60);
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [progress, currentSong]);

  if (!currentSong) return null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - bounds.left) / bounds.width) * 100;
    setProgress(Math.min(Math.max(percent, 0), 100));
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - bounds.left) / bounds.width);
    setVolume(Math.min(Math.max(percent, 0), 1));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-gray-800 p-4">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center w-1/4">
          <div className="w-14 h-14 rounded overflow-hidden">
            <img
              src={currentSong.albumCover}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-white text-sm font-medium hover:underline cursor-pointer">
              {currentSong.title}
            </div>
            <div className="text-gray-400 text-xs hover:text-white hover:underline cursor-pointer">
              {currentSong.artist.name}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full mt-2 flex items-center">
            <span className="text-xs text-gray-400 w-10">{currentTime}</span>
            <div 
              className="mx-2 flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white group-hover:bg-spotify-green rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">{currentSong.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-end w-1/4">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <div 
            className="w-24 h-1 bg-gray-600 rounded-full ml-2 cursor-pointer group"
            onClick={handleVolumeClick}
          >
            <div
              className="h-full bg-white group-hover:bg-spotify-green rounded-full relative"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NowPlaying;