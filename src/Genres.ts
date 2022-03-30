import { Groups } from './Groups';
import { Albums } from './Albums';
import { Songs } from './Songs';

/**
 * @class Represents a genre.
 */
export class Genres {
  /**
   * Initialize an Genres object.
   * @param name Genre name
   * @param groups Groups and/or artists produce music of this genre
   * @param albums Albums in the library related to this genre
   * @param songs Songs in the library of that genre
   */
  constructor(
    private name: string,
    private groups: Groups[],
    private albums: Albums[],
    private songs: Songs[]
  ) {
    this.name = name;
    this.groups = groups;
    this.albums = albums;
    this.songs = songs;
  }

  /**
   * Get the genre name.
   * @returns genre name
   */
   getName(): string {
    return this.name;
  }

  /**
   * Set the genre name.
   * @param name Name
   * @returns genre name
   */
   SetName(name: string): void {
    this.name = name;
  }

  /**
   * Get the groups and/or artists produce music of this genre.
   * @returns Groups
   */
   getGroups(): Groups[] {
    return this.groups;
  }

  /**
   * Set the groups and/or artists produce music of this genre.
   * @param group Group
   * @returns Groups
   */
   SetGroups(group: Groups): void {
    this.groups.push(group);
  }

  /**
   * Get the albums in the library related to this genre.
   * @returns Albums
   */
   getAlbums(): Albums[] {
    return this.albums;
  }

  /**
   * Set the albums in the library related to this genre.
   * @param album Album
   * @returns Album
   */
  SetAlbums(album: Albums) {
    this.albums.push(album);
  }

  /**
   * Get the songs in the library of that genre.
   * @returns Songs
   */
   getSongs(): Songs[] {
    return this.songs;
  }

  /**
   * Set the songs in the library of that genre.
   * @param song Song
   * @returns Songs
   */
   SetSongs(song: Songs) {
    this.songs.push(song);
  }
}