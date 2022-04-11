import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Playlist } from './Playlist';

/**
 * @interface anyDatabase Defines a generic music library system.
 */
export interface anyDatabase {
  /**
   * Adds to the music library system memory.
   * @param {Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]} item Item to add.
   */
  addToMemory(item: Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]): void;

  /**
   * Erases the memory of the music library system.
   * @param {Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]} item Item to erase.
   * @param {string} type of what it is wanted to erase.
   */
  deleteFromMemory(item: string, type: string): void;
}
