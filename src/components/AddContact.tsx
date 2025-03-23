import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

function AddContact() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuthStore();

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim() || !user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Find user by token
      const { data: contactUser, error: userError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('connection_token', token)
        .single();

      if (userError || !contactUser) {
        throw new Error('Invalid connection token');
      }

      if (contactUser.id === user.id) {
        throw new Error('Cannot add yourself as a contact');
      }

      // Create connection
      const { error: connectionError } = await supabase
        .from('connections')
        .insert([
          {
            user_id: user.id,
            connected_user_id: contactUser.id,
          },
        ]);

      if (connectionError) {
        if (connectionError.code === '23505') {
          throw new Error('Contact already added');
        }
        throw connectionError;
      }

      setSuccess('Contact added successfully!');
      setToken('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleAddContact} className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Connection Token
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-transform duration-200 focus:scale-[1.02]"
              placeholder="Enter connection token"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm">{success}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          <UserPlus size={20} />
          {isLoading ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
}

export default AddContact;