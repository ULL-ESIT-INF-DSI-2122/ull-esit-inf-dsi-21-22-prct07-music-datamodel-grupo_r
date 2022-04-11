import * as inquirer from 'inquirer';
import * as command from './Commands';
import { JsonDatabase } from './JsonDatabase';
import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Question } from './Question';
import { Playlist } from './Playlist';

inquirer.registerPrompt('search-list', require('inquirer-search-list'));

/**
 * @clas Allows to manage the advanced treatment of the sistem.
 */
export class Management {
  /**
   * @param {JsonDatabase} Database in json format.
   */
  private database: JsonDatabase;

  /**
   * Initialize a Management object.
   * @param {string} dbDir Filename.
   */
  constructor(private dbDir: string = '') {
    this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
  }

  /**
   * Loads a databse file.
   * @param {string} dbDir Filename.
   * @returns {Promise<JsonDatabase>}
   */
  private async loadDatabase(dbDir: string): Promise<JsonDatabase> {
    return new Promise((resolve, reject) => {
      this.dbDir = dbDir;
      this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
      this.database.setInitialized(true);
      resolve(this.database);
    });
  }

  /**
   * Get the database.
   * @returns {JsonDatabase}
   */
  private getDatabase(): JsonDatabase {
    return this.database;
  }

