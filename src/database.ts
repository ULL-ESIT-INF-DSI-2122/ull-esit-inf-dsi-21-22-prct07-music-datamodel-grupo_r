import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Group} from './Group';
import {Artist} from './Artist';
import {Genre} from './Genres';
import {Song} from './Song';
import {Album} from './Album';


interface anyDatabase {
  addToDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void;
  deleteFromDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void;
}
export class Database implements anyDatabase {
  // eslint-disable-next-line max-len
  constructor(private songs: Song[] = [], private artists: Artist[] = [], private albums: Album[] = [], private genres: Genre[] = [], private groups: Group[] = []) {
  }
  addToDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void {
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
    });
  }

  deleteFromDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void {
  }
  print() {
    console.log(this.albums);
    console.log(this.artists);
    console.log(this.songs);
    console.log(this.groups);
    console.log(this.genres);
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
}
export class JsonDatabase implements anyDatabase {
  // eslint-disable-next-line max-len
  private database: lowdb.LowdbSync<schemaType>;
  constructor(private dbDir: string = '') {
    if (dbDir != '') {
      this.database = lowdb(new FileSync(dbDir));
      // eslint-disable-next-line max-len
      if (!this.database.has(`genres`).value() && !this.database.has(`songs`).value() && !this.database.has(`albums`).value() && !this.database.has(`groups`).value() && !this.database.has(`artist`).value()) {
        this.database.set(`songs`, []).write();
        this.database.set(`albums`, []).write();
        this.database.set(`groups`, []).write();
        this.database.set(`artists`, []).write();
        this.database.set(`genres`, []).write();
      }
    } else throw new Error('.json dir not specified, cant load db');
  }
  addToDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void {
    item.forEach((item) => {
      if (item instanceof Song) {
        this.database.set(`songs`, [...this.database.get(`songs`).value(), item]).write();
      }
      if (item instanceof Album) {
        this.database.set(`albums`, [...this.database.get(`albums`).value(), item]).write();
      }
      if (item instanceof Genre) {
        this.database.set(`genres`, [...this.database.get(`genres`).value(), item]).write();
      }
      if (item instanceof Group) {
        this.database.set(`groups`, [...this.database.get(`groups`).value(), item]).write();
      }
      if (item instanceof Artist) {
        this.database.set(`artists`, [...this.database.get(`artists`).value(), item]).write();
      }
    });
  }

  deleteFromDatabase(item: (Song[] | Album[] | Genre[] | Group[] | Artist[])): void {
  }
  purgeDatabase() {
    this.database.set(`songs`, []).write();
    this.database.set(`albums`, []).write();
    this.database.set(`groups`, []).write();
    this.database.set(`artists`, []).write();
    this.database.set(`genres`, []).write();
  }
  print() {
    this.database.read();
    console.log(this.database.get(`albums`).value());
    console.log(this.database.get(`artist`).value());
    console.log(this.database.get(`songs`).value());
    console.log(this.database.get(`groups`).value());
    console.log(this.database.get(`genres`).value());
  }
}
