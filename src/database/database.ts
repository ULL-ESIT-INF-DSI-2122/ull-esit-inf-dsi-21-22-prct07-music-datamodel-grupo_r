import { Group } from '../models/Group';
import { Artist } from '../models/Artist';
import { Genre } from '../models/Genre';
import { Song } from '../models/Song';
import { Album } from '../models/Album';
import { Playlist } from '../models/Playlist';
import { viewCommands } from '../management/Commands';
import { viewPlaylistCommands } from '../management/Commands';
import { orderByCommands } from '../management/Commands';
import { anyDatabase } from './anyDatabase';

/**
 * @class Creates a database.
 * @implements {anyDatabase}
 */
export class Database implements anyDatabase {
  /**
   * @param {Playlist[]} dbPlaylists database
   */
  protected dbPlaylists: Playlist[] = [];

  /**
   * Initialize a database object.
   * @param {Song[]} songs Songs of the database
   * @param {Artist[]} artists Artist of the database
   * @param {Album[]} albums Album of the database
   * @param {Genre[]} genres Genres of the database
   * @param {Group[]} groups Groups of the database
   * @param {Playlist[]} playlists Playlists of the database
   */
  constructor(
    protected songs: Song[] = [],
    protected artists: Artist[] = [],
    protected albums: Album[] = [],
    protected genres: Genre[] = [],
    protected groups: Group[] = [],
    protected playlists: Playlist[] = [],
  ) {}

  /**
   * Adds to the music library system memory.
   * @param {Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]} item Item to add.
   * @returns {Promise<void>}
   */
  addToMemory(item: (Song[] | Album[] | Genre[] | Group[] | Artist[] | Playlist[])): Promise<void> {
    return new Promise((resolve) => {
      item.forEach((item) => {
        if (item instanceof Song) {
          this.songs.push(item);
        }
        if (item instanceof Album) {
          this.albums.push(item);
        }
        if (item instanceof Genre) {
          this.genres.push(item);
        }
        if (item instanceof Group) {
          this.groups.push(item);
        }
        if (item instanceof Artist) {
          this.artists.push(item);
        }
        if (item instanceof Playlist) {
          this.playlists.push(item);
        }
      });
      resolve();
    });
  }

