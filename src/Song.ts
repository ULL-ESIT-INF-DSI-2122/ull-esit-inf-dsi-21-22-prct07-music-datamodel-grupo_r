import { Genre } from './Genre';
import { Artist } from './Artist';
import { Group } from './Group';

/**
 * @class Represents an artist.
 */
export class Song {
  /**
   * Initialize a Song object
   * @param {string} name Song title
   * @param {Artist | Group} artists Artist or group that publish the song
   * @param {number} length Length of the song
   * @param {Genre[]} genres Related musical genres
   * @param {number} plays Songs number of plays
   * @param {boolean} isSingle Song listed as a single
   */
  constructor(
    public name: string,
    public artists: Artist | Group,
    public length: number,
    public genres: Genre[],
    public plays: number,
    public isSingle: boolean,
  ) {
    this.name = name;
    this.artists = artists;
    this.length = length;
    this.genres = genres;
    this.isSingle = isSingle;
    this.plays = plays;
  }

  /**
   * Get the artist name.
   * @returns {string} Artist name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the artist name.
   * @param {string} name Name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get artist or group that publish the song.
   * @returns {Artist | Group} Artist or group that publish the song.
   */
  public getArtists(): Artist | Group {
    return this.artists;
  }

  /**
   * Set artist or group that publish the song.
   * @param {Artist | Group} artist Artist or group.
   */
  public setArtists(artist: Artist | Group): void {
    this.artists = artist;
  }

  /**
   * Get song's length.
   * @returns {number} Length
   */
  public getLength(): number {
    return this.length;
  }

  /**
   * Set song's length.
   * @param {number} length Length of the song.
   */
  public setLength(length: number): void {
    this.length = length;
  }

  /**
   * Get the related musical genres's.
   * @returns {Genre[]} Genres
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Set the related musical genres's.
   * @param {Genre} genre Genre
   * @returns Genres
   */
  public setGenres(genre: Genre): void {
    this.genres.push(genre);
  }

  /**
   * Replace the related musical genres's.
   * @param {Genre[]} genres Genres
   */
  public replaceGenres(genres: Genre[]): void {
    this.genres = genres;
  }

  /**
   * Get number of plays.
   * @returns {number} Plays
   */
  public getPlays(): number {
    return this.plays;
  }

  /**
   * Set the number of plays.
   * @param {number} plays Plays.
   */
  setPlays(plays: number): void {
    this.plays = plays;
  }

  /**
   * Set the song as single or not.
   * @param {boolean} isSingle True if the song is a single or False if it is not
   */
  setSingle(isSingle: boolean): void {
    this.isSingle = isSingle;
  }

  /**
   * Get the song as single or not.
   * @returns {boolean} True if the song is a single or False if it is not
   */
  getSingle(): boolean {
    return this.isSingle;
  }

  /**
   * Print the song information.
   * @return {string} Song information
   */
  public print(): string {
    let output: string = `Song - ${this.name}`;

    output += `\nAuthor: ${this.artists.getName()}`;

    output += `\nLength: ${this.length} seconds`;

    output += `\nGenres: `;
    this.genres.forEach((g) => {
      output += `\n - ${g.getName()}`;
    });

    output += `\nPlays: ${this.plays}`;

    if (this.isSingle) {
      output += `\nPublished as single?: Yes`;
    } else {
      output += `\nPublished as single?: No`;
    }
    output += `\n------------\n`;

    console.log(output);
    return output;
  }
}
