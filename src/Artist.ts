import { Groups } from './Groups';
import { Genres } from './Genres';
import { Albums } from './Albums';
import { Songs } from './Songs';

/**
 * @class Represents an artist.
 */
export class Artist {
  /**
   * Initialize an Artist object.
   * @param name Artist name
   * @param groups Groups to which the artist belongs
   * @param genres Related musical genres
   * @param albums Albums in which the artist has participated
   * @param songs Published songs
   * @param listeners Number of monthly listeners
   */
  constructor(
    private name: string,
    private groups: Groups[],
    private genres: Genres[],
    private albums: Albums[],
    private songs: Songs[],
    private listeners: number
  ) {
    this.name = name;
    this.groups = groups;
    this.genres = genres;
    this.albums = albums;
    this.songs = songs;
    this.listeners = listeners;
  }

  /**
   * Get the artist name.
   * @returns artist name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Set the artist name.
   * @param name Name
   * @returns artist name
   */
   SetName(name: string): void {
    this.name = name;
  }

  /**
   * Get the groups to which the artist belongs.
   * @returns Groups
   */
  getGroups(): Groups[] {
    return this.groups;
  }

  /**
   * Set the groups to which the artist belongs.
   * @param group Group
   * @returns Groups
   */
   SetGroups(group: Groups): void {
    this.groups.push(group);
  }

  /**
   * Get the related musical genres's.
   * @returns Genres
   */
  getGenres(): Genres[] {
    return this.genres;
  }

  /**
   * Set the related musical genres's.
   * @param genre Genre
   * @returns Genres
   */
   SetGenres(genre: Genres): void {
    this.genres.push(genre);
  }

  /**
   * Get the albums in which the artist has participated.
   * @returns Album
   */
  getAlbums(): Albums[] {
    return this.albums;
  }

  /**
   * Set the albums in which the artist has participated.
   * @param album Album
   * @returns Album
   */
  SetAlbums(album: Albums) {
    this.albums.push(album);
  }

  /**
   * Get the published songs
   * @returns Songs
   */
  getSongs(): Songs[] {
    return this.songs;
  }

  /**
   * Set the published songs
   * @param song Song
   * @returns Songs
   */
   SetSongs(song: Songs) {
    this.songs.push(song);
  }

  /**
   * Get the number of monthly listeners
   * @returns Listeners
   */
  getListener(): number {
    return this.listeners;
  }
}