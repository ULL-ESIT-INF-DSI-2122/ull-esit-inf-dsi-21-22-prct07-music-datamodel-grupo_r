import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Playlist } from './Playlist';

export interface anyDatabase {
  addToMemory(item: (Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[])): void;
  deleteFromMemory(item: string, type:string): void;
}
