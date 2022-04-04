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
  constructor(private dbDir: string) {
    this.database = new JsonDatabase(this.dbDir);
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
  }


  private promptManagement(): void {
    console.clear();
    console.log('------Musitronic360------ \n');
    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(managementCommands),
    }).then((answers) => {
      switch (answers['command']) {
        case managementCommands.Add:
          let song1: Song = new Song('hola', [], 10, [], 50, false);
          let song2: Song = new Song('holaaaa', [], 12, [], 55, true);
          this.database.addToDatabase([song1, song2]);
          this.promptManagement();
          break;
        case managementCommands.Modify:
          this.promptManagement();
          break;
        case managementCommands.Delete:
          this.promptManagement();
          break;
        case managementCommands.Preview:
          this.promptManagement();
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


const terminal: Terminal = new Terminal('db.json');
terminal.promptStart();
