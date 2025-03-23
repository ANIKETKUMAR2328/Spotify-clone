import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types/database';
import { useAuthStore } from '../store/useAuthStore';
import AddContact from './AddContact';

interface ContactListProps {
  onSelectContact: (contact: UserProfile) => void;
}

function ContactList({ onSelectContact }: ContactListProps) {
  const [contacts, setContacts] = useState<UserProfile[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      loadContacts();
      
      // Subscribe to new connections
      const channel = supabase
        .channel('contacts')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'connections',
          },
          () => {
            loadContacts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const loadContacts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .in(
        'id',
        supabase
          .from('connections')
          .select('connected_user_id')
          .eq('user_id', user.id)
      );

    if (error) {
      console.error('Error loading contacts:', error);
    } else {
      setContacts(data || []);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b dark:border-gray-700">
        <button
          onClick={() => setShowAddContact(!showAddContact)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          <UserPlus size={20} />
          Add New Contact
        </button>
      </div>

      {showAddContact && (
        <AddContact />
      )}

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-lg">
                  {contact.username[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {contact.username}
                </h3>
                <p className="text-sm text-gray-500">{contact.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;