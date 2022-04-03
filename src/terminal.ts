import * as inquirer from 'inquirer';


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
  Return = 'Return'
}

export enum startCommands {
  View = 'View',
  Search = 'Search (wip)',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Exit = 'Exit'
}


function promptView(): void {
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
        promptView();
        break;
      case viewCommands.AlphabeticalSong:
        promptView();
        break;
      case viewCommands.AlphabeticalAlbum:
        promptView();
        break;
      case viewCommands.AlphabeticalPlaylist:
        promptView();
        break;
      case viewCommands.ReleaseDate:
        promptView();
        break;
      case viewCommands.ViewCount:
        promptView();
        break;
      case viewCommands.OnlySingles:
        promptView();
        break;
      case viewCommands.Return:
        promptStart();
        break;
      default:
        console.log('Missing ' + answers['command']);
    }
  });
}


function promptStart(): void {
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
        promptView();
        break;
      case startCommands.Search:
        promptStart();
        break;
      case startCommands.Management:
        promptManagement();
        break;
      case startCommands.Exit:
        break;
      default:
        console.log('Missing ' + answers['command']);
    }
  });
}


function promptManagement(): void {
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
        promptManagement();
        break;
      case managementCommands.Modify:
        promptManagement();
        break;
      case managementCommands.Delete:
        promptManagement();
        break;
      case managementCommands.Preview:
        promptManagement();
        break;
      case managementCommands.Return:
        promptStart();
        break;
    }
  });
}

promptStart();
