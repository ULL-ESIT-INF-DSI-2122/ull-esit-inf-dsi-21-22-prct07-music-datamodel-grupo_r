import { Genre } from './Genre';
import { Artist } from './Artist';

/**
 * @class Represents an artist.
 */
export class Song {
  constructor(
    private name: string,
    private artists: Artist[],
    private length: number,
    private genres: Genre[],
    private plays: number,
    private isSingle: boolean,
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
   * @returns artist name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the artist name.
   * @param name Name
   * @returns artist name
   */
  public setName(name: string): void {
    this.name = name;
  }


  public getArtists(): Artist[] {
    return this.artists;
  }

  public setArtists(artist: Artist): void {
    this.artists.push(artist);
  }

  public getLength(): number {
    return this.length;
  }

  public setLength(length:number): void {
    this.length = length;
  }

  /**
   * Get the related musical genres's.
   * @returns Genres
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Set the related musical genres's.
   * @param genre Genre
   * @returns Genres
   */
  public setGenres(genre: Genre): void {
    this.genres.push(genre);
  }
  getPlays(): number {
    return this.plays;
  }
  setPlays(plays:number): void {
    this.plays = plays;
  }
  setSingle(isSingle: boolean): void {
    this.isSingle = isSingle;
  }
  getSingle():boolean {
    return this.isSingle;
  }
}
