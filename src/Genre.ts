import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';

/**
 * @class Represents a genre.
 */
export class Genre {
  /**
   * Initialize an Genres object.
   * @param name Genre name
   * @param groups Groups and/or artists produce music of this genre
   * @param albums Albums in the library related to this genre
   * @param songs Songs in the library of that genre
   */
  constructor(
    public name: string,
    public authors: (Group | Artist)[],
    public albums: Album[],
    public songs: Song[],
  ) {
    this.name = name;
    this.authors = authors;
    this.albums = albums;
    this.songs = songs;
  }

  /**
   * Get the genre name.
   * @returns genre name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the genre name.
   * @param name Name
   * @returns genre name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the authors and/or artists produce music of this genre.
   * @returns authors
   */
  public getAuthors(): (Group | Artist)[] {
    return this.authors;
  }

  /**
   * Set the authors and/or artists produce music of this genre.
   * @param group Group or Artist
   * @returns authors
   */
  public setAuthors(group: Group | Artist): void {
    this.authors.push(group);
  }

  /**
   * Get the albums in the library related to this genre.
   * @returns Albums
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Set the albums in the library related to this genre.
   * @param album Album
   * @returns Album
   */
  public setAlbums(album: Album) {
    this.albums.push(album);
  }

  /**
   * Get the songs in the library of that genre.
   * @returns Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set the songs in the library of that genre.
   * @param song Song
   * @returns Songs
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }
  /**
   * Print the genre information
   * @return {string}
   */
  public print(): string {
    let output: string = 'Genre - ' + this.name;
    output += '\n Author: ';
    this.authors.forEach((g) => {
      output += '\n -' + g.getName();
    });

    output += '\nAlbums: ';
    this.albums.forEach((a) => {
      output += '\n -' + a.getName();
    });

    output += '\nSongs: ';
    this.songs.forEach((s) => {
      output += '\n -' + s.getName();
    });

    output += '\n------------\n';
    console.log(output);
    return output;
  }
}
