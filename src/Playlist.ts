import { Genre } from './Genre';
import { Song } from './Song';

/**
 * @class Music playlist.
 */
export class Playlist {
  /**
   * Intialize a Playlist object.
   * @param {string} name Name of the playlist
   * @param {Song[]} songs Songs included in the playlist
   * @param {number} duration Duration in hours and minutes and seconds
   * @param {Genre[]} genres Musical genres included in the playlist
   */
  constructor(
    public name: string,
    public songs: Song[],
    public duration: number,
    public genres: Genre[],
  ) {
    this.name = name;
    this.songs = songs;
    this.duration = duration;
    this.genres = genres;
  }

  /**
   * Get the playlist name.
   * @returns {string} Playlist name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the playlist name.
   * @param {string} name Name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the songs included in the playlist.
   * @returns {Song[]} Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set a song to the playlist
   * @param {Song} song Song
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }

  /**
   * Get the duration of the playlist.
   * @returns {number} Duration of the playlist
   */
  public getDuration(): number {
    return this.duration;
  }

  /**
   * Converts seconds to hours, minutes and seconds.
   * @param {number} seconds Duration of the playlist in seconds
   * @returns {string} Converted to the usual notation for expressing hours.
   */
  private setDuration(seconds: number): string {
    let hour: number | string = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;

    let minute: number | string = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;

    let second: number | string = seconds % 60;
    second = (second < 10)? '0' + second : second;

    return hour + ' \x1b[31mhours\x1b[0m ' + minute + ' \x1b[31mminutes\x1b[0m ' + second + ' \x1b[31mseconds\x1b[0m';
  }

  /**
   * Get the musical genres included in the playlist.
   * @returns {Genre[]} Genres
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Set a musical genres to the playlist.
   * @param {Genre} genre Genre
   */
  public setGenres(genre: Genre): void {
    this.genres.push(genre);
  }

  /**
   * Print the playlist information.
   * @return {string} Playlist information
   */
  public print(): string {
    let output: string = `\x1b[31mPlaylist - \x1b[0m${this.name}`;

    output += `\n\x1b[31mSongs: \x1b[0m`;
    this.songs.forEach((s) => {
      output += `\n\x1b[31m - \x1b[0m${s.getName()}`;
    });

    output += `\n\x1b[31mDuration: \x1b[0m${this.setDuration(this.duration)}`;

    output += `\n\x1b[31mGenres: \x1b[0m`;
    this.genres.forEach((g) => {
      output += `\n\x1b[31m - \x1b[0m${g.getName()}`;
    });

    output += `\n------------\n\n`;

    // console.log(output);
    return output;
  }
}
