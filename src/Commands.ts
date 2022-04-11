/**
 * @enum {viewCommands} Questions to browse the information associated with these entities.
 */
export enum viewCommands {
  AlphabeticalSong = 'View songs alphabetically',
  AlphabeticalAlbum = 'View albums alphabetically',
  ReleaseDate = 'View albums by release date',
  ViewCount = 'View by play count',
  OnlySingles = 'View only singles',
  Return = 'Return'
}

/**
 * @enum {viewPlaylistCommands} Questions to browse the information associated with playlists.
 */
export enum viewPlaylistCommands {
  AlphabeticalSong = 'View songs alphabetically',
  AlphabeticalArtist = 'View artist alphabetically',
  AlphabeticalGenre = 'View genre alphabetically',
  ViewDuration = 'View by duration',
  ViewCount = 'View by play count',
  Return = 'Return'
}

/**
 * @enum {orderByCommands} Questions to browse the information.
 */
export enum orderByCommands {
  Ascendantly = 'Ascendantly',
  Descendingly = 'Descendingly',
  Return = 'Return'
}

/**
 * Questions to mamnage the information associated with these entities.
 */
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

/**
 * @enum {playlistManagementCommands} Questions to mamnage the information associated with playlists.
 */
export enum playlistManagementCommands {
  Add = 'Add',
  Modify = 'Modify',
  Delete = 'Delete',
  Save = 'Save from memory to database (load first)',
  Return = 'Return'
}

/**
 * @enum {typeCommands} Entities.
 */
export enum typeCommands {
  Song = 'Song',
  Genre = 'Genre',
  Artist = 'Artist',
  Album = 'Album',
  Group = 'Group',
  Return = 'Return'
}

/**
 * @enum {startCommands} View options.
 */
export enum startCommands {
  View = 'View',
  Playlist = 'Playlist',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Exit = 'Exit'
}

/**
 * @enum {startCommands} View playlsits options.
 */
export enum playlistCommands {
  View = 'View',
  Management = 'Enter management mode (add, modify, remove, load DB)',
  Return = 'Return'
}
