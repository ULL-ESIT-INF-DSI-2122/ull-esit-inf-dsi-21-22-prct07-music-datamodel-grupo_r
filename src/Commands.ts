export enum viewCommands {
  AlphabeticalSong = 'View songs alphabetically',
  AlphabeticalAlbum = 'View albums alphabetically',
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
  PurgeMEM ='Wipes all memory (NO RETURN!)',
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
  Playlist = 'Playlist',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Exit = 'Exit'
}

export enum playlistCommands {
  View = 'View',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Exit = 'Exit'
}