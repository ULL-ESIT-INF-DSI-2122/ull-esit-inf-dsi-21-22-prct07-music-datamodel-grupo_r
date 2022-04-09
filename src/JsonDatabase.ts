import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Database } from './database';
import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Playlist } from './Playlist';

/**
 * Tipo de datos que se usa para instanciar la lowdb a los campos necesarios
 */
 type schemaType = {
  genres: Genre[],
  artists: Artist[],
  albums: Album[],
  songs: Song[],
  groups: Group[],
  playlists: Playlist[]
}

export class JsonDatabase extends Database {
  private initialized: boolean = false;
  private database?: lowdb.LowdbSync<schemaType>;
  private static JsonDatabase: JsonDatabase;
  private constructor(private dbDir: string = '') {
    super();
    if (dbDir != '') {
      this.database = lowdb(new FileSync(dbDir));
      if (!this.database.has(`genres`).value() && !this.database.has(`songs`).value() &&
          !this.database.has(`albums`).value() && !this.database.has(`groups`).value() &&
          !this.database.has(`artist`).value()) {
        this.database.set(`songs`, []).write();
        this.database.set(`albums`, []).write();
        this.database.set(`groups`, []).write();
        this.database.set(`artists`, []).write();
        this.database.set(`genres`, []).write();
        this.initialized = true;
      } else {
        this.database?.read();

        const genres = this.database?.get(`genres`).value();
        genres.forEach((genre) => {
          this.addToMemory([new Genre(genre.name, [], [], [])]);
        });

        const artists = this.database?.get(`artists`).value();
        artists.forEach((artist) => {
          const genresRef: Genre[] = this.searchByName(artist.genres, 'genre') as Genre[];
          const newArtist: Artist = new Artist(artist.name, [], genresRef, [], [], artist.listeners);
          this.addToMemory([newArtist]);
          this.genres.forEach((genre) => {
            if (genresRef.includes(genre)) {
              genre.setAuthors(newArtist);
            }
          });
        });

        const groups = this.database?.get(`groups`).value();
        groups.forEach((group) => {
          const artistRef: Artist[] = this.searchByName(group.members, 'artist') as Artist[];
          const genresRef: Genre[] = this.searchByName(group.genres, 'genre') as Genre[];
          const newGroup: Group = new Group(group.name, artistRef, group.date, genresRef, [], group.listeners);
          this.addToMemory([newGroup]);
          this.artists.forEach((artist) => {
            if (artistRef.includes(artist)) {
              artist.setGroups(newGroup);
            }
          });
          this.genres.forEach((genre) => {
            if (genresRef.includes(genre)) {
              genre.setAuthors(newGroup);
            }
          });
        });

        const songs = this.database?.get(`songs`).value();
        songs.forEach((song) => {
          const artistOrGroupRef: (Artist| Group) = this.searchByName(song.artists, 'author') as (Artist| Group);
          const genresRef: Genre[] = this.searchByName(song.genres, 'genre') as Genre[];
          const newSong: Song = new Song(song.name, artistOrGroupRef, song.length,
              genresRef, song.plays, song.isSingle);
          this.addToMemory([newSong]);
          if (artistOrGroupRef instanceof Artist) {
            this.artists.forEach((artist) => {
              if (artistOrGroupRef == artist) {
                artist.setSongs(newSong);
              }
            });
          }
          this.genres.forEach((genre) => {
            if (genresRef.includes(genre)) {
              genre.setSongs(newSong);
            }
          });
        });

        const albums = this.database?.get(`albums`).value();
        albums.forEach((album) => {
          const authorRef: (Artist| Group) = this.searchByName(album.author, 'author') as (Artist| Group);
          const genresRef: Genre[] = this.searchByName(album.genres, 'genre') as Genre[];
          const songsRef: Song[] = this.searchByName(album.songs, 'song') as Song[];
          const newAlbum: Album = new Album(album.name, authorRef, album.date, genresRef, songsRef);
          this.addToMemory([newAlbum]);
          if (authorRef instanceof Artist) {
            this.artists.forEach((artist) => {
              if (authorRef == artist) {
                artist.setAlbums(newAlbum);
              }
            });
          } else if (authorRef instanceof Group) {
            this.groups.forEach((group) => {
              if (authorRef == group) {
                group.setAlbums(newAlbum);
              }
            });
          }
          this.genres.forEach((genre) => {
            if (genresRef.includes(genre)) {
              genre.setAlbums(newAlbum);
            }
          });
        });

        const playlists = this.database?.get(`playlists`).value();
        playlists.forEach((playlist) => {
          const songsRef = this.searchByName(playlist.songs, 'song') as Song[];
          const genresRef: Genre[] = this.searchByName(playlist.genres, 'genre') as Genre[];
          const newPlaylist = new Playlist(playlist.name, songsRef, playlist.duration, genresRef);
          this.addToMemory([newPlaylist]);
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
      let genresNames: string[] = [];
      let artistsNames: string[] = [];
      let albumsNames: string[] = [];
      let songsNames: string[] = [];
      let groupsNames: string[] = [];
      let authorsNames: string[] = [];
      if (JsonDatabase.JsonDatabase.isInitialized()) {
        let dummySongs: Object[] = [];
        //
        //          SAVE SONG
        //
        JsonDatabase.JsonDatabase.songs.forEach((item) => {
          genresNames = [];
          item.getGenres().forEach((genre) => {
            genresNames.push(genre.getName());
          });
          const objectSong: {
            name: string,
            artists: string,
            length: number,
            genres: string[],
            plays: number,
            isSingle: boolean,
          } = {
            name: item.getName(),
            artists: item.artists.getName(),
            length: item.getLength(),
            genres: genresNames,
            plays: item.getPlays(),
            isSingle: item.getSingle(),
          };
          dummySongs.push(objectSong);
          console.log('Song');
        });
        JsonDatabase.JsonDatabase.database?.set(`songs`, dummySongs).write();
        //
        //          SAVE ALBUMS
        //
        let dummyAlbums: Object[] = [];
        JsonDatabase.JsonDatabase.albums.forEach((item) => {
          genresNames = [];
          item.getGenres().forEach((genre) => {
            genresNames.push(genre.getName());
          });
          songsNames = [];
          item.getSongs().forEach((song) => {
            songsNames.push(song.getName());
          });
          const objectAlbum: {
            name: string,
            author: string,
            date: string,
            genres: string[],
            songs: string[]
          } = {
            name: item.getName(),
            author: item.getAuthor().getName(),
            date: item.getDate(),
            genres: genresNames,
            songs: songsNames,
          };
          dummyAlbums.push(objectAlbum);
          console.log('Album');
        });
        JsonDatabase.JsonDatabase.database?.set(`albums`, dummyAlbums).write();
        //
        //          SAVE GROUPS
        //
        let dummyGroups: Object[] = [];
        JsonDatabase.JsonDatabase.groups.forEach((item) => {
          genresNames = [];
          item.getGenres().forEach((genre) => {
            genresNames.push(genre.getName());
          });
          artistsNames = [];
          item.getMembers().forEach((artist) => {
            artistsNames.push(artist.getName());
          });
          albumsNames = [];
          item.getAlbums().forEach((album) => {
            albumsNames.push(album.getName());
          });
          const objetoGroup: {
            name: string,
            members: string[],
            date: string,
            genres: string[],
            albums: string[],
            listeners: number,
          } = {
            name: item.getName(),
            members: artistsNames,
            date: item.getDate(),
            genres: genresNames,
            albums: albumsNames,
            listeners: item.getListeners(),
          };
          dummyGroups.push(objetoGroup);
          console.log('Groups');
        });
        JsonDatabase.JsonDatabase.database?.set(`groups`, dummyGroups).write();

        //
        //          SAVE ARTISTS
        //
        let dummyArtists: Object[] = [];
        JsonDatabase.JsonDatabase.artists.forEach((item) => {
          groupsNames = [];
          genresNames = [];
          albumsNames = [];
          songsNames = [];
          item.getGroups().forEach((group) => {
            groupsNames.push(group.getName());
          });
          item.getGenres().forEach((genre) => {
            genresNames.push(genre.getName());
          });
          item.getAlbums().forEach((album) => {
            console.log(album.getName());
            albumsNames.push(album.getName());
          });
          item.getSongs().forEach((song) => {
            songsNames.push(song.getName());
          });
          const objectArtist: {
            name: string,
            groups: string[],
            genres: string[],
            albums: string[],
            songs: string[],
            listeners: number,
          } = {
            name: item.getName(),
            groups: groupsNames,
            genres: genresNames,
            albums: albumsNames,
            songs: songsNames,
            listeners: item.getListeners(),
          };
          dummyArtists.push(objectArtist);
          console.log('ARTISTS');
        });
        JsonDatabase.JsonDatabase.database?.set(`artists`, dummyArtists).write();
        //
        //          SAVE GENRES
        //
        let dummyGenre: Object[] = [];
        JsonDatabase.JsonDatabase.genres.forEach((item) => {
          authorsNames = [];
          songsNames = [];
          albumsNames = [];
          item.getSongs().forEach((song) => {
            songsNames.push(song.getName());
          });
          item.getAuthors().forEach((author) => {
            authorsNames.push(author.getName());
          });

          item.getAlbums().forEach((album) => {
            albumsNames.push(album.getName());
          });
          const objetoGenre: {
            name: string,
            authors: string[],
            albums: string[],
            songs: string[],
          } = {
            name: item.getName(),
            authors: authorsNames,
            albums: albumsNames,
            songs: songsNames,
          };
          dummyGenre.push(objetoGenre);
          console.log('Genre');
        });
        JsonDatabase.JsonDatabase.database?.set(`genres`, dummyGenre).write();
        //
        //          SAVE PLAYLISTS
        //
        let dummyPlaylist: Object[] = [];
        JsonDatabase.JsonDatabase.playlists.forEach((item) => {
          genresNames = [];
          item.getGenres().forEach((genre) => {
            genresNames.push(genre.getName());
          });
          songsNames = [];
          item.getSongs().forEach((song) => {
            songsNames.push(song.getName());
          });
          const ObjectPlaylist: {
            name: string,
            songs: string[],
            duration: number,
            genres: string[],
          } = {
            name: item.getName(),
            songs: songsNames,
            duration: item.getDuration(),
            genres: genresNames,
          };
          dummyPlaylist.push(ObjectPlaylist);
          console.log('Playlist');
        });
        JsonDatabase.JsonDatabase.database?.set(`playlists`, dummyPlaylist).write();
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
