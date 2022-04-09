import { Group } from './Group';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Song } from './Song';
import { Album } from './Album';
import { Playlist } from './Playlist';
import { viewCommands } from './Commands';
import { anyDatabase } from './anyDatabase';

export class Database implements anyDatabase {
  constructor(protected songs: Song[] = [], protected artists: Artist[] = [], protected albums: Album[] = [],
    protected genres: Genre[] = [], protected groups: Group[] = [], protected playlists: Playlist[] = []) {
  }

  addToMemory(item: (Song[] | Album[] | Genre[] | Group[] | Artist[] | Playlist[])): Promise<void> {
    return new Promise((resolve, reject) => {
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

  async getFromMemory(item:string, type:string): Promise<(Song | Group | Artist | Album | Genre | Playlist)[]> {
    return new Promise((resolve, reject) => {
      const dummy: (Song | Group | Artist | Album | Genre | Playlist)[] = [];
      if (type == 'Song') {
        if (item !== '$ALL$') {
          this.songs.forEach((value) => {
            if ('getName' in value && value.getName() === item) {
              console.log(value.getName());
              dummy.push(value);
            }
          });
        } else resolve(this.songs);
      }
      if (type == 'Album') {
        if (item !== '$ALL$') {
          this.albums.every((value) => {
            if ('getTitle' in value && value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.albums);
      }
      if (type == 'Genre') {
        if (item !== '$ALL$') {
          this.genres.every((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.genres);
      }
      if (type == 'Group') {
        if (item !== '$ALL$') {
          this.groups.every((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.groups);
      }
      if (type == 'Artist') {
        if (item !== '$ALL$') {
          this.artists.every((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.artists);
      }
      if (type == 'Playlist') {
        if (item !== '$ALL$') {
          this.playlists.every((value) => {
            if (value.getName() === item) {
              dummy.push(value);
            }
          });
        } else resolve(this.playlists);
      }
      resolve(dummy);
    });
  }

  purgeMemory(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.songs = [];
      this.artists = [];
      this.albums = [];
      this.groups = [];
      this.genres = [];
      this.playlists = [];
      resolve();
    });
  }

  searchByName(name:any, type: string):
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
  async deleteFromMemory(item: string): Promise<(Song | Group | Artist | Album | Genre | Playlist| undefined)> {
    return new Promise((resolve, reject) => {
      let dummy:(Song | Group | Artist | Album | Genre | Playlist | undefined) = undefined;
      this.songs.forEach((song, index)=> {
        if (item === song.name) {
          this.songs.splice(index, 1);
          dummy = song;
        }
      });
      resolve(dummy);
    });
  }
  printMemory() {
    let output: string = '';
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
    console.log(output);
    console.log('Nº Albums: '+
        this.albums.length +' Nº Artists: ' +
        this.artists.length + ' Nº Songs: ' +
        this.songs.length + ' Nº Groups: '+
        this.groups.length +' Nº Genres: ' +
        this.genres.length + ' Nº Playlists: ' + this.playlists.length);
  }
  printBy(command: viewCommands): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      switch (command) {
        case viewCommands.AlphabeticalSong:
          console.log(this.songs.sort((a, b) => a.getName().localeCompare(b.getName())));
          break;
        case viewCommands.AlphabeticalAlbum:
          console.log(this.albums.sort((a, b) => a.getName().localeCompare(b.getName())));
          break;
        case viewCommands.AlphabeticalPlaylist:
          console.log(this.playlists.sort((a, b) => a.getName().localeCompare(b.getName())));
          break;
        case viewCommands.OnlySingles:
          this.songs.forEach((song) => {
            if (song.getSingle() === true) {
              console.log(song);
            }
          });
          break;
        case viewCommands.ReleaseDate:
          console.log(this.albums.sort((a, b) => a.getDate().localeCompare(b.getDate())));
          break;
        case viewCommands.ViewCount:
          console.log(this.songs.sort((a, b) => a.getPlays().toString().localeCompare(b.getPlays().toString())));
          break;
      }
      resolve();
    });
  }
}
