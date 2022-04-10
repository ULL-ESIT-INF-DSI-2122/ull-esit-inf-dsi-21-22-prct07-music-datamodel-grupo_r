import * as inquirer from 'inquirer';
import { JsonDatabase } from './JsonDatabase';
import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Question } from './Question';
import { Playlist } from './Playlist';
import { viewCommands } from './Commands';
import { managementCommands } from './Commands';
import { typeCommands } from './Commands';
import { startCommands } from './Commands';
import { playlistCommands } from './Commands';

inquirer.registerPrompt('search-list', require('inquirer-search-list'));
export class Terminal {
  private database: JsonDatabase;
  constructor(private dbDir: string = '') {
    this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
  }

  private async loadDatabase(dbDir: string): Promise<JsonDatabase> {
    return new Promise((resolve, reject) => {
      this.dbDir = dbDir;
      this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
      this.database.setInitialized(true);
      resolve(this.database);
    });
  }
  private getDatabase(): JsonDatabase {
    return this.database;
  }

  private promptViewPlaylist() {
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(playlistCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case playlistCommands.View:
          this.promptView();
          break;
        case playlistCommands.Management:
          this.promptManagement();
          break;
        case playlistCommands.Exit:
          this.promptStart();
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }


  private promptView(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(viewCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case viewCommands.AlphabeticalSong:
          await this.database.printBy(answers['command']);
          await this.continuePrompt();
          this.promptView();
          break;
        case viewCommands.AlphabeticalAlbum:
          await this.database.printBy(answers['command']);
          await this.continuePrompt();
          this.promptView();
          break;
        case viewCommands.ReleaseDate:
          await this.database.printBy(answers['command']);
          await this.continuePrompt();
          this.promptView();
          break;
        case viewCommands.ViewCount:
          await this.database.printBy(answers['command']);
          await this.continuePrompt();
          this.promptView();
          break;
        case viewCommands.OnlySingles:
          await this.database.printBy(answers['command']);
          await this.continuePrompt();
          this.promptView();
          break;
        case viewCommands.Return:
          this.promptStart();
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }

  promptStart(): void {
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(startCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case startCommands.View:
          this.promptView();
          break;
        case startCommands.Playlist:
          this.promptViewPlaylist();
          break;
        case startCommands.Management:
          this.promptManagement();
          break;
        case startCommands.Exit:
          break;
        default:
          console.log('Missing ' + answers['command']);
      }
    });
  }
  private async continuePrompt(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await inquirer.prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Press enter to continue...',
      }).then(async (answers) => {
        resolve();
      });
      resolve();
    });
  }

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


  private async selectTypePrompt(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.clear();
      let result: string = '';
      console.log('------Musitronic360------ \n');
      await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Select what item do you want to operate with',
        choices: Object.values(typeCommands),
      }).then(async (answers) => {
        switch (answers['command']) {
          case typeCommands.Song:
            result = 'Song';
            break;
          case typeCommands.Album:
            result = 'Album';
            break;
          case typeCommands.Genre:
            result = 'Genre';
            break;
          case typeCommands.Artist:
            result = 'Artist';
            break;
          case typeCommands.Group:
            result = 'Group';
            break;
        }
      });
      resolve(result);
    });
  }

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
  private promptDelete(command: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      console.log('------Musitronic360------ \n');
      console.log('Deleting '+command+'\n');
      // console.log((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
      switch (command) {
        case 'Song':
          const qSong: Object = {
            name: 'song',
            type: 'search-list',
            message: 'Select song',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qSong).then(async (answers) => {
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
          await this.continuePrompt();
          this.promptManagement();
          break;
        case 'Genre':
          const qGenre: Object = {
            name: 'genre',
            type: 'search-list',
            message: 'Select genre',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qGenre).then(async (answers) => {
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
          await this.continuePrompt();
          this.promptManagement();
          break;
        case 'Album':
          const qAlbum: Object = {
            name: 'album',
            type: 'search-list',
            message: 'Select album',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qAlbum).then(async (answers) => {
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
          await this.continuePrompt();
          this.promptManagement();
          break;
        case 'Artist':
          const qArtist: Object = {
            name: 'artist',
            type: 'search-list',
            message: 'Select artist',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qArtist).then(async (answers) => {
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
            resolve();
          });
          await this.continuePrompt();
          this.promptManagement();
          break;
        case 'Group':
          const qGroup: Object = {
            name: 'group',
            type: 'search-list',
            message: 'Select group',
            choices: (await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name),
          };
          await inquirer.prompt(qGroup).then(async (answers) => {
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
          await this.continuePrompt();
          this.promptManagement();
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
          });
          break;
      }
      resolve();
    });
  }

  private promptManagement() {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(managementCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case managementCommands.Add:
          await this.addPrompt(await this.selectTypePrompt());
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.Modify:
          console.log('WIP');
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.Delete:
          console.log('WIP');
          await this.promptDelete(await this.selectTypePrompt());
          break;
        case managementCommands.DisplayMEM:
          this.database.printMemory();
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.DisplayDB:
          try {
            await this.database.print();
            await this.continuePrompt();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Load:
          await this.loadDbPrompt();
          this.promptManagement();
          break;
        case managementCommands.Save:
          try {
            await this.database.saveFromMemToDb();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Purge:
          try {
            await this.database.purgeDatabase();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.PurgeMEM:
          try {
            await this.database.purgeMemory();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Return:
          this.promptStart();
          break;
      }
    });
  }

  
  private promptPlaylistManagement() {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(managementCommands),
    }).then(async (answers) => {
      switch (answers['command']) {
        case managementCommands.Add:
          await this.addPrompt(await this.selectTypePrompt());
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.Modify:
          console.log('WIP');
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.Delete:
          console.log('WIP');
          await this.promptDelete(await this.selectTypePrompt());
          break;
        case managementCommands.DisplayMEM:
          this.database.printMemory();
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.DisplayDB:
          try {
            await this.database.print();
            await this.continuePrompt();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Load:
          await this.loadDbPrompt();
          this.promptManagement();
          break;
        case managementCommands.Save:
          try {
            await this.database.saveFromMemToDb();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Purge:
          try {
            await this.database.purgeDatabase();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.PurgeMEM:
          try {
            await this.database.purgeMemory();
          } catch (error) {
            console.error(error);
            await this.continuePrompt();
          }
          this.promptManagement();
          break;
        case managementCommands.Return:
          this.promptStart();
          break;
      }
    });
  }
}

const terminal: Terminal = new Terminal('MusicDataBase.json');
terminal.promptStart();
