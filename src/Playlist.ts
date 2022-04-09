import { Genre } from './Genre';
import { Song } from './Song';

/**
 * @class Music playlist.
 */
export class Playlist {
  /**
   * Intialize a Playlist object.
   * @param name Name of the playlist
   * @param songs Songs included in the playlist
   * @param duration Duration in hours and minutes and seconds
   * @param genres Musical genres included in the playlist
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
  }

  /**
   * Get the playlist name.
   * @returns playlist name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Set the playlist name.
   * @param name Name
   * @returns playlist name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Get the songs included in the playlist
   * @returns Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set a song to the playlist
   * @param song Song
   * @returns Songs
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }

  /**
   * Get the duration of the playlist.
   * @returns the duration of the playlist
   */
  public getDuration(): number {
    return this.duration;
  }

  /**
   * Converts seconds to hours, minutes and seconds.
   * @param seconds Duration of the playlist in seconds
   * @returns {string} Converted to the usual notation for expressing hours.
   */
  private setDuration(seconds: number): string {
    let hour: number | string = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;

    let minute: number | string = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;

    let second: number | string = seconds % 60;
    second = (second < 10)? '0' + second : second;

    return hour + ':' + minute + ':' + second;
  }

  /**
   * Get the musical genres included in the playlist.
   * @returns Genres
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Set a musical genres to the playlist.
   * @param genre Genre
   * @returns Genres
   */
  public setGenres(genre: Genre): void {
    this.genres.push(genre);
  }
}
