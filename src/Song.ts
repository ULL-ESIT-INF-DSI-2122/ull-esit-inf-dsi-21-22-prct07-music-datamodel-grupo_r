import { Genre } from './Genre';
import { Artist } from './Artist';

/**
 * @class Represents an artist.
 */
export class Song {
  constructor(
    public name: string,
    public artists: Artist[],
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
  /**
 * Print the song information
 * @return {string}
 */
  public print(): string {
    let output: string = 'Song - ' + this.name;

    output += '\nArtists: ';
    this.artists.forEach((a) => {
      output += '\n -' + a.getName();
    });

    output += '\nLength: ' + this.length + ' seconds';

    output += '\nGenres: ';
    this.genres.forEach((g) => {
      output += '\n -' + g.getName();
    });

    output += '\nPlays: ' + this.plays;

    if (this.isSingle) {
      output += '\nPublished as single?: Yes';
    } else {
      output += '\nPublished as single?: No';
    }
    output += '\n------------\n';

    console.log(output);
    return output;
  }
}
