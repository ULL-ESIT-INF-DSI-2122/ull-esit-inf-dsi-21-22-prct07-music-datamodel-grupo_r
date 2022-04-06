import * as inquirer from 'inquirer';
import { JsonDatabase } from './database';
import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';
import { Question } from './Question';

export enum viewCommands {
  All = 'View all entries',
  AlphabeticalSong = 'View songs alphabetically',
  AlphabeticalAlbum = 'View albums alphabetically',
  AlphabeticalPlaylist = 'View playlists alphabetically',
  ReleaseDate = 'View albums by release date',
  ViewCount = 'View by play count',
  OnlySingles = 'View only singles',
  Return = 'Return'
}


export enum managementCommands {
  Add = 'Add',
  Modify = 'Modify',
  Delete = 'Delete',
  DisplayMEM = 'Display memory content',
  DisplayDB = 'Display db content',
  Load = 'Load a database',
  Save = 'Save from memory to database (load first)',
  Purge = 'Wipes all database (NO RETURN!)',
  Return = 'Return'
}

export enum typeCommands {
  Song = 'Song',
  Genre = 'Genre',
  Artist = 'Artist',
  Album = 'Album',
  Group = 'Group',
}

export enum startCommands {
  View = 'View',
  Search = 'Search (wip)',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Exit = 'Exit'
}
export class Terminal {
  private database: JsonDatabase;
  constructor(private dbDir: string = '') {
    this.database = new JsonDatabase(dbDir);
  }

  private async loadDatabase(dbDir: string): Promise<JsonDatabase> {
    return new Promise((resolve, reject) => {
      this.dbDir = dbDir;
      this.database = new JsonDatabase(dbDir);
      this.database.setInitialized(true);
      resolve(this.database);
    });
  }
  private getDatabase(): JsonDatabase {
    return this.database;
  }
  private promptView(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(viewCommands),
    }).then((answers) => {
      switch (answers['command']) {
        case viewCommands.All:
          this.promptView();
          break;
        case viewCommands.AlphabeticalSong:
          this.promptView();
          break;
        case viewCommands.AlphabeticalAlbum:
          this.promptView();
          break;
        case viewCommands.AlphabeticalPlaylist:
          this.promptView();
          break;
        case viewCommands.ReleaseDate:
          this.promptView();
          break;
        case viewCommands.ViewCount:
          this.promptView();
          break;
        case viewCommands.OnlySingles:
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
    if (this.database.isInitialized()) {
      console.clear();
      console.log('------Musitronic360------ \n');
      inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(startCommands),
      }).then((answers) => {
        switch (answers['command']) {
          case startCommands.View:
            this.promptView();
            break;
          case startCommands.Search:
            this.promptStart();
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
    } else this.loadDbPrompt();
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
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'input',
      name: 'dbDir',
      message: 'Write the .json database directory',
    }).then(async (answers) => {
      await this.loadDatabase(answers.dbDir as string);
      await this.continuePrompt();
      this.promptStart();
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
        message: 'Select what do you want to add',
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
  validate(value:string) {
    if (value == 'a') {
      return true;
    }
    return value;
  }
  private async addPrompt(command: string): Promise<void> {
    const qName: Question = new Question('input', 'name', 'Write the name/title', this.validate);
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
    // eslint-disable-next-line max-len
    const songQuestions = [qName.returnQuestion(), qArtist.returnQuestion(), qLength.returnQuestion(), qGenres.returnQuestion(), qPlays.returnQuestion(), qSingle];
    const albumQuestions = [qName.returnQuestion(), qArtist.returnQuestion(), qReleaseDate.returnQuestion(), qGenres.returnQuestion(), qSongs.returnQuestion()];
    const artistQuestions = [qName.returnQuestion(), qArtist.returnQuestion(), qGenres.returnQuestion(), qAlbums.returnQuestion(), qSongs.returnQuestion(), qListeners.returnQuestion()];
    const groupQuestions = [qName.returnQuestion(), qMember.returnQuestion(), qReleaseDate.returnQuestion(), qGenres.returnQuestion(), qAlbums.returnQuestion(), qListeners.returnQuestion()];
    const genreQuestions = [qName.returnQuestion(), qArtist.returnQuestion(), qAlbums.returnQuestion(), qSongs.returnQuestion()];
    return new Promise(async (resolve, reject) => {
      console.log('------Musitronic360------ \n');
      console.log('Adding '+command+'\n');
      switch (command) {
        case 'Song':
          inquirer.prompt(songQuestions).then(async (answers) => {
            // eslint-disable-next-line max-len
            await this.database.addToMemory([new Song(answers['name'], answers['artist'], answers['length'], answers['genres'], answers['plays'], answers['isSingle'])]);
            this.database.printMemory();
            await this.continuePrompt();
            this.promptManagement();
          });
          break;
        case 'Genre':
          inquirer.prompt(genreQuestions).then(async (answers) => {
            console.log(answers);
            // eslint-disable-next-line max-len
            await this.database.addToMemory([new Genre(answers['name'], answers['artist'], answers['albums'], answers['songs'])]);
            this.database.printMemory();
            await this.continuePrompt();
            this.promptManagement();
          });
          break;
        case 'Album':
          inquirer.prompt(albumQuestions).then(async (answers) => {
            console.log(answers);
            // eslint-disable-next-line max-len
            await this.database.addToMemory([new Album(answers['name'], answers['artist'], answers['date'], answers['genres'], answers['songs'])]);
            this.database.printMemory();
            await this.continuePrompt();
            this.promptManagement();
          });
          break;
        case 'Artist':
          inquirer.prompt(artistQuestions).then(async (answers) => {
            console.log(answers);
            // eslint-disable-next-line max-len
            await this.database.addToMemory([new Artist(answers['name'], answers['artist'], answers['genres'], answers['albums'], answers['songs'], answers['listeners'] )]);
            this.database.printMemory();
            await this.continuePrompt();
            this.promptManagement();
          });
          break;
        case 'Group':
          inquirer.prompt(groupQuestions).then(async (answers) => {
            console.log(answers);
            // eslint-disable-next-line max-len
            await this.database.addToMemory([new Group(answers['name'], answers['members'], answers['date'], answers['genres'], answers['albums'], answers['listeners'])]);
            this.database.printMemory();
            await this.continuePrompt();
            this.promptManagement();
          });
          break;
      }
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
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.DisplayMEM:
          this.database.printMemory();
          await this.continuePrompt();
          this.promptManagement();
          break;
        case managementCommands.DisplayDB:
          try {
            await this.database.print();
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
        case managementCommands.Load:
          this.loadDbPrompt();
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
        case managementCommands.Return:
          this.promptStart();
          break;
      }
    });
  }
}

const terminal: Terminal = new Terminal('');
terminal.promptStart();
