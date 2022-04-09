import { Album } from './Album';
import { Genre } from './Genre';
import { Artist } from './Artist';
import { Song } from './Song';

/**
 * @class Represents a group.
 */
export class Group {
  /**
   * Initialize a Group object.
   * @param {string} name Album name
   * @param {Artist[]} members Artists (group members)
   * @param {string} date Creation date
   * @param {Genre[]} genres Related musical genres
   * @param {Album[]} albums Released albums
   * @param {number} listeners Number of listeners
   */
  constructor(
    public name: string,
    public members: Artist[],
    public date: string,
    public genres: Genre[],
    public albums: Album[],
    public listeners: number,
  ) {
    this.name = name;
    this.members = members;
    this.date = date;
    this.genres = genres;
    this.albums = albums;
    this.listeners = listeners;
  }

  /**
   * Get the group name.
   * @return {string} group name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the group name.
   * @param {string} name Group name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the group members
   * @return {Artist[]} Members
   */
  public getMembers(): Artist[] {
    return this.members;
  }

  /**
   * Set the group author
   * @param {Artist[]} members Group members
   */
  public setMembers(members: Artist[]): void {
    this.members = members;
  }

  /**
   * Get the creation date
   * @return {string} date
   */
  public getDate(): string {
    return this.date;
  }

  /**
   * Set the creation date
   * @param {string} date Creation date
   */
  public setDate(date: string): void {
    this.date = date;
  }

  /**
   * Get the related musical genres's.
   * @return {Genre[]} Genres
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Set the related musical genres.
   * @param {Genres[]} genres Relate genres
   */
  public setGenres(genres: Genre[]): void {
    this.genres = genres;
  }

  /**
 * Add related musical genre(s).
 * @param {Genres[]} genres Relate genre(s)
 */
  public addGenres(genres: Genre[]): void {
    for (let i: number = 0; i < genres.length; i++) {
      this.genres.push(genres[i]);
    }
  }

  /**
   * Get the albums list
   * @return {Album[]} Albums
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Set the albums list
   * @param {Album[]} albums Albums list
   */
  public setAlbums(albums: Album[]) {
    this.albums = albums;
  }

  /** Get listeners.
   *
   * @return {number} Listeners
   */
  public getListeners(): number {
    return this.listeners;
  }

  /**
   * Increment listeners counter
   */
  public incrementListeners(): void {
    this.listeners++;
  }
}
