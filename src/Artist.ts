import { Group } from './Group';
import { Genre } from './Genre';
import { Album } from './Album';
import { Song } from './Song';

/**
 * @class Represents an artist.
 */
export class Artist {
  /**
   * Initialize an Artist object.
   * @param name Artist name
   * @param groups Groups to which the artist belongs
   * @param genres Related musical genres
   * @param albums Albums in which the artist has participated
   * @param songs Published songs
   * @param listeners Number of monthly listeners
   */
  constructor(
    private name: string,
    private groups: Group[],
    private genres: Genre[],
    private albums: Album[],
    private songs: Song[],
    private listeners: number,
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

  /**
   * Get the groups to which the artist belongs.
   * @returns Groups
   */
  public getGroups(): Group[] {
    return this.groups;
  }

  /**
   * Set the groups to which the artist belongs.
   * @param group Group
   * @returns Groups
   */
  public setGroups(group: Group): void {
    this.groups.push(group);
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

  /**
   * Get the albums in which the artist has participated.
   * @returns Album
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Set the albums in which the artist has participated.
   * @param album Album
   * @returns Album
   */
  public setAlbums(album: Album) {
    this.albums.push(album);
  }

  /**
   * Get the published songs
   * @returns Songs
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Set the published songs
   * @param song Song
   * @returns Songs
   */
  public setSongs(song: Song) {
    this.songs.push(song);
  }

  /**
   * Calculates the number of monthly listeners
   * @returns Listeners
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
   * Get the number of monthly listeners
   * @returns Listeners
   */
  public getListeners(): number {
    return this.listeners;
  }
}
