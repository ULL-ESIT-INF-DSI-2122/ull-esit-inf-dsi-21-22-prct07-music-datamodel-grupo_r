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
   * @param {string} name Genre name
   * @param {(Group | Artist)[]} authors Groups and/or artists produce music of this genre
   * @param {Album[]} albums Albums in the library related to this genre
   * @param {Song[]} songs Songs in the library of that genre
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
   * @returns {string} Genre name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the genre name.
   * @param {string} name Name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the authors and/or artists produce music of this genre.
   * @returns {(Group | Artist)[]} Authors
   */
  public getAuthors(): (Group | Artist)[] {
    return this.authors;
  }

  /**
   * Set the authors and/or artists produce music of this genre.
   * @param {Group | Artist} group Group or Artist
   */
  public setAuthors(group: Group | Artist): void {
    this.authors.push(group);
  }

  /**
   * Get the albums in the library related to this genre.
   * @returns {Album[]} Albums
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Replace the albums in the library related to this genre.
   * @param {Album[]} album Albums
   */
  public replaceAlbums(album: Album[]): void {
    this.albums = album;
  }

  /**
   * Set the albums in the library related to this genre.
   * @param {Album} album Album
   */
  public setAlbums(album: Album) {
    this.albums.push(album);
  }

  /**
   * Get the songs in the library of that genre.
   * @returns {Song[]} Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Replace the songs in the library of that genre.
   * @param {Song[]} song Songs
   */
  public replaceSongs(song: Song[]): void {
    this.songs = song;
  }

  /**
   * Set the songs in the library of that genre.
   * @param {Song} song Song
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }

  /**
   * Print the genre information.
   * @return {string} Genre information
   */
  public print(): string {
    let output: string = `Genre - ${this.name}`;
    output += `\n Author: `;
    this.authors.forEach((g) => {
      output += `\n - ${g.getName()}`;
    });

    output += `\nAlbums: `;
    this.albums.forEach((a) => {
      output += `\n - ${a.getName()}`;
    });

    output += `\nSongs: `;
    this.songs.forEach((s) => {
      output += `\n - ${s.getName()}`;
    });

    output += `\n------------\n`;
    console.log(output);
    return output;
  }
}
