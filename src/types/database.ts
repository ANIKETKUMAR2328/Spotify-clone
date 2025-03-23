export interface UserProfile {
  id: string;
  username: string;
  connection_token: string;
  avatar_url: string | null;
  status: string;
  created_at: string;
}

export interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  created_at: string;
}

export interface Chat {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
}