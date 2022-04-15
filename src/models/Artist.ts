import { Group } from '../models/Group';
import { Genre } from '../models/Genre';
import { Album } from '../models/Album';
import { Song } from '../models/Song';
/**
 * @class Represents an artist.
 */
export class Artist {
  /**
   * Initialize an Artist object.
   * @param {string} name Artist name
   * @param {Group[]} groups Groups to which the artist belongs
   * @param {Genre[]} genres Related musical genres
   * @param {Album[]} albums Albums in which the artist has participated
   * @param {Song[]} songs Published songs
   * @param {number} listeners Number of monthly listeners
   */
  constructor(
    public name: string,
    public groups: Group[],
    public genres: Genre[],
    public albums: Album[],
    public songs: Song[],
    public listeners: number,
  ) {
    this.name = name;
    this.groups = groups;
    this.genres = genres;
    this.albums = albums;
    this.songs = songs;
    this.listeners = this.calculateListeners();
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
   * Get the groups to which the artist belongs.
   * @returns {Group[]} Groups
   */
  public getGroups(): Group[] {
    return this.groups;
  }

  /**
   * Set the groups to which the artist belongs.
   * @param {Group} group Group
   */
  public setGroups(group: Group): void {
    this.groups.push(group);
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
   */
  public setGenres(genre: Genre): void {
    this.genres.push(genre);
  }

  /**
   * Get the albums in which the artist has participated.
   * @returns {Album[]} Album
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Replace the albums in which the artist has participated.
   * @param {Album} album Album
   */
  public replaceAlbums(album: Album[]): void {
    this.albums = album;
  }

  /**
   * Set the albums in which the artist has participated.
   * @param {Album} album Album
   */
  public setAlbums(album: Album) {
    this.albums.push(album);
  }

  /**
   * Get the published songs.
   * @returns {Song[]} Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set the published songs.
   * @param {Song} song Song
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }

  /**
   * Replace the published songs.
   * @param {Song[]} songs Song
   */
  public replaceSongs(songs: Song[]): void {
    this.songs = songs;
  }

  /**
   * Calculates the number of monthly listeners.
   * @returns {number} Listeners
   */
  private calculateListeners(): number {
    for (let i = 0; i < this.groups.length; i++) {
      this.listeners += this.groups[i].getListeners();
    }
    for (let j = 0; j < this.songs.length; j++) {
      this.listeners += this.songs[j].getPlays();
    }
    return Number((this.listeners / 12).toFixed());
  }

  /**
   * Get the number of monthly listeners.
   * @returns {number} Listeners
   */
  public getListeners(): number {
    return this.listeners;
  }

  /**
   * Print the artist information.
   * @return {string} Artist information
   */
  public print(): string {
    let output: string = `\x1b[34mArtist - \x1b[0m${this.name}`;

    output += `\n\x1b[34mGroups: \x1b[0m`;
    this.groups.forEach((g) => {
      output += `\n\x1b[34m - \x1b[0m${g.getName()}`;
    });

    output += `\n\x1b[34mGenres: \x1b[0m`;
    this.genres.forEach((g) => {
      output += `\n\x1b[34m - \x1b[0m${g.getName()}`;
    });

    output += `\n\x1b[34mAlbums: \x1b[0m`;
    this.albums.forEach((a) => {
      output += `\n\x1b[34m - \x1b[0m${a.getName()}`;
    });

    output += `\n\x1b[34mSongs: \x1b[0m`;
    this.songs.forEach((s) => {
      output += `\n\x1b[34m - \x1b[0m${s.getName()}`;
    });

    output += `\n\x1b[34mListeners: \x1b[0m${this.listeners}`;
    output += `\n------------\n\n`;
    // console.log(output);
    return output;
  }
}
