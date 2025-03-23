import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 bg-black h-full p-6">
      <div className="text-white text-2xl font-bold mb-8">Punjabi Spotify</div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Home className="w-6 h-6 mr-4" />
            Home
          </Link>
          <Link to="/search" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Search className="w-6 h-6 mr-4" />
            Search
          </Link>
          <Link to="/library" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Library className="w-6 h-6 mr-4" />
            Your Library
          </Link>
        </div>

        <div className="pt-6 space-y-4">
          <Link to="/create-playlist" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <PlusSquare className="w-6 h-6 mr-4" />
            Create Playlist
          </Link>
          <Link to="/liked-songs" className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Heart className="w-6 h-6 mr-4" />
            Liked Songs
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <div className="text-sm text-gray-400 mt-4">Your Playlists</div>
          <div className="mt-2 space-y-2">
            <div className="text-gray-300 hover:text-white cursor-pointer">Punjabi Hits</div>
            <div className="text-gray-300 hover:text-white cursor-pointer">Sidhu's Best</div>
            <div className="text-gray-300 hover:text-white cursor-pointer">Workout Mix</div>
            <div className="text-gray-300 hover:text-white cursor-pointer">Party Anthems</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;