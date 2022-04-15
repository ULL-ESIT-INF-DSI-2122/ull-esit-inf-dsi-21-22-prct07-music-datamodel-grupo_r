import { Group } from '../models/Group';
import { Album } from '../models/Album';
import { Song } from '../models/Song';
import { Artist } from '../models/Artist';
import { Genre } from '../models/Genre';
import { Playlist } from '../models/Playlist';

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
