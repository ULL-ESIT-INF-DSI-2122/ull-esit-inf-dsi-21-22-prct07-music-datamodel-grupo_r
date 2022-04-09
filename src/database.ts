import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Group } from './Group';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Song } from './Song';
import { Album } from './Album';
import { Playlist } from './Playlist';
import { viewCommands } from './terminal';

interface anyDatabase {
  addToMemory(item: (Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[])): void;
  deleteFromMemory(item: string): void;
}
export class Database implements anyDatabase {
  // eslint-disable-next-line max-len
  constructor(protected songs: Song[] = [], protected artists: Artist[] = [], protected albums: Album[] = [], protected genres: Genre[] = [], protected groups: Group[] = [], protected playlists: Playlist[] = []) {
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
  async getFromMemory(item:string, type:string):Promise<(Song|Group|Artist|Album|Genre|Playlist)[]> {
    return new Promise((resolve, reject) => {
      let dummy: (Song|Group|Artist|Album|Genre|Playlist)[] = [];
      if (type == 'Song') {
        this.songs.forEach((value) => {
          if ('getName' in value && value.getName() === item) {
            console.log(value.getName());
            dummy.push(value);
          }
        });
      }
      if (type == 'Album') {
        this.albums.every((value) => {
          if ('getTitle' in value && value.getTitle() === item) {
            dummy.push(value);
          }
        });
      }
      if (type == 'Genre') {
        this.genres.every((value) => {
          if (value.getName() === item) {
            dummy.push(value);
          }
        });
      }
      if (type == 'Group') {
        this.groups.every((value) => {
          if (value.getName() === item) {
            dummy.push(value);
          }
        });
      }
      if (type == 'Artist') {
        this.artists.every((value) => {
          if (value.getName() === item) {
            dummy.push(value);
          }
        });
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
      this.albums = [];
      this.playlists = [];
      resolve();
    });
  }
  searchName(name:string, type:string): (Song|Group|Artist|Album|Genre|Playlist)[] {
    let result : (Song|Group|Artist|Album|Genre|Playlist)[] = [];
    switch (type) {
      case 'song':
        if (name == 'all') {
          this.songs.forEach((song) => {
            result.push(song);
          });
        } else {
          this.artists.forEach((artist) => {
            if (artist.getName() == name) {
              result.push(artist);
            }
          });
        }
        break;
    }
    return result;
  }
  async deleteFromMemory(item: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.songs.forEach((song, index)=> {
        if (item === song.name) {
          this.songs.splice(index, 1);
        }
      });
      resolve();
    });
  }
  printMemory() {
    console.log(this.albums);
    console.log(this.artists);
    console.log(this.songs);
    console.log(this.groups);
    console.log(this.genres);
    console.log(this.playlists);
    console.log('Nº Albums: '+ this.albums.length +' Nº Artists: '+this.artists.length +' Nº Songs: '+this.songs.length +' Nº Groups: '+ this.groups.length +' Nº Genres: ' + this.genres.length +' Nº Playlists: ' + this.playlists.length);
  }
  printBy(command: viewCommands): Promise<void> {
    return new Promise<void>((resolve, reject) =>{
      switch (command) {
        case viewCommands.AlphabeticalSong:
          console.log(this.songs.sort((a, b) => a.getName().localeCompare(b.getName())));
          break;
        case viewCommands.AlphabeticalAlbum:
          console.log(this.albums.sort((a, b) => a.getTitle().localeCompare(b.getTitle())));
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
/**
 * Tipo de datos que se usa para instanciar la lowdb a los campos necesarios
 */
type schemaType = {
  genres: Genre[],
  artists: Artist[],
  albums: Album[],
  songs: Song[],
  groups: Group[]
  playlists: Playlist[]
}
export class JsonDatabase extends Database {
  // eslint-disable-next-line max-len
  private initialized: boolean = false;
  private database?: lowdb.LowdbSync<schemaType>;
  private static JsonDatabase: JsonDatabase;
  private constructor(private dbDir: string = '') {
    super();
    if (dbDir != '') {
      this.database = lowdb(new FileSync(dbDir));
      // eslint-disable-next-line max-len
      if (!this.database.has(`genres`).value() && !this.database.has(`songs`).value() && !this.database.has(`albums`).value() && !this.database.has(`groups`).value() && !this.database.has(`artist`).value()) {
        this.database.set(`songs`, []).write();
        this.database.set(`albums`, []).write();
        this.database.set(`groups`, []).write();
        this.database.set(`artists`, []).write();
        this.database.set(`genres`, []).write();
        this.initialized = true;
      } else {
        this.database?.read();
        const albums = this.database?.get(`albums`).value();
        albums.forEach((album) => {
          this.addToMemory([new Album(album.name, album.author, album.date, album.genres, album.songs)]);
        });

        const artists = this.database?.get(`artists`).value();
        artists.forEach((artist) => {
          this.addToMemory([new Artist(artist.name, artist.groups, artist.genres, artist.albums, artist.songs, artist.listeners)]);
        });
        const songs = this.database?.get(`songs`).value();
        songs.forEach((song) => {
          this.addToMemory([new Song(song.name, song.artists, song.length, song.genres, song.plays, song.isSingle)]);
        });
        const groups = this.database?.get(`groups`).value();
        groups.forEach((group) => {
          this.addToMemory([new Group(group.name, group.members, group.date, group.genres, group.albums, group.listeners)]);
        });

        const genres = this.database?.get(`genres`).value();
        genres.forEach((genre) => {
          this.addToMemory([new Genre(genre.name, genre.groups, genre.albums, genre.songs)]);
        });
        const playlists = this.database?.get(`playlists`).value();
        playlists.forEach((playlist) => {
          this.addToMemory([new Playlist(playlist.name, playlist.songs, playlist.duration, playlist.genres)]);
        });

        this.initialized = true;
      }
    } else {
      this.initialized = false;
    }
  }
  public static getJsonDatabaseInstance(dbDir: string = ''): JsonDatabase {
    if (!JsonDatabase.JsonDatabase || dbDir !== '') {
      JsonDatabase.JsonDatabase = new JsonDatabase(dbDir);
    }
    return JsonDatabase.JsonDatabase;
  }
  setInitialized(value: boolean): void {
    JsonDatabase.JsonDatabase.initialized = value;
  }

  isInitialized(): boolean {
    return JsonDatabase.JsonDatabase.initialized;
  }
  // addToDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     if (JsonDatabase.JsonDatabase.initialized) {
  //       item.forEach((item) => {
  //         if (item instanceof Song) {
  //           JsonDatabase.JsonDatabase.database?.set(`songs`, [...JsonDatabase.JsonDatabase.database.get(`songs`).value(), item]).write();
  //         }
  //         if (item instanceof Album) {
  //           JsonDatabase.JsonDatabase.database?.set(`albums`, [...JsonDatabase.JsonDatabase.database.get(`albums`).value(), item]).write();
  //         }
  //         if (item instanceof Genre) {
  //           JsonDatabase.JsonDatabase.database?.set(`genres`, [...JsonDatabase.JsonDatabase.database.get(`genres`).value(), item]).write();
  //         }
  //         if (item instanceof Group) {
  //           JsonDatabase.JsonDatabase.database?.set(`groups`, [...JsonDatabase.JsonDatabase.database.get(`groups`).value(), item]).write();
  //         }
  //         if (item instanceof Artist) {
  //           JsonDatabase.JsonDatabase.database?.set(`artists`, [...JsonDatabase.JsonDatabase.database.get(`artists`).value(), item]).write();
  //         }
  //       });
  //     }
  //     resolve('good');
  //   });
  // }


  saveFromMemToDb() {
    return new Promise((resolve, reject) => {
      if (JsonDatabase.JsonDatabase.isInitialized()) {
        JsonDatabase.JsonDatabase.database?.set(`songs`, JsonDatabase.JsonDatabase.songs).write();
        JsonDatabase.JsonDatabase.database?.set(`albums`, JsonDatabase.JsonDatabase.albums).write();
        JsonDatabase.JsonDatabase.database?.set(`groups`, JsonDatabase.JsonDatabase.groups).write();
        JsonDatabase.JsonDatabase.database?.set(`artists`, JsonDatabase.JsonDatabase.artists).write();
        JsonDatabase.JsonDatabase.database?.set(`genres`, JsonDatabase.JsonDatabase.genres).write();
        JsonDatabase.JsonDatabase.database?.set(`playlists`, JsonDatabase.JsonDatabase.playlists).write();
        JsonDatabase.JsonDatabase.initialized = true;
        resolve('good');
      } else throw new Error('No database loaded');
    });
  }
  purgeDatabase() {
    return new Promise((resolve, reject) => {
      if (JsonDatabase.JsonDatabase.isInitialized()) {
        JsonDatabase.JsonDatabase.database?.set(`songs`, []).write();
        JsonDatabase.JsonDatabase.database?.set(`albums`, []).write();
        JsonDatabase.JsonDatabase.database?.set(`groups`, []).write();
        JsonDatabase.JsonDatabase.database?.set(`artists`, []).write();
        JsonDatabase.JsonDatabase.database?.set(`genres`, []).write();
        JsonDatabase.JsonDatabase.database?.set(`playlists`, []).write();
        resolve('');
      } else throw new Error('No database loaded');
    });
  }

  print() {
    return new Promise((resolve, reject) => {
      if (JsonDatabase.JsonDatabase.isInitialized()) {
        JsonDatabase.JsonDatabase.database?.read();
        console.log(JsonDatabase.JsonDatabase.database?.get(`albums`).value());
        console.log(JsonDatabase.JsonDatabase.database?.get(`artist`).value());
        console.log(JsonDatabase.JsonDatabase.database?.get(`songs`).value());
        console.log(JsonDatabase.JsonDatabase.database?.get(`groups`).value());
        console.log(JsonDatabase.JsonDatabase.database?.get(`genres`).value());
        console.log(JsonDatabase.JsonDatabase.database?.get(`playlists`).value());
        resolve('');
      } else throw new Error('No database loaded');
    });
  }
}