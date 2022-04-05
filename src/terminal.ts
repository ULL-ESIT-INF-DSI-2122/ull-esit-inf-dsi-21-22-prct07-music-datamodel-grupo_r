import * as inquirer from 'inquirer';
import { JsonDatabase } from './database';
import { Group } from './Group';
import { Album } from './Album';
import { Song } from './Song';
import { Artist } from './Artist';
import { Genre } from './Genre';


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
  Preview = 'Display all content',
  Load = 'Load a database',
  Purge = 'Wipes all database (NO RETURN!)',
  Return = 'Return'
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
    } else this.inputPrompt();
  }
  private async continuePrompt(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await inquirer.prompt({
        name: 'continue',
        type: 'confirm',
        message: 'Press enter to continue...',
      }).then(async (answers) => {
        this.promptStart();
      });
      resolve();
    });
  }

  private async inputPrompt(): Promise<void> {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'input',
      name: 'dbDir',
      message: 'Write the .json database directory',
    }).then(async (answers) => {
      await this.loadDatabase(answers.dbDir as string);
      this.continuePrompt();
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
          let song1: Song = new Song('hola', [], 10, [], 50, false);
          let song2: Song = new Song('holaaaa', [], 12, [], 55, true);
          await this.database.addToDatabase([song1, song2]);
          this.promptManagement();
          break;
        case managementCommands.Modify:
          this.promptManagement();
          break;
        case managementCommands.Delete:
          this.promptManagement();
          break;
        case managementCommands.Preview:
          this.database.print();
          await this.continuePrompt();
          break;
        case managementCommands.Load:
          this.inputPrompt();
          break;
        case managementCommands.Purge:
          this.database.purgeDatabase();
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
