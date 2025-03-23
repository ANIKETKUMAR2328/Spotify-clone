import React, { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { UserProfile } from '../types/database';

function UserProfileComponent() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error loading profile:', error);
    } else {
      setProfile(data);
      setUsername(data.username);
      setStatus(data.status);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user || !username.trim()) return;

    const { error } = await supabase
      .from('user_profiles')
      .update({
        username: username.trim(),
        status: status.trim() || 'Hey there! I am using ChatConnect',
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      loadProfile();
      setIsEditing(false);
    }
  };

  const copyToken = () => {
    if (profile?.connection_token) {
      navigator.clipboard.writeText(profile.connection_token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 transform transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-2xl">
            {profile.username[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {profile.username}
            </h2>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Connection Token
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
              {profile.connection_token}
            </code>
            <button
              onClick={copyToken}
              className="p-2 text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
            >
              <Copy size={20} />
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-500 mt-1">Copied to clipboard!</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Status
          </label>
          {isEditing ? (
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="mt-1 text-gray-800 dark:text-white">{profile.status}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-all duration-300 transform hover:scale-[1.05]"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-all duration-300 transform hover:scale-[1.05]"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileComponent;