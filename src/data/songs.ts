import { Song } from '../types/music';
import { artists } from './artists';

export const songs: Song[] = [
  // Sidhu Moose Wala Songs
  {
    id: '1',
    title: '295',
    artist: artists[0],
    albumName: 'Moosetape',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273e5c7f4c70dff3445760e0a5c',
    duration: '4:32',
    audioUrl: 'https://example.com/songs/295.mp3',
    releaseDate: '2021-05-15'
  },
  {
    id: '2',
    title: 'So High',
    artist: artists[0],
    albumName: 'Singles',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273097e63e944bd287d32b3eae1',
    duration: '3:55',
    audioUrl: 'https://example.com/songs/so-high.mp3',
    releaseDate: '2017-10-12'
  },
  
  // Karan Aujla Songs
  {
    id: '3',
    title: 'Players',
    artist: artists[1],
    albumName: 'BACTHAFU*UP',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273c7cd559a4ad5651d0c568398',
    duration: '3:45',
    audioUrl: 'https://example.com/songs/players.mp3',
    releaseDate: '2023-01-20'
  },
  {
    id: '4',
    title: 'Softly',
    artist: artists[1],
    albumName: 'Singles',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273c5716279f42fe67f8f44d103',
    duration: '3:28',
    audioUrl: 'https://example.com/songs/softly.mp3',
    releaseDate: '2023-05-05'
  },

  // Diljit Dosanjh Songs
  {
    id: '5',
    title: 'Lover',
    artist: artists[2],
    albumName: 'MoonChild Era',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273a83b785d8c4a0b2e2fe4c0e7',
    duration: '3:50',
    audioUrl: 'https://example.com/songs/lover.mp3',
    releaseDate: '2021-08-20'
  },
  {
    id: '6',
    title: 'GOAT',
    artist: artists[2],
    albumName: 'G.O.A.T.',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273284894d68fe2f80c2c4fd244',
    duration: '3:42',
    audioUrl: 'https://example.com/songs/goat.mp3',
    releaseDate: '2020-07-30'
  },

  // Shubh Songs
  {
    id: '7',
    title: 'Still Rollin',
    artist: artists[3],
    albumName: 'Still Rollin',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273a0e7f39dad2f72d68c5e2a4b',
    duration: '3:38',
    audioUrl: 'https://example.com/songs/still-rollin.mp3',
    releaseDate: '2023-03-15'
  },
  {
    id: '8',
    title: 'Baller',
    artist: artists[3],
    albumName: 'Singles',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273d9a129c4a656a55afff2ca02',
    duration: '3:25',
    audioUrl: 'https://example.com/songs/baller.mp3',
    releaseDate: '2022-09-10'
  },

  // Sultan Songs
  {
    id: '9',
    title: 'Karni Sohn Di',
    artist: artists[4],
    albumName: 'Singles',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273d9a129c4a656a55afff2ca02',
    duration: '3:30',
    audioUrl: 'https://example.com/songs/karni-sohn-di.mp3',
    releaseDate: '2023-06-01'
  },
  {
    id: '10',
    title: 'Maan Na Kari',
    artist: artists[4],
    albumName: 'Singles',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273d9a129c4a656a55afff2ca02',
    duration: '3:35',
    audioUrl: 'https://example.com/songs/maan-na-kari.mp3',
    releaseDate: '2023-04-20'
  }
];