  /**
   * Get something from memory.
   * @param {Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]} item Item to add.
   * @param {string} type of what it is wanted to erase.
   */
  public async getFromMemory(item:string, type:string): Promise<(Song | Group | Artist | Album | Genre | Playlist)[]> {
    return new Promise((resolve) => {
      const dummy: (Song | Group | Artist | Album | Genre | Playlist)[] = [];
      if (type == 'Song') {
        if (item !== '$ALL$') {
          this.songs.forEach((value) => {
            if ('getName' in value && value.getName() === item) {
              dummy.push(value);
            }
          });
        } else {
          resolve(this.songs);
        }
      }
      if (type == 'Album') {
        if (item !== '$ALL$') {
          this.albums.forEach((value) => {
            if ('getTitle' in value && value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.albums);
      }
      if (type == 'Genre') {
        if (item !== '$ALL$') {
          this.genres.forEach((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.genres);
      }
      if (type == 'Group') {
        if (item !== '$ALL$') {
          this.groups.forEach((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.groups);
      }
      if (type == 'Artist') {
        if (item !== '$ALL$') {
          this.artists.forEach((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.artists);
      }
      if (type == 'Playlist') {
        switch (item) {
          case '$ALL$':
            resolve(this.playlists);
            break;
          case '$ONLYNEW$':
            this.playlists.forEach((value) => {
              if (!this.dbPlaylists.includes(value)) {
                dummy.push(value);
              }
            });
            break;
          default:
            this.playlists.forEach((value) => {
              if (value.getName() === item) {
                dummy.push(value);
              }
            });
            break;
        }
      }
      resolve(dummy);
    });
  }

  /**
   * Purges all from the database.
   * @returns {Promise<void>}
   */
  public purgeMemory(): Promise<void> {
    return new Promise((resolve) => {
      this.songs = [];
      this.artists = [];
      this.albums = [];
      this.groups = [];
      this.genres = [];
      this.playlists = [];
      resolve();
    });
  }

  /**
   * Search something in the database memory.
   * @param {string} name Item to add.
   * @param {string} type of what it is wanted to erase.
   */
  public searchByName(name:any, type: string):
    (Song[] | Group[] | Artist[] | Album[] | Genre[] | Playlist[] | Artist | Group | undefined) {
    const empty : (Song[] | Group[] | Artist[] | Album[] | Genre[] | Playlist[]) = [];
    const dummy: string[] | string = name as (string[]| string);
    switch (type) {
      case 'genre':
        let resultGenre: Genre[] = [];
        this.genres.forEach((genre) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (genre.getName() == name) {
                resultGenre.push(genre);
              }
            });
          } else {
            if (genre.getName() == name) {
              resultGenre.push(genre);
            }
          }
        });
        return resultGenre;
      case 'artist':
        let resultArtist: Artist[] = [];
        this.artists.forEach((artist) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (artist.getName() == name) {
                resultArtist.push(artist);
              }
            });
          } else {
            if (artist.getName() == name) {
              resultArtist.push(artist);
            }
          }
        });
        return resultArtist;
      case 'song':
        let resultSong: Song[] = [];
        this.songs.forEach((song) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (song.getName() == name) {
                resultSong.push(song);
              }
            });
          } else {
            if (song.getName() == name) {
              resultSong.push(song);
            }
          }
        });
        return resultSong;
      case 'album':
        let resultAlbum: Album[] = [];
        this.albums.forEach((album) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (album.getName() == name) {
                resultAlbum.push(album);
              }
            });
          } else {
            if (album.getName() == name) {
              resultAlbum.push(album);
            }
          }
        });
        return resultAlbum;
      case 'group':
        let resultGroup: Group[] = [];
        this.groups.forEach((group) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (group.getName() == name) {
                resultGroup.push(group);
              }
            });
          } else {
            if (group.getName() == name) {
              resultGroup.push(group);
            }
          }
        });
        return resultGroup;
      case 'playlist':
        let resultPlaylist: Playlist[] = [];
        this.playlists.forEach((playlist) => {
          if (dummy instanceof Array) {
            dummy.forEach((name) => {
              if (playlist.getName() == name) {
                resultPlaylist.push(playlist);
              }
            });
          } else {
            if (playlist.getName() == name) {
              resultPlaylist.push(playlist);
            }
          }
        });
        return resultPlaylist;
      case 'author':
        let resultAuthor: Artist | Group | undefined = undefined;
        this.artists.forEach((artist) => {
          if (artist.getName() == name) {
            resultAuthor = artist;
          }
        });
        this.groups.forEach((group) => {
          if (group.getName() == name) {
            resultAuthor = group;
          }
        });
        return resultAuthor;
    }
    return empty;
  }

  /**
   * Erases the memory of the music library system.
   * @param {string} item Item to erase.
   * @param {string} type of what it is wanted to erase.
   */
  public async deleteFromMemory(item: string, type:string): Promise<(Song | Group | Artist | Album | Genre | Playlist| undefined)> {
    return new Promise((resolve) => {
      let dummy:(Song | Group | Artist | Album | Genre | Playlist | undefined) = undefined;
      switch (type) {
        case 'Song':
          dummy = undefined;
          this.songs.forEach((song, index)=> {
            if (item === song.getName()) {
              this.songs.splice(index, 1);
              dummy = song;
            }
          });
          resolve(dummy);
          break;
        case 'Genre':
          dummy = undefined;
          this.genres.forEach((genre, index)=> {
            if (item === genre.getName()) {
              this.genres.splice(index, 1);
              dummy = genre;
            }
          });
          resolve(dummy);
          break;
        case 'Artist':
          dummy = undefined;
          this.artists.forEach((artist, index)=> {
            if (item === artist.getName()) {
              this.artists.splice(index, 1);
              dummy = artist;
            }
          });
          resolve(dummy);
          break;
        case 'Album':
          dummy = undefined;
          this.albums.forEach((album, index)=> {
            if (item === album.getName()) {
              this.albums.splice(index, 1);
              dummy = album;
            }
          });
          resolve(dummy);
          break;
        case 'Group':
          dummy = undefined;
          this.groups.forEach((group, index)=> {
            if (item === group.getName()) {
              this.groups.splice(index, 1);
              dummy = group;
            }
          });
          resolve(dummy);
          break;
      }
    });
  }

  /**
   * Prints all the memory database or specific parts.
   */
  public printMemory(type:string = ''): void {
    let output: string = '';
    switch (type) {
      case '':
      case 'All':
        this.albums.forEach((album) => {
          output += album.print();
        });
        this.artists.forEach((artist) => {
          output += artist.print();
        });
        this.songs.forEach((song) => {
          output += song.print();
        });
        this.groups.forEach((group) => {
          output += group.print();
        });
        this.genres.forEach((genre) => {
          output += genre.print();
        });
        this.playlists.forEach((playlist) => {
          output += playlist.print();
        });
        output += `\x1b[30mTotal:\x1b[0m
        \x1b[32mNº Albums: \x1b[0m${this.albums.length}
        \x1b[34mNº Artists: \x1b[0m${this.artists.length}
        \x1b[33mNº Songs: \x1b[0m${this.songs.length}
        \x1b[36mNº Groups: \x1b[0m${this.groups.length}
        \x1b[35mNº Genres: \x1b[0m${this.genres.length}
        \x1b[31mNº Playlists: \x1b[0m${this.playlists.length}`;
        break;
      case 'Song':
        this.songs.forEach((song) => {
          output += song.print();
        });
        output += `\x1b[33mNº Songs: \x1b[0m${this.songs.length}`;
        break;
      case 'Album':
        this.albums.forEach((album) => {
          output += album.print();
        });
        output += `\x1b[32mNº Albums: \x1b[0m${this.albums.length}`;
        break;
      case 'Genre':
        this.genres.forEach((genre) => {
          output += genre.print();
        });
        output += `\x1b[35mNº Genres: \x1b[0m${this.genres.length}`;
        break;
      case 'Artist':
        this.artists.forEach((artist) => {
          output += artist.print();
        });
        output += `\x1b[34mNº Artists: \x1b[0m${this.artists.length}`;
        break;
      case 'Group':
        this.groups.forEach((group) => {
          output += group.print();
        });
        output += `\x1b[36mNº Groups: \x1b[0m${this.groups.length}`;
        break;
      case 'Playlist':
        this.playlists.forEach((playlist) => {
          output += playlist.print();
        });
        output += `\x1b[31mNº Playlists: \x1b[0m${this.playlists.length}`;
        break;
    }
    console.log(output);
  }

  /**
   * Prints all the information display.
   * @param {viewCommands} command Question to browse the information associated with these entities
   * @param {orderByCommands} mode Questions to browse the information
   */
  public printBy(command: viewCommands, mode: orderByCommands): Promise<void> {
    return new Promise<void>((resolve) => {
      if (mode === orderByCommands.Ascendantly) {
        switch (command) {
          case viewCommands.AlphabeticalSong:
            this.songs.sort((a, b) => a.getName().localeCompare(b.getName()));
            this.songs.forEach((song) => {
              console.log(song.print());
            });
            break;
          case viewCommands.AlphabeticalAlbum:
            this.albums.sort((a, b) => a.getName().localeCompare(b.getName()));
            this.albums.forEach((album) => {
              console.log(album.print());
            });
            break;
          case viewCommands.OnlySingles:
            this.songs.forEach((song) => {
              if (song.getSingle() === true) {
                console.log(song.print());
              }
            });
            break;
          case viewCommands.ReleaseDate:
            this.albums.sort((a, b) => a.getDate().localeCompare(b.getDate()));
            this.albums.forEach((album) => {
              console.log(album.print());
            });
            break;
          case viewCommands.ViewCount:
            this.songs.sort((a, b) => b.getPlays() - a.getPlays());
            this.songs.forEach((song) => {
              console.log(song.print());
            });
            break;
        }
      } else {
        switch (command) {
          case viewCommands.AlphabeticalSong:
            this.songs.sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
            this.songs.forEach((song) => {
              console.log(song.print());
            });
            break;
          case viewCommands.AlphabeticalAlbum:
            this.albums.sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
            this.albums.forEach((album) => {
              console.log(album.print());
            });
            break;
          case viewCommands.OnlySingles:
            this.songs.forEach((song) => {
              if (song.getSingle() === true) {
                console.log(song.print());
              }
            });
            break;
          case viewCommands.ReleaseDate:
            this.albums.sort((a, b) => a.getDate().localeCompare(b.getDate())).reverse();
            this.albums.forEach((album) => {
              console.log(album.print());
            });
            break;
          case viewCommands.ViewCount:
            this.songs.sort((a, b) => b.getPlays() - a.getPlays()).reverse();
            this.songs.forEach((song) => {
              console.log(song.print());
            });
            break;
        }
      }
      resolve();
    });
  }

  /**
   * Prints all the playlists' information display.
   * @param {viewCommands} command Question to browse the information associated with playlists
   * @param {orderByCommands} mode Questions to browse the information
   */
  public printPlaylistBy(command: viewPlaylistCommands, mode: orderByCommands, playlist:string): void {
    let selectedPlaylist: Playlist = (this.searchByName(playlist, 'playlist') as Playlist[])[0];
    (this.searchByName(playlist, 'playlist') as Playlist[])[0].print();
    if (mode === orderByCommands.Ascendantly) {
      switch (command) {
        case viewPlaylistCommands.AlphabeticalSong:
          selectedPlaylist.getSongs().sort((a, b) => a.getName().localeCompare(b.getName()));
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.AlphabeticalArtist:
          let playlistSongs: Song[] = selectedPlaylist.getSongs();
          let songsMap: Map<Song, string> = new Map();
          playlistSongs.forEach((song) => {
            songsMap.set(song, song.getArtists().getName());
          });
          [...songsMap.entries()].sort((a, b) => a[1].localeCompare(b[1]));
          songsMap.forEach((string, song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.ViewDuration:
          selectedPlaylist.getSongs().sort((a, b) => b.getLength() - a.getLength());
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.AlphabeticalGenre:
          selectedPlaylist.getGenres().sort((a, b) => a.getName().localeCompare(b.getName()));
          selectedPlaylist.getGenres().forEach((genre) => {
            console.log(genre.print());
          });
          break;
        case viewPlaylistCommands.ViewCount:
          selectedPlaylist.getSongs().sort((a, b) => b.getPlays() - a.getPlays());
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
      }
    } else {
      switch (command) {
        case viewPlaylistCommands.AlphabeticalSong:
          selectedPlaylist.getSongs().sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.AlphabeticalArtist:
          let playlistSongs: Song[] = selectedPlaylist.getSongs();
          let songsMap: Map<Song, string> = new Map();
          playlistSongs.forEach((song) => {
            songsMap.set(song, song.getArtists().getName());
          });
          [...songsMap.entries()].sort((a, b) => a[1].localeCompare(b[1])).reverse();
          songsMap.forEach((string, song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.ViewDuration:
          selectedPlaylist.getSongs().sort((a, b) => b.getLength() - a.getLength()).reverse();
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
        case viewPlaylistCommands.AlphabeticalGenre:
          selectedPlaylist.getGenres().sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
          selectedPlaylist.getGenres().forEach((genre) => {
            console.log(genre.print());
          });
          break;
        case viewPlaylistCommands.ViewCount:
          selectedPlaylist.getSongs().sort((a, b) => b.getPlays() - a.getPlays()).reverse();
          selectedPlaylist.getSongs().forEach((song) => {
            console.log(song.print());
          });
          break;
      }
    }
  }

  public updatePlaylists():void {
    this.playlists.forEach((playlist) => {
      playlist.updateDuration();
      playlist.updateGenres();
    });
  }
}
