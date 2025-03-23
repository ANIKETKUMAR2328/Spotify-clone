export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  monthlyListeners: number;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  albumName: string;
  albumCover: string;
  duration: string;
  audioUrl: string;
  releaseDate: string;
}

export interface Playlist {
  id: string;
  name: string;
  coverImage: string;
  songs: Song[];
  createdBy: string;
}