import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { songs } from '../data/songs';
import { artists } from '../data/artists';
import { usePlayerStore } from '../store/usePlayerStore';

function Search() {
  const [query, setQuery] = useState('');
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="relative mb-6">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {query && (
        <div className="space-y-6">
          {filteredArtists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-5 gap-4">
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors cursor-pointer"
                  >
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full mb-4"
                    />
                    <h3 className="font-semibold">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredSongs.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Songs</h2>
              <div className="space-y-2">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => setCurrentSong(song)}
                    className="flex items-center p-2 hover:bg-[#282828] rounded-md cursor-pointer group"
                  >
                    <img
                      src={song.albumCover}
                      alt={song.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                      <div className="font-medium group-hover:text-white">{song.title}</div>
                      <div className="text-sm text-gray-400">{song.artist.name}</div>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">{song.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredSongs.length === 0 && filteredArtists.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;