import React from 'react';
import { songs } from '../data/songs';
import { artists } from '../data/artists';
import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

function Home() {
  const { setCurrentSong, currentSong, isPlaying, togglePlay } = usePlayerStore();

  const handlePlayClick = (song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 to-black p-8 overflow-auto">
      {/* Featured Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Artists</h2>
        <div className="grid grid-cols-5 gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors group cursor-pointer relative"
            >
              <div className="relative mb-4">
                <div className="aspect-square w-full rounded-full overflow-hidden">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button 
                  className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 hover:scale-105"
                  onClick={() => setCurrentSong(songs.find(s => s.artist.id === artist.id))}
                >
                  <Play className="w-6 h-6 text-black" />
                </button>
              </div>
              <h3 className="text-white font-semibold">{artist.name}</h3>
              <p className="text-gray-400 text-sm">{artist.monthlyListeners.toLocaleString()} monthly listeners</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Releases */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Releases</h2>
        <div className="grid grid-cols-6 gap-4">
          {songs.slice(0, 6).map((song) => (
            <div
              key={song.id}
              className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square w-full rounded overflow-hidden">
                  <img
                    src={song.albumCover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button 
                  className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 hover:scale-105"
                  onClick={() => handlePlayClick(song)}
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-6 h-6 text-black" />
                  ) : (
                    <Play className="w-6 h-6 text-black" />
                  )}
                </button>
              </div>
              <h3 className="text-white font-semibold truncate">{song.title}</h3>
              <p className="text-gray-400 text-sm truncate">{song.artist.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Playlists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Popular Playlists</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              name: 'Punjabi Hits',
              image: 'https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c'
            },
            {
              name: 'Trending Now',
              image: 'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5'
            },
            {
              name: 'Workout Beats',
              image: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1'
            },
            {
              name: 'Party Mix',
              image: 'https://i.scdn.co/image/ab67706f00000002db32a17c1f5291b19317b62e'
            }
          ].map((playlist) => (
            <div
              key={playlist.name}
              className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square w-full rounded overflow-hidden">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <button className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 hover:scale-105">
                  <Play className="w-6 h-6 text-black" />
                </button>
              </div>
              <h3 className="text-white font-semibold">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">Playlist • Punjabi Spotify</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;