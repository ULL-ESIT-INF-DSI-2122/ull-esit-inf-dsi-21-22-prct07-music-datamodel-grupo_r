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
   * @param {string} name Album title
   * @param {Artist | Group} author Artist or group that publish the album
   * @param {string} date Release date
   * @param {Genre[]} genres Related musical genres
   * @param {Song[]} songs Songs list
   */
  constructor(
    public name: string,
    public author: Artist | Group,
    public date: string,
    public genres: Genre[],
    public songs: Song[],
  ) {
    this.name = name;
    this.author = author;
    this.date = date;
    this.genres = genres;
    this.songs = songs;
  }

  /**
   * Get the album title.
   * @return {string} album title
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the album title.
   * @param {string} name Album title
   */
  public setName(name: string): void {
    this.name = name;
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
  /**
 * Print the album information
 * @return {string}
 */
  public print(): string {
    let output: string = 'Album - ' + this.name + '\nAuthor: ' + this.author.name + '\nDate: ' + this.date;

    output += '\nGenres: ';
    this.genres.forEach((g) => {
      output += '\n -' + g.getName();
    });

    output += '\nSongs: ';
    this.songs.forEach((s) => {
      output += '\n -' + s.getName();
    });

    output += '\n------------\n\n';
    console.log(output);
    return output;
  }
}
