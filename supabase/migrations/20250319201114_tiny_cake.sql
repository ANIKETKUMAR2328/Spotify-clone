/*
  # Chat Application Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `connection_token` (text, unique)
      - `avatar_url` (text)
      - `status` (text)
      - `created_at` (timestamp)
      
    - `connections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `connected_user_id` (uuid, references user_profiles)
      - `created_at` (timestamp)
      
    - `chats`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references user_profiles)
      - `receiver_id` (uuid, references user_profiles)
      - `message` (text)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  connection_token text UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
  avatar_url text,
  status text DEFAULT 'Hey there! I am using ChatConnect',
  created_at timestamptz DEFAULT now()
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles NOT NULL,
  connected_user_id uuid REFERENCES user_profiles NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, connected_user_id)
);

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES user_profiles NOT NULL,
  receiver_id uuid REFERENCES user_profiles NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view connected profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT connected_user_id FROM connections WHERE user_id = auth.uid()
      UNION
      SELECT user_id FROM connections WHERE connected_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for connections
CREATE POLICY "Users can view their connections"
  ON connections
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR connected_user_id = auth.uid());

CREATE POLICY "Users can create connections"
  ON connections
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policies for chats
CREATE POLICY "Users can view their chats"
  ON chats
  FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON chats
  FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());