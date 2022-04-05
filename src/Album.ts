import { Group } from './Group';
import { Genre } from './Genre';
import { Artist } from './Artist';
import { Song } from './Song';

/**
 * @class Represents an album.
 */
export class Album {
  /**
   * Initialize an Album object.
   * @param {string} title Album title
   * @param {Artist | Group} author Artist or group that publish the album
   * @param {string} date Release date
   * @param {Genre[]} genres Related musical genres
   * @param {Song[]} songs Songs list
   */
  constructor(
    private title: string,
    private author: Artist | Group,
    private date: string,
    private genres: Genre[],
    private songs: Song[],
  ) {
    this.title = title;
    this.author = author;
    this.date = date;
    this.genres = genres;
    this.songs = songs;
  }

  /**
   * Get the album title.
   * @return {string} album title
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Set the album title.
   * @param {string} title Album title
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Get the album author
   * @return {Artist | Group} Author
   */
  public getAuthor(): Artist | Group {
    return this.author;
  }

  /**
   * Set the album author
   * @param {Artist | Group} author Author
   */
  public setAuthor(author: Artist | Group): void {
    this.author = author;
  }

  /**
   * Get the release date
   * @return {string} date
   */
  public getDate(): string {
    return this.date;
  }

  /**
   * Set the release date
   * @param {string} date Release date
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
   * Get the songs list
   * @return {Song[]} Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set the songs list
   * @param {Song[]} songs Songs list
   */
  public setSongs(songs: Song[]) {
    this.songs = songs;
  }
}
