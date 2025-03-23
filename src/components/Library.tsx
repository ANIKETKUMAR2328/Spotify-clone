import React, { useState } from 'react';
import { Plus, Search as SearchIcon } from 'lucide-react';
import { songs } from '../data/songs';
import { usePlayerStore } from '../store/usePlayerStore';

function Library() {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      // In a real app, this would save to a database
      console.log('Creating playlist:', playlistName);
      setShowCreatePlaylist(false);
      setPlaylistName('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="p-2 hover:bg-[#282828] rounded-full"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {showCreatePlaylist && (
        <div className="mb-6 p-4 bg-[#282828] rounded-lg">
          <input
            type="text"
            placeholder="New Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full p-2 bg-white/10 rounded text-white placeholder-gray-400 mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowCreatePlaylist(false)}
              className="px-4 py-2 text-sm hover:bg-white/10 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePlaylist}
              className="px-4 py-2 text-sm bg-green-500 hover:bg-green-400 rounded"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-[#282828] rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Liked Songs</h2>
          <div className="space-y-2">
            {songs.slice(0, 5).map((song) => (
              <div
                key={song.id}
                onClick={() => setCurrentSong(song)}
                className="flex items-center p-2 hover:bg-[#383838] rounded cursor-pointer group"
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
        </div>

        <div className="p-4 bg-[#282828] rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Your Playlists</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Punjabi Hits', 'Workout Mix', 'Party Anthems', 'Chill Vibes'].map((playlist) => (
              <div
                key={playlist}
                className="p-4 bg-[#383838] rounded-lg hover:bg-[#484848] transition-colors cursor-pointer"
              >
                <h3 className="font-medium">{playlist}</h3>
                <p className="text-sm text-gray-400">Playlist • You</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;