  /**
   * Prompt to order the database information.
   * @param {command.viewCommands | command.viewPlaylistCommands} commands commands that display the information
   * @param {string} type Tipo of the display
   * @returns {Promise<void>}
   */
  private orderByPrompt(commands: command.viewCommands | command.viewPlaylistCommands, type: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.clear();
      console.log('------Musitronic360------ \n');
      inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(command.orderByCommands),
      }).then(async (answers) => {
        switch (answers['command']) {
          case command.orderByCommands.Ascendantly:
            if (type === 'Playlist') {
              await this.database.printPlaylistBy(commands as command.viewPlaylistCommands, answers['command']);
              await this.continuePrompt();
              this.promptViewPlaylist();
            } else {
              await this.database.printBy(commands as command.viewCommands, answers['command']);
              await this.continuePrompt();
              this.promptView();
            }
            break;
          case command.orderByCommands.Descendingly:
            if (type === 'Playlist') {
              await this.database.printPlaylistBy(commands as command.viewPlaylistCommands, answers['command']);
              await this.continuePrompt();
              this.promptViewPlaylist();
            } else {
              await this.database.printBy(commands as command.viewCommands, answers['command']);
              await this.continuePrompt();
              this.promptView();
            }
            break;
          case command.orderByCommands.Return:
            if (type === 'Playlist') {
              this.promptViewPlaylist();
            } else {
              this.promptView();
            }
            break;
        }
        resolve();
      });
    });
  }

  /**
   * Prompt for the playlist infomation.
   */
  private promptViewPlaylist(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.viewPlaylistCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.viewPlaylistCommands.AlphabeticalSong:
          await this.orderByPrompt(answers['command'], 'Playlist');
          break;
        case command.viewPlaylistCommands.AlphabeticalArtist:
          await this.orderByPrompt(answers['command'], 'Playlist');
          break;
        case command.viewPlaylistCommands.AlphabeticalGenre:
          await this.orderByPrompt(answers['command'], 'Playlist');
          break;
        case command.viewPlaylistCommands.ViewCount:
          await this.orderByPrompt(answers['command'], 'Playlist');
          break;
        case command.viewPlaylistCommands.ViewDuration:
          await this.orderByPrompt(answers['command'], 'Playlist');
          break;
        case command.viewPlaylistCommands.Return:
          this.promptPlaylist();
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }

  /**
   * Prompt for the playlists.
   */
  private promptPlaylist(): void {
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.playlistCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.playlistCommands.View:
          this.promptViewPlaylist();
          break;
        case command.playlistCommands.Management:
          this.promptPlaylistManagement();
          break;
        case command.playlistCommands.Return:
          this.promptStart();
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }

  /**
   * Prompt for the sistem.
   */
  private promptView(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.viewCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.viewCommands.AlphabeticalSong:
          await this.orderByPrompt(answers['command'], 'all');
          break;
        case command.viewCommands.AlphabeticalAlbum:
          await this.orderByPrompt(answers['command'], 'all');
          break;
        case command.viewCommands.ReleaseDate:
          await this.orderByPrompt(answers['command'], 'all');
          break;
        case command.viewCommands.ViewCount:
          await this.orderByPrompt(answers['command'], 'all');
          break;
        case command.viewCommands.OnlySingles:
          await this.orderByPrompt(answers['command'], 'all');

          break;
        case command.viewCommands.Return:
          this.promptStart();
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }

  /**
   * Prompt of the start of the sistem.
   */
  public promptStart(): void {
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.startCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.startCommands.View:
          this.promptView();
          break;
        case command.startCommands.Playlist:
          this.promptPlaylist();
          break;
        case command.startCommands.Management:
          this.promptManagement();
          break;
        case command.startCommands.Exit:
          process.exit(0);
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }

  /**
   * Reset the prompt.
   * @returns {Promise<void>}
   */
  private async continuePrompt(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      return await inquirer.prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Press enter to continue...',
      }).then(async (answers) => {
        resolve();
      });
    });
  }

  /**
   * Load the databse prompt.
   * @returns {Promise<void>}
   */
  private async loadDbPrompt(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      console.clear();
      console.log('------Musitronic360------ \n');
      await inquirer.prompt({
        type: 'input',
        name: 'dbDir',
        message: 'Write the .json database directory',
      }).then(async (answers) => {
        await this.loadDatabase(answers.dbDir as string);
        await this.continuePrompt();
      });
      resolve();
    });
  }

  /**
   * Display the type of the information to be selected.
   * @returns {Promise<any>}
   */
  private async selectTypePrompt(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.clear();
      let result: string = '';
      console.log('------Musitronic360------ \n');
      await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Select what item do you want to operate with',
        choices: Object.values(command.typeCommands),
      }).then(async (answers) => {
        switch (answers['command']) {
          case command.typeCommands.Song:
            result = 'Song';
            break;
          case command.typeCommands.Album:
            result = 'Album';
            break;
          case command.typeCommands.Genre:
            result = 'Genre';
            break;
          case command.typeCommands.Artist:
            result = 'Artist';
            break;
          case command.typeCommands.Group:
            result = 'Group';
            break;
          case command.typeCommands.Return:
            result = '';
            break;
        }
      });
      resolve(result);
    });
  }

  /**
   * Display information to be add.
   * @returns {Promise<void>}
   */
  private async addPrompt(command: string): Promise<void> {
    const qName: Question = new Question('input', 'name', 'Write the name/title');
    const qArtist: Question = new Question('input', 'artist', 'Write the artist name or group');
    const qMember: Question = new Question('input', 'members', 'Write the members of the group');
    const qLength: Question = new Question('input', 'length', 'Write the length');
    const qGenres: Question = new Question('input', 'genres', 'Write the genres');
    const qReleaseDate: Question = new Question('input', 'date', 'Write the release date');
    const qSongs: Question = new Question('input', 'songs', 'Write the songs that are part of this item');
    const qAlbums: Question = new Question('input', 'albums', 'Write the albums that this item is part of');
    const qListeners: Question = new Question('input', 'listeners', 'Write the ammount of listeners of this artist');
    const qPlays: Question = new Question('input', 'plays', 'Write the number of plays');
    const qSingle: Object = {
      name: 'isSingle',
      type: 'confirm',
      message: 'It is a single?',
    };

    const songQuestions = [qName.returnQuestion(), qArtist.returnQuestion(),
      qLength.returnQuestion(), qGenres.returnQuestion(), qPlays.returnQuestion(), qSingle];
    const albumQuestions = [qName.returnQuestion(),
      qArtist.returnQuestion(), qReleaseDate.returnQuestion(), qGenres.returnQuestion(), qSongs.returnQuestion()];
    const artistQuestions = [qName.returnQuestion(),
      qMember.returnQuestion(), qGenres.returnQuestion(),
      qAlbums.returnQuestion(), qSongs.returnQuestion(), qListeners.returnQuestion()];
    const groupQuestions = [qName.returnQuestion(), qMember.returnQuestion(),
      qReleaseDate.returnQuestion(), qGenres.returnQuestion(), qAlbums.returnQuestion(), qListeners.returnQuestion()];
    const genreQuestions = [qName.returnQuestion(),
      qArtist.returnQuestion(), qAlbums.returnQuestion(), qSongs.returnQuestion()];
    const playlistQuestions = [qName.returnQuestion(), qSongs.returnQuestion(),
      qLength.returnQuestion(), qGenres.returnQuestion()];
    try {
      return new Promise(async (resolve, reject) => {
        console.log('------Musitronic360------ \n');
        console.log('Adding '+command+'\n');
        switch (command) {
          case 'Song':
            inquirer.prompt(songQuestions).then(async (answers) => {
              const newSong: Song = new Song(answers['name'], answers['artist'],
                  answers['length'], answers['genres'], answers['plays'], answers['isSingle']);
              await this.database.addToMemory([newSong]);
              newSong.print();
              await this.continuePrompt();
              this.promptManagement();
            });
            break;
          case 'Genre':
            inquirer.prompt(genreQuestions).then(async (answers) => {
              console.log(answers);
              const newGenre: Genre = new Genre(answers['name'],
                  answers['artist'], answers['albums'], answers['songs']);
              await this.database.addToMemory([newGenre]);
              await this.continuePrompt();
              this.promptManagement();
            });
            break;
          case 'Album':
            inquirer.prompt(albumQuestions).then(async (answers) => {
              console.log(answers);
              const newAlbum: Album = new Album(answers['name'], answers['artist'],
                  answers['date'], answers['genres'], answers['songs']);
              await this.database.addToMemory([newAlbum]);
              newAlbum.print();
              await this.continuePrompt();
              this.promptManagement();
            });
            break;
          case 'Artist':
            inquirer.prompt(artistQuestions).then(async (answers) => {
              console.log(answers);
              const newArtist: Artist = new Artist(answers['name'], answers['members'], answers['genres'],
                  answers['albums'], answers['songs'], parseInt(answers['listeners']));
              await this.database.addToMemory([newArtist]);
              await this.continuePrompt();
              this.promptManagement();
            });
            break;
          case 'Group':
            inquirer.prompt(groupQuestions).then(async (answers) => {
              console.log(answers);
              const newGroup: Group = new Group(answers['name'], answers['members'],
                  answers['date'], answers['genres'], answers['albums'], answers['listeners']);
              await this.database.addToMemory([newGroup]);
              newGroup.print();
              await this.continuePrompt();
              this.promptManagement();
            });
            break;

          case 'Playlist':
            inquirer.prompt(playlistQuestions).then(async (answers) => {
              const newPlaylist: Playlist = new Playlist(answers['name'], answers['songs'],
                  answers['duration'], answers['genres']);
              await this.database.addToMemory([newPlaylist]);
              newPlaylist.print();
              await this.continuePrompt();
              this.promptManagement();
            });
            break;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  private continueAddingSongs(value: string) {
    if (value !== 'continue'){
    }
  }
  /**
   * Display information to be modify.
   * @returns {Promise<void>}
   */
  private async modifyPrompt(command: string): Promise<void> {
    const qName: Question = new Question('input', 'name', 'Write the name/title');
    const qArtist: Question = new Question('search-list', 'selectedArtist', 'Select the artist name or group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
    const qMember: Question = new Question('search-list', 'members', 'Write the members of the group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
    const qLength: Question = new Question('input', 'length', 'Write the length');
    const qGenres: Question = new Question('search-list', 'selectedGenre', 'Select the genre', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Genre'))).map((o) => o.name));
    const qReleaseDate: Question = new Question('input', 'date', 'Write the release date');
    const qSongs: Question = new Question('search-list', 'songs', 'Write the songs that are part of this item', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name));
    const qAlbums: Question = new Question('search-list', 'albums', 'Write the albums that this item is part of', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Album'))).map((o) => o.name));
    const qListeners: Question = new Question('input', 'listeners', 'Write the ammount of listeners of this artist');
    const qPlays: Question = new Question('input', 'plays', 'Write the number of plays');
    const qSingle: Object = {
      name: 'isSingle',
      type: 'confirm',
      message: 'It is a single?',
    };
    // QUESTIONS
    const songQuestions = [qName.returnQuestion(), qArtist.returnQuestion(false, true),
      qLength.returnQuestion(), qGenres.returnQuestion(false, true), qPlays.returnQuestion(), qSingle];
    const playlistQuestions = [qName.returnQuestion(), qSongs.returnQuestion(true, true),
      qLength.returnQuestion(), qGenres.returnQuestion()];
    const albumQuestions = [qName.returnQuestion(),
      qArtist.returnQuestion(false, true), qReleaseDate.returnQuestion(), qGenres.returnQuestion(false, true), qSongs.returnQuestion()];
    const artistQuestions = [qName.returnQuestion(),
      qMember.returnQuestion(false, true), qGenres.returnQuestion(false, true),
      qAlbums.returnQuestion(false, true), qSongs.returnQuestion(false, true), qListeners.returnQuestion()];
    const groupQuestions = [qName.returnQuestion(), qMember.returnQuestion(false, true),
      qReleaseDate.returnQuestion(), qGenres.returnQuestion(false, true), qAlbums.returnQuestion(false, true), qListeners.returnQuestion()];
    const genreQuestions = [qName.returnQuestion(),
      qArtist.returnQuestion(false, true), qAlbums.returnQuestion(false, true), qSongs.returnQuestion(false, true)];

    // CHOICES
    const songChoice = new Question('search-list', 'songChoice', 'Select song', () =>{}, (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
    const albumChoice = new Question('search-list', 'albumChoice', 'Select album', () =>{}, (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
    const artistChoice = new Question('search-list', 'artistChoice', 'Select artist', () =>{}, (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
    const groupChoice = new Question('search-list', 'groupChoice', 'Select group', () =>{}, (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
    const genreChoice = new Question('search-list', 'genreChoice', 'Select genre', () =>{}, (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
    const playlistChoice = new Question('search-list', 'playlistChoice', 'Select playlist', () =>{}, (await (this.database.getFromMemory('$ONLYNEW$', command))).map((o) => o.name));

    return new Promise(async (resolve, reject) => {
      console.log('------Musitronic360------ \n');
      console.log('Modifying ' + command + '\n');
      switch (command) {
        case 'Song':
          await inquirer.prompt(songChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedSongs: Song[] = this.database.searchByName(answers['songChoice'], 'song') as Song[];
            if (selectedSongs.length > 1) {
              let duplicateSongsMap: Map<Song, string> = new Map();
              selectedSongs.forEach((song) => {
                duplicateSongsMap.set(song, song.getArtists().getName());
              });
              let duplicateSongsString: string[] = [];
              duplicateSongsMap.forEach((artist, song) => {
                duplicateSongsString.push(song.getName() + ' by ' + artist);
              });
              await inquirer.prompt(new Question('list', 'discernedSong', 'Select song from duplicates', () => {}, duplicateSongsString).returnQuestion(false, true)).then(async (answers) => {

              });
            } else {
              let selectedSong: Song = selectedSongs[0];
              selectedSong.print();
              await inquirer.prompt(songQuestions).then(async (answers) => {
                selectedSong.setName(answers['name']);
                let artistGroupRemoved: Artist | Group = selectedSong.getArtists();
                let artistGroupCopy: Artist | Group = this.database.searchByName(answers['selectedArtist'], 'author') as Artist | Group;
                if (artistGroupRemoved instanceof Artist) {
                  artistGroupRemoved.getSongs().forEach((song, index) => {
                    if (selectedSong === song) {
                      if (artistGroupRemoved instanceof Artist) {
                        artistGroupRemoved.getSongs().splice(index, 1);
                      }
                    }
                  });
                }
                selectedSong.setArtists(this.database.searchByName(answers['selectedArtist'], 'author') as Artist | Group);
                if (artistGroupCopy instanceof Artist) {
                  artistGroupCopy.setSongs(selectedSong);
                }
                let genresRemoved: Genre[] = selectedSong.getGenres();
                genresRemoved.forEach((genre)=>{
                  genre.getSongs().forEach((song, index) => {
                    if (selectedSong === song) {
                      genre.getSongs().splice(index, 1);
                    }
                  });
                });
                selectedSong.replaceGenres(this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[]);
                selectedSong.getGenres().forEach((genre)=>{
                  genre.setSongs(selectedSong);
                });
                selectedSong.setPlays(answers['plays']);
                selectedSong.setSingle(answers['isSingle']);
                resolve();
              });
            }
            resolve();
          });
          break;
        case 'Genre':
          await inquirer.prompt(genreChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedGenres: Genre[] = this.database.searchByName(answers['genreChoice'], 'genre') as Genre[];
            let selectedGenre: Genre = selectedGenres[0];
            selectedGenre.print();
            await inquirer.prompt(genreQuestions).then(async (answers) => {
              selectedGenre.setName(answers['name']);
              let artistsGroupsRemoved: (Group | Artist)[] = selectedGenre.getAuthors();
              let artistGroupCopy: (Group | Artist)[] = this.database.searchByName(answers['selectedArtist'], 'author') as (Artist | Group)[];
              artistsGroupsRemoved.forEach((value) => {
                if (value instanceof Artist) {
                  value.getGenres().forEach((genre, index)=>{
                    if (genre.getName() === value.getName()) {
                      value.getGenres().splice(index, 1);
                    }
                  });
                }
                if (value instanceof Group) {
                  value.getGenres().forEach((genre, index)=>{
                    if (genre.getName() === value.getName()) {
                      value.getGenres().splice(index, 1);
                    }
                  });
                }
              });
              artistGroupCopy.forEach((value) => {
                if (value instanceof Artist) {
                  value.setGenres(selectedGenre);
                }
                if (value instanceof Group) {
                  value.addGenres([selectedGenre]);
                }
              });
              selectedGenre.setAuthors(this.database.searchByName(answers['selectedArtist'], 'author') as Artist | Group);
              let albumsRemoved: Album[] = selectedGenre.getAlbums();
              let albumsCopy: Album[] = this.database.searchByName(answers['selectedAlbum'], 'genre') as Album[];
              selectedGenre.replaceAlbums(this.database.searchByName(answers['selectedAlbum'], 'genre') as Album[]);
              albumsRemoved.forEach((album) => {
                album.getGenres().forEach((genre, index)=>{
                  if (genre === selectedGenre) {
                    album.getGenres().splice(index, 1);
                  }
                });
              });
              albumsCopy.forEach((album) => {
                album.addGenres([selectedGenre]);
              });
              let songsRemoved: Song[] = selectedGenre.getSongs();
              let songsCopy: Song[] = this.database.searchByName(answers['selectedSong'], 'song') as Song[];
              selectedGenre.replaceSongs(this.database.searchByName(answers['selectedSong'], 'song') as Song[]);
              songsRemoved.forEach((song) => {
                song.getGenres().forEach((genre, index)=> {
                  if (genre == selectedGenre) {
                    song.getGenres().splice(index, 1);
                  }
                });
              });
              songsCopy.forEach((song) =>{
                song.setGenres(selectedGenre);
              });
              resolve();
            });
            resolve();
          });
          break;
        case 'Album':
          await inquirer.prompt(albumChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedAlbums: Album[] = this.database.searchByName(answers['albumChoice'], 'album') as Album[];
            let selectedAlbum: Album = selectedAlbums[0];
            selectedAlbum.print();
            await inquirer.prompt(albumQuestions).then(async (answers) => {
              selectedAlbum.setName(answers['name']);

              let artistsGroups2Removed: (Group | Artist) = selectedAlbum.getAuthor();
              let artistGroup2Copy: (Group | Artist) = this.database.searchByName(answers['selectedArtist'], 'author') as (Artist | Group);
              artistsGroups2Removed.getAlbums().forEach((album, index)=>{
                if (album.getName() === selectedAlbum.getName()) {
                  artistsGroups2Removed.getAlbums().splice(index, 1);
                }
              });
              artistGroup2Copy.setAlbums(selectedAlbum);
              selectedAlbum.setAuthor(this.database.searchByName(answers['selectedArtist'], 'author') as Artist | Group);

              selectedAlbum.setDate(answers['date']);

              let genres2Removed: Genre[] = selectedAlbum.getGenres();
              let genres2Copy: Genre[] = this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[];
              selectedAlbum.setGenres(this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[]);
              genres2Removed.forEach((genre) => {
                genre.getAlbums().forEach((album, index)=>{
                  if (album === selectedAlbum) {
                    genre.getAlbums().splice(index, 1);
                  }
                });
              });
              genres2Copy.forEach((genre) => {
                genre.setAlbums(selectedAlbum);
              });

              selectedAlbum.setSongs(this.database.searchByName(answers['selectedSong'], 'song') as Song[]);
              resolve();
            });
            resolve();
          });
          break;
        case 'Artist':
          await inquirer.prompt(artistChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedArtist: Artist = this.database.searchByName(answers['artistChoice'], 'album') as Artist;
            selectedArtist.print();
            await inquirer.prompt(artistQuestions).then(async (answers) => {
              selectedArtist.setName(answers['name']);

              let groups2Removed: Group[] = selectedArtist.getGroups();
              let groups2Copy: Group[] = this.database.searchByName(answers['selectedGroup'], 'group') as Group[];
              groups2Removed.forEach((group)=>{
                group.getMembers().forEach((member, index)=>{
                  if (member.getName() === selectedArtist.getName()) {
                    group.getMembers().splice(index, 1);
                  }
                });
              });
              groups2Copy.forEach((group) =>{
                group.getMembers().push(selectedArtist);
              });
              selectedArtist.setGroups(this.database.searchByName(answers['selectedGroup'], 'group') as Group);
              let genres3Removed: Genre[] = selectedArtist.getGenres();
              let genres3Copy: Genre[] = this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[];
              selectedArtist.setGenres((this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[])[0]);
              genres3Removed.forEach((genre) => {
                genre.getAuthors().forEach((author, index)=>{
                  if (author === selectedArtist) {
                    genre.getAuthors().splice(index, 1);
                  }
                });
              });
              genres3Copy.forEach((genre) => {
                genre.getAuthors().push(selectedArtist);
              });

              let albums3Removed: Album[] = selectedArtist.getAlbums();
              let albums3Copy: Album[] = this.database.searchByName(answers['selectedAlbum'], 'album') as Album[];
              selectedArtist.replaceAlbums(this.database.searchByName(answers['selectedAlbum'], 'album') as Album[]);
              albums3Copy.forEach((album) => {
                album.setAuthor(selectedArtist);
              });

              let songs3Removed: Song[] = selectedArtist.getSongs();
              let songs3Copy: Song[] = this.database.searchByName(answers['selectedSong'], 'song') as Song[];
              selectedArtist.replaceSongs(this.database.searchByName(answers['selectedSong'], 'song') as Song[]);
              songs3Copy.forEach((song) => {
                song.setArtists(selectedArtist);
              });
              resolve();
            });
            resolve();
          });
          break;
        case 'Group':
          await inquirer.prompt(groupChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedGroup: Group = this.database.searchByName(answers['groupChoice'], 'group') as Group;
            if (selectedGroup instanceof Array) {
              selectedGroup[0].print();
            }
            await inquirer.prompt(groupQuestions).then(async (answers) => {
              selectedGroup.setName(answers['name']);

              let artist4Removed: Artist[] = selectedGroup.getMembers();
              let artist4Copy: Artist[] = this.database.searchByName(answers['selectedArtist'], 'artist') as Artist[];
              selectedGroup.setMembers(this.database.searchByName(answers['selectedArtist'], 'artist') as Artist[]);
              artist4Removed.forEach((artist)=>{
                artist.getGroups().forEach((group, index)=>{
                  if (group === selectedGroup) {
                    group.getMembers().splice(index, 1);
                  }
                });
              });
              artist4Copy.forEach((artist) =>{
                artist.getGroups().push(selectedGroup);
              });
              selectedGroup.setDate(answers['date']);

              let genres4Removed: Genre[] = selectedGroup.getGenres();
              let genres4Copy: Genre[] = this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[];
              selectedGroup.setGenres(this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[]);

              genres4Removed.forEach((genre) => {
                genre.getAuthors().forEach((author, index)=>{
                  if (author === selectedGroup) {
                    genre.getAuthors().splice(index, 1);
                  }
                });
              });
              genres4Copy.forEach((genre) => {
                genre.getAuthors().push(selectedGroup);
              });

              let albums4Removed: Album[] = selectedGroup.getAlbums();
              let albums4Copy: Album[] = this.database.searchByName(answers['selectedAlbum'], 'album') as Album[];
              selectedGroup.replaceAlbums((this.database.searchByName(answers['selectedAlbum'], 'album') as Album[]));

              albums4Copy.forEach((album) => {
                album.setAuthor(selectedGroup);
              });
              selectedGroup.setListeners(answers['listeners']);
              resolve();
            });
            resolve();
          });
          break;

        case 'Playlist':
          await inquirer.prompt(playlistChoice.returnQuestion(false, true)).then(async (answers) => {
            let selectedPlaylist: Playlist = (this.database.searchByName(answers['playlistChoice'], 'playlist') as Playlist[])[0];
            selectedPlaylist.print();
            await inquirer.prompt(playlistQuestions).then(async (answers) => {
            });
          });
          break;
      }
      resolve();
    });
  }

  private promptDelete(command: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      console.log('------Musitronic360------ \n');
      console.log('Deleting ' + command+'\n');
      // console.log((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
      switch (command) {
        case 'Song':
          const qSong: Object = {
            name: 'song',
            type: 'search-list',
            message: 'Select song',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          return await inquirer.prompt(qSong).then(async (answers) => {
            const copySong: (Song | undefined) = await this.database.deleteFromMemory(answers.song, 'Song') as (Song | undefined);
            (await this.database.getFromMemory('$ALL$', 'Artist')).forEach((artist) => {
              if (artist instanceof Artist) {
                artist.getSongs().forEach((song, index) => {
                  if (copySong === song) {
                    artist.getSongs().splice(index, 1);
                    console.log('Deleted ' + song.getName() + ' from Author: ' + artist.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Album')).forEach((album) => {
              if (album instanceof Album) {
                album.getSongs().forEach((song, index) => {
                  if (copySong === song) {
                    album.getSongs().splice(index, 1);
                    console.log('Deleted ' + song.getName() + ' from Album: ' + album.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Genre')).forEach((genre) => {
              if (genre instanceof Genre) {
                genre.getSongs().forEach((song, index) => {
                  if (copySong === song) {
                    genre.getSongs().splice(index, 1);
                    console.log('Deleted ' + song.getName() + ' from Genre: ' + genre.getName());
                  }
                });
              }
            });
            console.log('Deleted: ' + answers.song);
            resolve();
          });
          break;
        case 'Genre':
          const qGenre: Object = {
            name: 'genre',
            type: 'search-list',
            message: 'Select genre',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          return await inquirer.prompt(qGenre).then(async (answers) => {
            console.log(answers.genre);
            const copyGenre: (Genre | undefined) = await this.database.deleteFromMemory(answers.genre, 'Genre') as (Genre | undefined);
            (await this.database.getFromMemory('$ALL$', 'Artist')).forEach((artist) => {
              if (artist instanceof Artist) {
                artist.getGenres().forEach((genre, index) => {
                  if (copyGenre === genre) {
                    artist.getGenres().splice(index, 1);
                    console.log('Deleted ' + genre.getName() + ' from Artist: ' + artist.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Group')).forEach((group) => {
              if (group instanceof Group) {
                group.getGenres().forEach((genre, index) => {
                  if (copyGenre === genre) {
                    group.getGenres().splice(index, 1);
                    console.log('Deleted ' + genre.getName() + ' from Group: ' + group.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Song')).forEach((song) => {
              if (song instanceof Song) {
                song.getGenres().forEach((genre, index) => {
                  if (copyGenre === genre) {
                    song.getGenres().splice(index, 1);
                    console.log('Deleted ' + genre.getName() + ' from Song: ' + song.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Album')).forEach((album) => {
              if (album instanceof Album) {
                album.getGenres().forEach((genre, index) => {
                  if (copyGenre === genre) {
                    album.getGenres().splice(index, 1);
                    console.log('Deleted ' + genre.getName() + ' from Album: ' + album.getName());
                  }
                });
              }
            });
            console.log('Deleted: ' + answers.genre);
            resolve();
          });
          break;
        case 'Album':
          const qAlbum: Object = {
            name: 'album',
            type: 'search-list',
            message: 'Select album',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          return await inquirer.prompt(qAlbum).then(async (answers) => {
            const copyAlbum: (Album | undefined) = await this.database.deleteFromMemory(answers.album, 'Album') as (Album | undefined);
            (await this.database.getFromMemory('$ALL$', 'Group')).forEach((group) => {
              if (group instanceof Group) {
                group.getAlbums().forEach((album, index) => {
                  if (copyAlbum === album) {
                    group.getAlbums().splice(index, 1);
                    console.log('Deleted ' + album.getName() + ' from Group: ' + group.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Genre')).forEach((genre) => {
              if (genre instanceof Genre) {
                genre.getAlbums().forEach((album, index) => {
                  if (copyAlbum === album) {
                    genre.getAlbums().splice(index, 1);
                    console.log('Deleted ' + album.getName() + ' from Genre: ' + genre.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Artist')).forEach((artist) => {
              if (artist instanceof Artist) {
                artist.getAlbums().forEach((album, index) => {
                  if (copyAlbum === album) {
                    artist.getAlbums().splice(index, 1);
                    console.log('Deleted ' + album.getName() + ' from Artist: ' + artist.getName());
                  }
                });
              }
            });
            console.log('Deleted: ' + answers.album);
            resolve();
          });
          break;
        case 'Artist':
          const qArtist: Object = {
            name: 'artist',
            type: 'search-list',
            message: 'Select artist',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          return await inquirer.prompt(qArtist).then(async (answers) => {
            const copyArtist: (Artist | undefined) = await this.database.deleteFromMemory(answers.artist, 'Artist') as (Artist | undefined);
            (await this.database.getFromMemory('$ALL$', 'Group')).forEach((group) => {
              if (group instanceof Group) {
                group.getMembers().forEach((artist, index) => {
                  if (copyArtist === artist) {
                    group.getMembers().splice(index, 1);
                    console.log('Deleted ' + artist.getName() + ' from Group: ' + group.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Song')).forEach((song) => {
              if (song instanceof Song) {
                if (copyArtist === song.getArtists()) {
                  console.log('Its not possible to delete the author from an Song, you have to remove the Song first');
                }
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Album')).forEach((album) => {
              if (album instanceof Album) {
                if (copyArtist === album.getAuthor()) {
                  console.log('Its not possible to delete the author from an Album, you have to remove the Album first');
                }
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Genre')).forEach((genre) => {
              if (genre instanceof Genre) {
                genre.getAuthors().forEach((author, index) => {
                  if (copyArtist === author) {
                    genre.getAuthors().splice(index, 1);
                    console.log('Deleted ' + author.getName() + ' from Genre: ' + genre.getName());
                  }
                });
              }
            });
            console.log('Deleted: ' + answers.artist);
          });
          break;
        case 'Group':
          const qGroup: Object = {
            name: 'group',
            type: 'search-list',
            message: 'Select group',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          return await inquirer.prompt(qGroup).then(async (answers) => {
            const copyGroup: (Group|undefined) = await this.database.deleteFromMemory(answers.group, 'Group') as (Group|undefined);
            (await this.database.getFromMemory('$ALL$', 'Artist')).forEach((artist) => {
              if (artist instanceof Artist) {
                artist.getGroups().forEach((group, index) => {
                  if (copyGroup === group) {
                    artist.getGroups().splice(index, 1);
                    console.log('Deleted ' + group.getName() + ' from Artist: ' + artist.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Genre')).forEach((genre) => {
              if (genre instanceof Genre) {
                genre.getAuthors().forEach((author, index) => {
                  if (copyGroup === author) {
                    genre.getAuthors().splice(index, 1);
                    console.log('Deleted ' + author.getName() + ' from Genre: ' + genre.getName());
                  }
                });
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Album')).forEach((album) => {
              if (album instanceof Album) {
                if (copyGroup === album.getAuthor()) {
                  console.log('Its not possible to delete the author from an Album, you have to remove the Album first');
                }
              }
            });
            (await this.database.getFromMemory('$ALL$', 'Song')).forEach((song) => {
              if (song instanceof Song) {
                if (copyGroup === song.getArtists()) {
                  console.log('Its not possible to delete a group from an Song, you have to remove the Song first');
                }
              }
            });
            console.log('Deleted: ' + answers.group);
            resolve();
          });
          break;
        case 'Playlist':
          const qPlaylist: Object = {
            name: 'playlist',
            type: 'search-list',
            message: 'Select playlist',
            choices: (await (this.database.getFromMemory('$ONLYNEW$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qPlaylist).then(async (answers) => {
            await this.database.deleteFromMemory(answers.playlist, 'Playlist');
            resolve();
          });
          break;
      }
      resolve();
    });
  }

  /**
   * Display information to be manage.
   * @returns {void}
   */
  private promptManagement(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    let option: string = '';
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.managementCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.managementCommands.Add:
          option = await this.selectTypePrompt();
          if (option !== '') {
            await this.addPrompt(option);
          }
          this.promptManagement();
          break;
        case command.managementCommands.Modify:
          option = await this.selectTypePrompt();
          if (option !== '') {
            await this.modifyPrompt(option);
          }
          this.promptManagement();
          break;
        case command.managementCommands.Delete:
          console.log('WIP');
          await this.promptDelete(await this.selectTypePrompt());
          await this.continuePrompt();
          this.promptManagement();
          break;
        case command.managementCommands.DisplayMEM:
          this.database.printMemory();
          await this.continuePrompt();
          this.promptManagement();
          break;
        case command.managementCommands.DisplayDB:
          try {
            await this.database.print();
            await this.continuePrompt();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case command.managementCommands.Load:
          await this.loadDbPrompt();
          this.promptManagement();
          break;
        case command.managementCommands.Save:
          try {
            await this.database.saveFromMemToDb();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case command.managementCommands.Purge:
          try {
            await this.database.purgeDatabase();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case command.managementCommands.PurgeMEM:
          try {
            await this.database.purgeMemory();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case command.managementCommands.Return:
          this.promptStart();
          break;
      }
    });
  }

  /**
   * Display playlist information to be manage.
   * @returns {void}
   */
  private promptPlaylistManagement() {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(command.playlistManagementCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case command.playlistManagementCommands.Add:
          await this.addPrompt('Playlist');
          await this.continuePrompt();
          this.promptManagement();
          break;
        case command.playlistManagementCommands.Modify:
          await this.continuePrompt();
          this.promptManagement();
          break;
        case command.playlistManagementCommands.Delete:
          await this.promptDelete('Playlist');
          this.promptManagement();
          break;
        case command.playlistManagementCommands.Save:
          try {
            await this.database.saveFromMemToDb();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case command.playlistManagementCommands.Return:
          this.promptStart();
          break;
      }
    });
  }
}

const terminal: Management = new Management('MusicDataBase.json');
terminal.promptStart();
