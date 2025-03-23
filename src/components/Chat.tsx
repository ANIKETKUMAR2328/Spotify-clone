import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Chat, UserProfile } from '../types/database';
import { useAuthStore } from '../store/useAuthStore';

interface ChatProps {
  selectedUser?: UserProfile;
}

function ChatComponent({ selectedUser }: ChatProps) {
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && selectedUser) {
      // Subscribe to new messages
      const channel = supabase
        .channel('chat_messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chats',
            filter: `sender_id=eq.${user.id},receiver_id=eq.${selectedUser.id}`,
          },
          (payload) => {
            setChats((current) => [...current, payload.new as Chat]);
          }
        )
        .subscribe();

      // Load existing messages
      loadMessages();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const loadMessages = async () => {
    if (!user || !selectedUser) return;

    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setChats(data || []);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !selectedUser) return;

    const newMessage = {
      sender_id: user.id,
      receiver_id: selectedUser.id,
      message: message.trim(),
    };

    const { error } = await supabase.from('chats').insert([newMessage]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setMessage('');
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.002]">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-lg">
              {selectedUser.username[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {selectedUser.username}
            </h2>
            <p className="text-sm text-gray-500">{selectedUser.status}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.sender_id === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02] ${
                chat.sender_id === user?.id
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
              }`}
            >
              <p>{chat.message}</p>
              <span className="text-xs opacity-70">
                {new Date(chat.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white transition-transform duration-200 focus:scale-[1.01]"
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
            aria-label="Add emoji"
          >
            <Smile size={20} />
          </button>
          <button
            type="submit"
            className="p-2 bg-primary hover:bg-primary-light text-white rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatComponent;