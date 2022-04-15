
# Práctica 7 - Digitalizando la colección de música de los abuelos

- Marco Antonio Cabrera Hernández
- Jonay Méndez Márquez
- Mario Hernández García

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r)

[![Test](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r/actions/workflows/test.js.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo_r?branch=main)

# Musitronic360 - Digitalizando una colección musical
El propósito del proyecto es sencillo: diseñar, construir y digitalizar una colección de música. Esto supone poder almacenar toda la información que sea útil a la hora de identificar los distintos elementos del sistema (artistas, canciones, álbumes, etc), y no solo eso, sino tener toda esta información jerarquizada y vinculada entre sí para lograr el perfecto entramado de una base de datos musical. Gestionar, añadir, modificar o eliminar parte de esta información será una parte indispensable del programa, y a estas y otras metas les seguirán una serie de decisiones y soluciones para hacer que todo funcione como es debido. 

Es la estructura del programa, las decisiones que hemos tomado y las soluciones que hacen que cada pieza encaje, lo que explicaremos en este informe. Presentamos así nuestro proyecto *Musitronic360*, donde podrás guardar, reproducir y recopilar la información de tus canciones favoritas.

# Clases básicas: Las piezas del puzzle
> _"Programar sin una arquitectura o diseño en mente es como explorar una gruta sólo con una linterna: no sabes dónde estás, dónde has estado, ni hacia dónde vas."_ ~ Danny Thorpe

Una colección musical cumple con un único propósito principal, el de representar y gestionar música. Aunque en un primer momento pueda surgir la idea de que esto solo supone la carga y reproducción de sonidos, lo cierto es que una sola canción ya viene acompañada de mucha información de utilidad para el usuario que desea guardarla en una lista. ¿A qué album pertenece? ¿Cuánto dura? ¿Quién es ese que canta? ¿Hay más canciones de este artista? Y un sinfín de preguntas a las que nosotros, como desarrolladores, debemos asegurar una respuesta.

Para ello, tendremos en cuenta que toda la información (o al menos la que consideramos de prioridad para este proyecto) podrá distribuirse entre los distintos elementos:

- **Géneros musicales**
- **Canciones**
- **Álbumes**
- **Grupos**
- **Artistas**
- **Playlists**

Así, planteamos desde los primeros esbozos de nuestro diseño que la información estará ordenada y estrechamente relacionada entre sí. Por ejemplo, en nuestro sistema un album será una instancia de la clase _Album_, con su autor (instancia de _Artist_ o _Group_) almacenado en uno de sus atributos. Asimismo, un grupo o un artista, instancias de _Group_ y _Artist_ respectivamente, tendrán como uno de sus atributos internos a los álbumes (instancias de _Album_) de los que son autores. Este será, además del corazón central de nuestro proyecto, la raíz de gran parte de las dificultades que enfrentaremos. 

Debemos conseguir que la máquina funcione teniendo, como engranajes, objetos que a su vez almacenan otros objetos, y estos vinculados también en el sentido contrario, entrando en varias ocasiones en situaciones circulares.

Para poder visualizar esto mejor, se procede a presentar las distintas clases que entrarán en juego, así como sus respectivos atributos.

- class **Genre**  &emsp;⟶&emsp; Clase para representar un género musical
    - **name:** string &emsp;⟶&emsp; Nombre del género
    - **authors:** (Group \| Artist)[] &emsp;⟶&emsp; Grupos o autores con canciones del género
    - **albums:** Album[] &emsp;⟶&emsp; Álbumes que se ubiquen dentro del género
    - **songs:** Song[] &emsp;⟶&emsp; Canciones que se ubiquen dentro del género
 <br><br> 
- class **Song**  &emsp;⟶&emsp; Clase para representar una canción
    - **name:** string &emsp;⟶&emsp; Título de la canción
    - **artists:** (Group \| Artist) &emsp;⟶&emsp; Grupo o artista autor de la canción
    - **length:** number &emsp;⟶&emsp; Duración (en segundos) de la canción
    - **genres:** Genre[] &emsp;⟶&emsp; Géneros musicales de la canción
    - **plays:** number &emsp;⟶&emsp; Reproducciones que tiene la canción
    - **isSingle:** boolean &emsp;⟶&emsp; Valor booleano que indica si ha sido lanzada o no como _single_
 <br><br> 

- class **Album**  &emsp;⟶&emsp; Clase para representar un álbum musical
    - **name:** string &emsp;⟶&emsp; Título del álbum
    - **author:** (Group \| Artist) &emsp;⟶&emsp; Grupo o artista autor del álbum
    - **date:** string &emsp;⟶&emsp; Fecha en la que fue estrenado el álbum
    - **genres:** Genre[] &emsp;⟶&emsp; Géneros musicales del álbum
    - **songs:** Song[] &emsp;⟶&emsp; Canciones que conforman el álbum
 <br><br> 
- class **Group**  &emsp;⟶&emsp; Clase para representar un grupo musical
    - **name:** string &emsp;⟶&emsp; Nombre del grupo
    - **members:** Artist[] &emsp;⟶&emsp; Artistas miembros del grupo
    - **date:** string &emsp;⟶&emsp; Fecha en la que se formó el grupo
    - **genres:** Genre[] &emsp;⟶&emsp; Géneros musicales relacionados con el grupo
    - **albums:** Album[] &emsp;⟶&emsp; Álbumes musicales publicados por el grupo
    - **listeners:** number &emsp;⟶&emsp; Número de oyentes mensuales del grupo
 <br><br> 
- class **Artist**  &emsp;⟶&emsp; Clase para representar un artista musical
    - **name:** string &emsp;⟶&emsp; Nombre del artista
    - **groups:** Group[] &emsp;⟶&emsp; Grupos musicales de los que forma parte el artista
    - **genres:** Genre[] &emsp;⟶&emsp; Géneros musicales relacionados con el artista
    - **albums:** Album[] &emsp;⟶&emsp; Álbumes musicales publicados por el artista
    - **songs:** Song[] &emsp;⟶&emsp; Canciones publicadas por el artista
    - **listeners:** number &emsp;⟶&emsp; Número de oyentes mensuales del artista
 <br><br> 
- class **Playlist**  &emsp;⟶&emsp; Clase para representar una playlist
    - **name:** string &emsp;⟶&emsp; Nombre de la playlist
    - **songs:** Song[] &emsp;⟶&emsp; Canciones que conforman la playlist
    - **duration:** number &emsp;⟶&emsp; Duración de la playlist (suma de la duración de todas sus canciones)
    - **genres:** Genre[] &emsp;⟶&emsp; Géneros musicales de las canciones que lo conforman
 <br><br> 
 
*! Los atributos en todas las clases han sido declarados como públicos. Esto es debido a que durante el desarrollo del programa nos enfrentamos al manejo de objetos genéricos y, tal y como se indica en la documentación, debíamos acceder a sus atributos directamente. La alternativa escogida fue, por lo tanto, renunciar a la declaración privada de los mismos y hacerlos públicos.*

 Sabiendo esto, se procede a la explicación en detalle de cómo se ha implementado cada una de las clases.

<br><br>

## **Clase Genre**
 ___

    class Genre {
        constructor(
            public name: string,
            public authors: (Group | Artist)[],
            public albums: Album[],
            public songs: Song[],
        ) {
            this.name = name;
            this.authors = authors;
            this.albums = albums;
            this.songs = songs;
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }


---

## **Funciones de la clase Genre**

### Getter de _name_
> Devuelve el nombre del género

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre del género

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _authors_
> Devuelve autores relacionados con el género

    public getAuthors(): (Group | Artist)[] {
        return this.authors;
    }

### Setter de _authors_
> Modifica la lista de autores relacionados con el género
  
    public setAuthors(group: Group | Artist): void {
        this.authors.push(group);
    }

### Getter de _albums_
> Devuelve albumes relacionados con el género

    public getAlbums(): Album[] {
        return this.albums;
    }

### Setter de _albums_
> Añade un album a la lista

    public setAlbums(album: Album) {
        this.albums.push(album);
    }

### replaceAlbums()
> Reemplaza los albumes relacionados con el género

    public replaceAlbums(album: Album[]): void {
        this.albums = album;
    }

### Getter de _songs_
> Devuelve la lista de canciones

    public getSongs(): Song[] {
        return this.songs;
    }

### Setter de _songs_
> Añade una canción a la lista

    public setSongs(song: Song) {
        this.songs.push(song);
    }

### replaceSongs()
> Reemplaza la lista de canciones

    public replaceSongs(song: Song[]): void {
        this.songs = song;
    }

### print()
> Muestra por pantalla y devuelve como string la información del género musical con un buen formato

    public print(): string {
        let output: string = `Genre - ${this.name}`;
        output += `\n Author: `;
        this.authors.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\nAlbums: `;
        this.albums.forEach((a) => {
        output += `\n - ${a.getName()}`;
        });

        output += `\nSongs: `;
        this.songs.forEach((s) => {
        output += `\n - ${s.getName()}`;
        });

        output += `\n------------\n`;
        console.log(output);
        return output;
    }
<br><br>

## **Clase Song**
 ___

    class Song {
        constructor(
            public name: string,
            public artists: Artist | Group,
            public length: number,
            public genres: Genre[],
            public plays: number,
            public isSingle: boolean,
        ) {
            this.name = name;
            this.artists = artists;
            this.length = length;
            this.genres = genres;
            this.isSingle = isSingle;
            this.plays = plays;
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

---
## **Funciones de la clase Song**

### Getter de _name_
> Devuelve el nombre de la canción

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre de la canción

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _artists_
> Devuelve el artista o grupo autor

    public getArtists(): Artist | Group {
        return this.artists;
    }

### Setter de _artists_
> Modifica el artista o grupo autor
  
    public setArtists(artist: Artist | Group): void {
        this.artists = artist;
    }

### Getter de _length_
> Devuelve la duración de la canción

    public getLength(): number {
        return this.length;
    }

### Setter de _length_
> Modifica la duración de la canción

    public setLength(length: number): void {
        this.length = length;
    }

### Getter de _genres_
> Devuelve los géneros musicales

    public getGenres(): Genre[] {
        return this.genres;
    }

### Setter de _genres_
> Añade un género musical

    public setGenres(genre: Genre): void {
        this.genres.push(genre);
    }

### replaceGenres()
> Reemplazar la lista de géneros

    public replaceGenres(genres: Genre[]): void {
        this.genres = genres;
    }


### Getter de _plays_
> Devuelve el número de reproducciones

    public getPlays(): number {
        return this.plays;
    }

### Setter de _plays_
> Modifica el número de reproducciones

    setPlays(plays: number): void {
        this.plays = plays;
    }

### Getter de _isSingle_
> Devuelve si ha sido lanzada o no como single

    getSingle(): boolean {
        return this.isSingle;
    }

### Setter de _isSingle_
> Modifica si ha sido lanzada o no como single

    setSingle(isSingle: boolean): void {
        this.isSingle = isSingle;
    }

### print()
> Muestra por pantalla y devuelve como string la información de la canción con un buen formato

    public print(): string {
        let output: string = `Song - ${this.name}`;

        output += `\nAuthor: ${this.artists.getName()}`;

        output += `\nLength: ${this.length} seconds`;

        output += `\nGenres: `;
        this.genres.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\nPlays: ${this.plays}`;

        if (this.isSingle) {
        output += `\nPublished as single?: Yes`;
        } else {
        output += `\nPublished as single?: No`;
        }
        output += `\n------------\n`;

        console.log(output);
        return output;
    }

<br><br>

## **Clase Album**
 ___

        class Album {
        constructor(
            public name: string,
            public author: Artist | Group,
            public date: string,
            public genres: Genre[],
            public songs: Song[],
        ) {
            this.name = name;
            this.author = author;
            this.date = date;
            this.genres = genres;
            this.songs = songs;
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

---
## **Funciones de la clase Album**

### Getter de _name_
> Devuelve el nombre del álbum

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre del álbum

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _author_
> Devuelve el autor

    public getAuthor(): Artist | Group {
        return this.author;
    }

### Setter de _author_
> Modifica el autor

    public setAuthor(author: Artist | Group): void {
        this.author = author;
    }

### Getter de _date_
> Devuelve la fecha de publicación

    public getDate(): string {
        return this.date;
    }

### Setter de _date_
> Modifica la fecha de publicación

    public setDate(date: string): void {
        this.date = date;
    }

### Getter de _genres_
> Devuelve los géneros musicales

    public getGenres(): Genre[] {
        return this.genres;
    }

### Setter de _genres_
> Modifica los géneros musicales

    public setGenres(genres: Genre[]): void {
        this.genres = genres;
    }

### addGenres()
> Añade un género a la lista

    public addGenres(genres: Genre[]): void {
        for (let i: number = 0; i < genres.length; i++) {
        this.genres.push(genres[i]);
        }
    }

### Getter de _songs_
> Devuelve la lista de canciones

    public getSongs(): Song[] {
        return this.songs;
    }

### Setter de _songs_
> Modifica la lista de canciones

    public setSongs(songs: Song[]) {
        this.songs = songs;
    }

### print()
> Muestra por pantalla y devuelve como string la información del album con un buen formato

    public print(): string {
        let output: string = 'Album - ' + this.name + '\nAuthor: ' + this.author.name + '\nDate: ' + this.date;

        output += '\nGenres: ';
        this.genres.forEach((g) => {
        output += '\n -' + g.getName();
        });

        output += '\nSongs: ';
        this.songs.forEach((s) => {
        output += '\n -' + s.getName();
        });

        output += '\n------------\n\n';
        console.log(output);
        return output;
    }

<br><br>

## **Clase Group**
 ___

    class Group {
        constructor(
            public name: string,
            public members: Artist[],
            public date: string,
            public genres: Genre[],
            public albums: Album[],
            public listeners: number,
        ) {
            this.name = name;
            this.members = members;
            this.date = date;
            this.genres = genres;
            this.albums = albums;
            this.listeners = listeners;
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

---
## **Funciones de la clase Group**

### Getter de _name_
> Devuelve el nombre del grupo

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre del grupo

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _members_
> Devuelve el conjunto de artistas miembros

    public getMembers(): Artist[] {
        return this.members;
    }

### Setter de _members_
> Modifica el conjunto de artistas miembros

    public setMembers(members: Artist[]): void {
        this.members = members;
    }

### Getter de _date_
> Devuelve la fecha en la que se formó

    public getDate(): string {
        return this.date;
    }

### Setter de _date_
> Modifica la fecha en la que se formó

    public setDate(date: string): void {
        this.date = date;
    }

### Getter de _genres_
> Devuelve los géneros musicales

    public getGenres(): Genre[] {
        return this.genres;
    }

### Setter de _genres_
> Modifica los géneros musicales

    public setGenres(genres: Genre[]): void {
        this.genres = genres;
    }

### addGenres()
> Añade un género a la lista

    public addGenres(genres: Genre[]): void {
        for (let i: number = 0; i < genres.length; i++) {
        this.genres.push(genres[i]);
        }
    }

### Getter de _albums_
> Devuelve la lista de álbumes

    public getAlbums(): Album[] {
        return this.albums;
    }

### Setter de _albums_
> Añade un album a la lista

    public setAlbums(album: Album) {
        this.albums.push(album);
    }

### replaceAlbums()
> Reemplazar la lista de álbumes

    public replaceAlbums(albums: Album[]): void {
        this.albums = albums;
    }

### Getter de _listeners_
> Devuelve la cantidad de oyentes mensuales

    public getListeners(): number {
        return this.listeners;
    }

### Setter de _listeners_
> Modifica la cantidad de oyentes mensuales

    public setListeners(listerners: number): number {
        return this.listeners = listerners;
    }

### incrementListeners()
> Incrementa en una unidad el número de oyentes

    public incrementListeners(): void {
        this.listeners++;
    }

### print()
> Muestra por pantalla y devuelve como string la información del grupo con un buen formato

    public print(): string {
        let output: string = `Group - ${this.name}`;

        output += `\nMembers: `;
        this.members.forEach((m) => {
        output += `\n - ${m.getName()}`;
        });

        output += `\nDate: ${this.date}`;

        output += `\nGenres: `;
        this.genres.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\nAlbums: `;
        this.albums.forEach((a) => {
        output += `\n - ${a.getName()}`;
        });

        output += `\nListeners: ${this.listeners}`;
        output += `\n------------\n`;

        console.log(output);
        return output;
    }
<br><br>

## **Clase Artist**
 ___

    class Artist {
        constructor(
            public name: string,
            public groups: Group[],
            public genres: Genre[],
            public albums: Album[],
            public songs: Song[],
            public listeners: number,
        ) {
            this.name = name;
            this.groups = groups;
            this.genres = genres;
            this.albums = albums;
            this.songs = songs;
            this.listeners = this.calculateListeners();
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

---
## **Funciones de la clase Artist**

### Getter de _name_
> Devuelve el nombre del artista

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre del artista

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _groups_
> Devuelve los grupos de los que el artista forma parte

    public getGroups(): Group[] {
        return this.groups;
    }

### Setter de _groups_
> Modifica la lista de grupos de los que forma parte el artista

    public setGroups(group: Group): void {
        this.groups.push(group);
    }

### Getter de _genres_
> Devuelve los géneros musicales relacionados

    public getGenres(): Genre[] {
        return this.genres;
    }

### Setter de _genres_
> Modifica los géneros musicales relacionados

    public setGenres(genres: Genre[]): void {
        this.genres = genres;
    }

### Getter de _albums_
> Devuelve la lista de álbumes

    public getAlbums(): Album[] {
        return this.albums;
    }

### Setter de _albums_
> Añade un album a la lista

    public setAlbums(album: Album) {
        this.albums.push(album);
    }

### replaceAlbums()
> Reemplazar la lista de álbumes

    public replaceAlbums(albums: Album[]): void {
        this.albums = albums;
    }

### Getter de _songs_
> Devuelve la lista de canciones

    public getSongs(): Song[] {
        return this.songs;
    }

### Setter de _songs_
> Añade una canción a la lista

    public setSongs(song: Song) {
        this.songs.push(song);
    }

### replaceSongs()
> Reemplaza la lista de canciones

    public replaceSongs(song: Song[]): void {
        this.songs = song;
    }

### calculateListeners()
> Calcula la cantidad de oyentes mensuales

    private calculateListeners(): number {
        for (let i = 0; i < this.groups.length; i++) {
        this.listeners += this.groups[i].getListeners();
        }
        for (let j = 0; j < this.songs.length; j++) {
        this.listeners += this.songs[j].getPlays();
        }
        return Number((this.listeners / 12).toFixed());
    }

### Getter de _listeners_
> Devuelve la cantidad de oyentes mensuales

    public getListeners(): number {
        return this.listeners;
    }

### print()
> Muestra por pantalla y devuelve como string la información del artista con un buen formato

    public print(): string {
        let output: string = `Artist - ${this.name}`;

        output += `\nGroups: `;
        this.groups.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\nGenres: `;
        this.genres.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\nAlbums: `;
        this.albums.forEach((a) => {
        output += `\n - ${a.getName()}`;
        });

        output += `\nSongs: `;
        this.songs.forEach((s) => {
        output += `\n - ${s.getName()}`;
        });

        output += `\nListeners: ${this.listeners}`;
        output += `\n------------\n`;
        console.log(output);
        return output;
    }

<br><br>

## **Clase Playlist**
 ___

        class Playlist {
            constructor(
                public name: string,
                public songs: Song[],
                public duration: number,
                public genres: Genre[],
            ) {
                this.name = name;
                this.songs = songs;
                this.duration = duration;
                this.genres = genres;
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }
        
---
## **Funciones de la clase PLaylist**

### Getter de _name_
> Devuelve el nombre de la playlist

    public getName(): string {
        return this.name;
    }

### Setter de _name_
> Modifica el nombre de la playlist

    public setName(name: string): void {
        this.name = name;
    }

### Getter de _songs_
> Devuelve la lista de canciones

    public getSongs(): Song[] {
        return this.songs;
    }

### Setter de _songs_
> Añade una canción a la lista

    public setSongs(song: Song) {
        this.songs.push(song);
    }

### Getter de _duration_
> Devuelve la duración de la playlist

    public getDuration(): number {
        return this.duration;
    }

### Setter de _duration_
> Formatea la duración (segundos) en 'hh:mm:ss'

    private setDuration(seconds: number): string {
        let hour: number | string = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;

        let minute: number | string = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;

        let second: number | string = seconds % 60;
        second = (second < 10)? '0' + second : second;

        return hour + ':' + minute + ':' + second;
    }

### Getter de _genres_
> Devuelve los géneros musicales

    public getGenres(): Genre[] {
        return this.genres;
    }

### Setter de _genres_
> Añade un género musical a la lista

    public setGenres(genre: Genre): void {
        this.genres.push(genre);
    }

### print()
> Muestra por pantalla y devuelve como string la información de la playlist con un buen formato

    public print(): string {
        let output: string = `Playlist - ${this.name}`;

        output += `\nSongs: `;
        this.songs.forEach((s) => {
        output += `\n - ${s.getName()}`;
        });

        output += `\nDuration:` + this.setDuration(this.duration);

        output += `\nGenres: `;
        this.genres.forEach((g) => {
        output += `\n - ${g.getName()}`;
        });

        output += `\n------------\n`;

        console.log(output);
        return output;
    }

<br><br>

---
<br><br>
# MusicDataBase.json: Los libros de nuestra biblioteca
> _"Obtener información de internet es como intentar beber agua de una boca de incendios"_ ~ Mitchell Kapor

Suponiendo que nuestro software sirviese de base para el desarrollo de una plataforma musical, debemos preparnos para la abrumadora cantidad de información que podría llegar a tener que soportar. En el momento en el que se redacta este informe, Spotify ya cuenta con más de 70 millones de canciones. 

Nosotros, en un punto intermedio entre someter al sistema a una prueba de estrés, y al mismo tiempo tener que elaborar cada entrada de la base de datos a mano, elaboraremos los siguientes objetos con sus atributos y valores:

- **50**&emsp;canciones distintas _{ Song }_
- **10**&emsp;géneros musicales distintos _{ Genre }_
- **19**&emsp;grupos musicales _{ Group }_
- **103**&emsp;artistas musicales (tanto solistas como miembros de esos 19 grupos) _{ Artist }_
- **10**&emsp;álbumes musicales _{ Album }_
- **3**&emsp;playlists _{ Playlist }_

Todos y cada uno de los elementos previamente nombrados serán definidos en un JSON, para así poder gestionar, modificar, eliminar o añadir su contenido a través de nuestro programa (salvo en el caso de las playlists, como ya veremos más adelante).

🔗 [JSON: Base de Datos](./MusicDataBase.json)

Como puede observarse, en el fichero están preparados todos los objetos. Sin embargo, como debemos ajustarnos al formato JSON para almacenar la información, los tipos de los atributos deben ser tipos básicos. Por ello, y como ejemplo, aunque la idea sea gestionar la lista de canciones de un artista como un array instancias de _Song_ (cada _Song_ con sus atributos y métodos internos), a la hora de guardarlas en el fichero tendremos que representarlas mediante un array de _string_ (donde cada _string_ será el título de una canción).

Explicado de forma más visual:
- Forma del objeto **[Song]** con name = "Speed Demon"
    - Durante la gestión de la información:
        <br>{<br>
            &emsp;"name": "Speed Demon",<br>
            &emsp;"artists": **[Artist]**,<br>
            &emsp;"length": 270,<br>
            &emsp;"genres": **[[Genre], [Genre]]**,<br>
            &emsp;"plays": 3000000,<br>
            &emsp;"isSingle": false<br>
        }

    - Almacenado en la base de datos:
        <br>{<br>
            &emsp;"name": "Speed Demon",<br>
            &emsp;"artists": "Michael Jackson",<br>
            &emsp;"length": 270,<br>
            &emsp;"genres": ["Electronic", "Pop"],<br>
            &emsp;"plays": 3000000,<br>
            &emsp;"isSingle": false<br>
        }

Está claro, pues, que plasmar en el JSON los objetos de esta forma no nos traerá mayores inconvenientes. El primer desafío llega, sin embargo, cuando queremos recoger la información plasmada en el JSON y reconvertirla en instancias de nuestras clases _Song_, _Artist_, etc.

Un artista tiene una lista de canciones, pero a su vez cada una de esas canciones tendrá a ese artista como autor. ¿Qué instanciamos antes? ¿Qué atributos de cada clase puede inicializarse vacío? Para asegurarnos de que todo estaba bien atado, antes de seguir con el desarrollo del código tuvimos que responder esas preguntas.

Creamos así el orden en el que deben ser instanciadas las clases y qué atributos pueden empezar con un valor vacío (para ser rellenado poco después con alguna instancia posterior). 

He aquí dicho orden:

**[ Empezamos instanciando la clase Genre ]** . . . . . . . . . . . . . . . . . . . . . . .

1 ··· **Crear Genre**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Groups**&emsp;⟶&emsp;Empieza vacío
 - **Albums**&emsp;⟶&emsp;Empieza vacío
 - **Canciones**&emsp;⟶&emsp;Empieza vacío

2 ··· **Crear Artist**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Groups**&emsp;⟶&emsp;Empieza vacío
 - **Genres**&emsp;⟶&emsp;**Genre[]** (se añade el artista a **[Genre].groups**)
 - **Albums**&emsp;⟶&emsp;Empieza vacío
 - **Songs**&emsp;⟶&emsp;Empieza vacío
 - **Listeners**&emsp;⟶&emsp;**number** definido en JSON
 
3 ··· **Crear Group**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Members**&emsp;⟶&emsp;**Artist[]** (se añade el grupo a **[Artist].groups**)
 - **Date**&emsp;⟶&emsp;**string** definida en JSON
 - **Genres**&emsp;⟶&emsp;**Genre[]** (se añade el grupo a **[Genre].groups**)
 - **Albums**&emsp;⟶&emsp;Empieza vacío 
 - **Listeners**&emsp;⟶&emsp;**number** definido en JSON

4 ··· **Crear Song:**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Artists**&emsp;⟶&emsp;**Artist** (se añade la canción a **[Artist].songs**)
 - **Length**&emsp;⟶&emsp;**number** definido en JSON
 - **Genres**&emsp;⟶&emsp;**Genre[]** (se añade la cancion a **[Song].genres**)
 - **Plays**&emsp;⟶&emsp;**number** definido en JSON
 - **isSingle**&emsp;⟶&emsp;**boolean** definido en JSON

5 ··· **Crear Album:**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Author**&emsp;⟶&emsp;**Artist \| Group** (se añade el album a **[Artist].albums** o **Group.albums**)
 - **Date**&emsp;⟶&emsp;**string** definida en JSON 
 - **Genres**&emsp;⟶&emsp;**Genre[]** (se añade el album a **[Genre].albums**)
 - **Songs**&emsp;⟶&emsp;**Song[]**

6 ··· **Crear Playlist:**
 - **Nombre**&emsp;⟶&emsp;**string** definida en JSON
 - **Songs**&emsp;⟶&emsp;**Song[]**
 - **Duration**&emsp;⟶&emsp;**number** definido en JSON
 - **Genres**&emsp;⟶&emsp;**Genre[]**

. . . . . . . . . . . . . . . . . . . . . . . **[ Instancias generadas con éxito ]**

<br><br>

---
<br><br>
# La Base de Datos: Colocando los engranajes
> _“You can have data without information, but you cannot have information without data.”_ ~ Daniel Keys Moran

Teniendo diseñado el orden de instancia, la forma de cada elemento y el papel que jugará en el sistema, es el momento de ponerlo todo en orden y crear los primeros esbozos de nuestra base de datos.

## **Interfaz anyDatabase**

Del mismo modo que un arquitecto no empieza a construir un edificio sin antes haberlo puesto sobre el papel, nuestro primer paso será crear un boceto, un molde, del que más tarde podremos partir con la seguridad de que no se tambaleará nuestra construcción. 

Creamos así la interfaz AnyDatabase.

    interface anyDatabase {
        addToMemory(item: Song[] | Album[] | Genre[] | Group[] | Artist[]| Playlist[]): void;
        deleteFromMemory(item: string, type: string): void;
    }

Como puede observarse a simple vista, planteamos que cualquier base de datos musical debe contener los siguientes elementos para considerarse funcional:

- **addToMemory**&emsp;⟶&emsp;**Un método para añadir elementos a memoria** <br>Tenemos en cuenta todos y cada uno de los elementos definidos previamente:
    - Canciones _[Song]_
    - Álbumes _[Album]_
    - Géneros _[Genre]_
    - Grupos _[Group]_
    - Artistas _[Artist]_
    - Playlists _[Playlist]_
<br><br>

- **removeFromMemory**&emsp;⟶&emsp;**Un método para eliminar elementos de la memoria**<br>Se les pasará como argumentos el nombre del elemento que se desea eliminar acompañado del tipo del objeto, para poder operar correctamente en el interior de la función.
---
<br>

## **Clase Database**

    class Database implements anyDatabase {
        protected dbPlaylists: Playlist[] = [];
        constructor(
            protected songs: Song[] = [],
            protected artists: Artist[] = [],
            protected albums: Album[] = [],
            protected genres: Genre[] = [],
            protected groups: Group[] = [],
            protected playlists: Playlist[] = [],
        ) {}
        ∥ 
        ∥ Funciones
        ∥ 
    }

### ¿ _dbPlaylists ≠ playlists_ ?

Al leer el fragmento de código anterior, pueden surgir las siguientes cuestiones: ¿Qué es el atributo _dbPlaylists_? ¿En qué difiere del atributo _playlists_ declarado en el constructor? ¿Acaso almacenan información diferente?

A esta última pregunta, la respuesta más acertada sería un "a medias". Como uno de los puntos del enunciado de esta práctica consiste en lograr que solo puedan eliminarse o modificarse aquellas playlists creadas por el usuario, dejando fuera del alcance aquellas que ya estaban definidas previamente, debíamos encontrar una forma de diferenciar las playlists 'nuevas' de las playlists 'fijas'. Para ello, realizamos el siguiente proceso:
    
- Cargamos las playlists recogidas del fichero JSON en el atributo *dbPlaylists*
- Cargamos las playlists recogidas del fichero JSON en el atributo *playlists*
- Cuando un usuario crea una nueva playlist, la cargamos en el atributo *playlists* 

De esta forma, conseguimos que en el atributo *playlists* estén, como su nombre indica, todas las playlists de la base de datos. Por otro lado, en el atributo *dbPLaylists* estarán solo aquellas cargadas desde el fichero JSON, las consideras intocables. Así, cuando el usuario navegue por la terminal, o incluso dentro de los propios métodos de la gestión de la base de datos, podremos omitir aquellas playlists que se encuentren en el atributo *dbPlaylists*. De esta forma, nos aseguramos tenerlas a buen recaudo.


---
<br>

## Funciones de la clase Database

### addToMemory()
> Añade elementos a memoria

    addToMemory(item: (Song[] | Album[] | Genre[] | Group[] | Artist[] | Playlist[])): Promise<void> {
        return new Promise((resolve) => {
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
            if (item instanceof Playlist) {
                this.playlists.push(item);
            }
            });
            resolve();
        });
    }

Esta es una función sencilla. Recibe los elementos que se quieren almacenar en la memoria (nuestro objeto [Database]) y, según se haya recibido un array de instancias de una clase u otra, se realiza un push() de cada elemento de dicha array al atributo que corresponda. 

### getFromMemory()
> Recoge elementos de la memoria

    public async getFromMemory(item:string, type:string): Promise<(Song | Group | Artist | Album | Genre | Playlist)[]> {
        return new Promise((resolve) => {
        const dummy: (Song | Group | Artist | Album | Genre | Playlist)[] = [];
        if (type == 'Song') {
            if (item !== '$ALL$') {
            this.songs.forEach((value) => {
                if ('getName' in value && value.getName() === item) {
                console.log(value.getName());
                dummy.push(value);
                }
            });
            } else {
            resolve(this.songs);
            }
        }
        if (type == 'Album') {
            if (item !== '$ALL$') {
            this.albums.forEach((value) => {
                if ('getTitle' in value && value.getName() === item) {
                dummy.push(value);
                }
            });
            } else resolve(this.albums);
        }
        if (type == 'Genre') {
            if (item !== '$ALL$') {
            this.genres.forEach((value) => {
                if (value.getName() === item) {
                dummy.push(value);
                }
            });
            } else resolve(this.genres);
        }
        if (type == 'Group') {
            if (item !== '$ALL$') {
            this.groups.forEach((value) => {
                if (value.getName() === item) {
                dummy.push(value);
                }
            });
            } else resolve(this.groups);
        }
        if (type == 'Artist') {
            if (item !== '$ALL$') {
            this.artists.forEach((value) => {
                if (value.getName() === item) {
                dummy.push(value);
                }
            });
            } else resolve(this.artists);
        }
        if (type == 'Playlist') {
            switch (item) {
            case '$ALL$':
                resolve(this.playlists);
                break;
            case '$ONLYNEW$':
                this.playlists.forEach((value) => {
                if (!this.dbPlaylists.includes(value)) {
                    dummy.push(value);
                }
                });
                break;
            default:
                this.playlists.forEach((value) => {
                if (value.getName() === item) {
                    dummy.push(value);
                }
                });
                break;
            }
        }
        resolve(dummy);
        });
    }

Esta función recibe dos argumentos de tipo _string_ (_item_ y _type_). Expliquemos qué propósito cumple cada uno:
- item&emsp;⟶&emsp;Será el nombre del objeto que queramos buscar y recoger. Por ejemplo, si queremos recoger una canción almacenada en la memoria de título 'Scatman', buscaremos en el atributo _songs_ de nuestra base de datos e inyectaremos en la respuesta de la función (dummy) aquel objeto [Song] cuyo atributo _name_ contenga la string 'Scatman'.
    - \$ALL$&emsp;⟶&emsp;Existe la posibilidad de que no queramos recoger un solo elemento de la memoria, sino que por ejemplo queramos recoger todas las canciones, o todos los artistas. Para esto, hemos añadido la opción de que _item_ contenga esta string reservada. Si _item_ contiene '\$ALL$', entonces la respuesta de la función será el array completo de elementos del tipo indicado.
    - \$ONLYNEW$&emsp;⟶&emsp;Como se ha nombrado anteriormente, se ha planteado que solo deben poder ser modificadas o eliminadas las playlists creadas manualmente por el propio usuario durante la ejecución del programa, y no aquellas que ya venían definidas en un primer momento. Para ello, creamos esta segunda string reservada. Así, cuando queramos asegurarnos de que solo recogemos de memoria aquellas playlists creadas por el usuario, llamamos a la función con esta string especial, omitiendo así las playlists originales y recibiendo solo las nuevas.
- type&emsp;⟶&emsp;Para indicar que queremos recoger una canción, bastará con indicar 'song' como segundo argumento. Para recoger un álbum, se indicará 'album'. Y así, como es obvio, con el resto de elementos de nuestra base de datos. Con esto conseguimos focalizar la búsqueda desde un primer momento, facilitando además el desarrollo del código y haciéndolo más comprensible. 

<br>

### purgeMemory()
> Vacía la memoria

    public purgeMemory(): Promise<void> {
        return new Promise((resolve) => {
        this.songs = [];
        this.artists = [];
        this.albums = [];
        this.groups = [];
        this.genres = [];
        this.playlists = [];
        resolve();
        });
    }

*! Nótese que se vacían todos los atributos salvo dbPlaylists.*

<br>

### deleteFromMemory()
> Borra un elemento de la memoria

    public async deleteFromMemory(item: string, type:string): Promise<(Song | Group | Artist | Album | Genre | Playlist| undefined)> {
        return new Promise((resolve) => {
        let dummy:(Song | Group | Artist | Album | Genre | Playlist | undefined) = undefined;
        switch (type) {
            case 'Song':
            dummy = undefined;
            this.songs.forEach((song, index)=> {
                if (item === song.getName()) {
                this.songs.splice(index, 1);
                dummy = song;
                }
            });
            resolve(dummy);
            break;
            case 'Genre':
            dummy = undefined;
            this.genres.forEach((genre, index)=> {
                if (item === genre.getName()) {
                this.genres.splice(index, 1);
                dummy = genre;
                }
            });
            resolve(dummy);
            break;
            case 'Artist':
            dummy = undefined;
            this.artists.forEach((artist, index)=> {
                if (item === artist.getName()) {
                this.artists.splice(index, 1);
                dummy = artist;
                }
            });
            resolve(dummy);
            break;
            case 'Album':
            dummy = undefined;
            this.albums.forEach((album, index)=> {
                if (item === album.getName()) {
                this.albums.splice(index, 1);
                dummy = album;
                }
            });
            resolve(dummy);
            break;
            case 'Group':
            dummy = undefined;
            this.groups.forEach((group, index)=> {
                if (item === group.getName()) {
                this.groups.splice(index, 1);
                dummy = group;
                }
            });
            resolve(dummy);
            break;
        }
        });
    }

Siguiendo un razonamiento muy parecido al utilizado en la función getFromMemory(), en este caso una vez hayamos ubicado el elemento que buscamos realizaremos sobre el atributo que lo almacene un splice(). De esta forma, modificaremos la array almacenada por una versión casi idéntica a la anterior, ahora sin el elemento que queríamos borrar.

<br>

### printMemory()
> Muestra por pantalla el contenido de la memoria

    public printMemory(): void {
        let output: string = '';
        this.albums.forEach((album) => {
        output += album.print();
        });
        this.artists.forEach((artist) => {
        output += artist.print();
        });
        this.songs.forEach((song) => {
        output += song.print();
        });
        this.groups.forEach((group) => {
        output += group.print();
        });
        this.genres.forEach((genre) => {
        output += genre.print();
        });
        this.playlists.forEach((playlist) => {
        output += playlist.print();
        });
        output += `\x1b[30mTotal:\x1b[0m
        \x1b[32mNº Albums: \x1b[0m${this.albums.length}
        \x1b[34mNº Artists: \x1b[0m${this.artists.length}
        \x1b[33mNº Songs: \x1b[0m${this.songs.length}
        \x1b[36mNº Groups: \x1b[0m${this.groups.length}
        \x1b[35mNº Genres: \x1b[0m${this.genres.length}
        \x1b[31mNº Playlists: \x1b[0m${this.playlists.length}`;

        console.log(output);
    }

Intuitivamente, esta función hace un recorrido completo por todas y cada una de las arrays de la memoria (es decir, cada atributo de Database), e inserta en el ouput (string que contendrá el resultado total) cada resultado individual de la función print() de cada objeto. Es decir, recoge la información bien formateada de cada objeto de la memoria y lo reúne en una única string, que finalmente se muestra por pantalla.

<br>

### printBy()
> Muestra por pantalla un contenido específico, de una forma específica

    public printBy(command: viewCommands, mode: orderByCommands): Promise<void> {
        return new Promise<void>((resolve) => {
        if (mode === orderByCommands.Ascendantly) {
            switch (command) {
            case viewCommands.AlphabeticalSong:
                this.songs.sort((a, b) => a.getName().localeCompare(b.getName()));
                this.songs.forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewCommands.AlphabeticalAlbum:
                this.albums.sort((a, b) => a.getName().localeCompare(b.getName()));
                this.albums.forEach((album) => {
                console.log(album.print());
                });
                break;
            case viewCommands.OnlySingles:
                this.songs.forEach((song) => {
                if (song.getSingle() === true) {
                    console.log(song.print());
                }
                });
                break;
            case viewCommands.ReleaseDate:
                this.albums.sort((a, b) => a.getDate().localeCompare(b.getDate()));
                this.albums.forEach((album) => {
                console.log(album.print());
                });
                break;
            case viewCommands.ViewCount:
                this.songs.sort((a, b) => b.getPlays() - a.getPlays());
                this.songs.forEach((song) => {
                console.log(song.print());
                });
                break;
            }
        } else {
            switch (command) {
            case viewCommands.AlphabeticalSong:
                this.songs.sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
                this.songs.forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewCommands.AlphabeticalAlbum:
                this.albums.sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
                this.albums.forEach((album) => {
                console.log(album.print());
                });
                break;
            case viewCommands.OnlySingles:
                this.songs.forEach((song) => {
                if (song.getSingle() === true) {
                    console.log(song.print());
                }
                });
                break;
            case viewCommands.ReleaseDate:
                this.albums.sort((a, b) => a.getDate().localeCompare(b.getDate())).reverse();
                this.albums.forEach((album) => {
                console.log(album.print());
                });
                break;
            case viewCommands.ViewCount:
                this.songs.sort((a, b) => b.getPlays() - a.getPlays()).reverse();
                this.songs.forEach((song) => {
                console.log(song.print());
                });
                break;
            }
        }
        resolve();
        });
    }

Esta función, a diferencia de printMemory(), solamente muestra por pantalla la información de la base de datos concretamente solicitada. Y no solo eso, sino que la muestra de una forma u otra según se le indique. Para esto usaremos la sencilla estructura de un switch, donde encajaremos el comando (*command*) recibido como argumento en alguno de los *case* mostrados. Para ello, se han establecido todos los comandos posibles en distintos sets _enum_.

🔗 [Sets de comandos](./src/Commands.ts)

<br>

### printPlaylistBy()
> Muestra por pantalla el contenido de una playlist de una forma concreta

    public printPlaylistBy(command: viewPlaylistCommands, mode: orderByCommands): Promise<void> {
        let playlist: Playlist = this.playlists[0];
        return new Promise<void>((resolve) => {
        if (mode === orderByCommands.Ascendantly) {
            switch (command) {
            case viewPlaylistCommands.AlphabeticalSong:
                playlist.getSongs().sort((a, b) => a.getName().localeCompare(b.getName()));
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.AlphabeticalArtist:
                let playlistSongs: Song[] = playlist.getSongs();
                let songsMap: Map<Song, string> = new Map();
                playlistSongs.forEach((song) => {
                songsMap.set(song, song.getArtists().getName());
                });
                [...songsMap.entries()].sort((a, b) => a[1].localeCompare(b[1]));
                songsMap.forEach((string, song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.ViewDuration:
                playlist.getSongs().sort((a, b) => b.getLength() - a.getLength());
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.AlphabeticalGenre:
                playlist.getGenres().sort((a, b) => a.getName().localeCompare(b.getName()));
                playlist.getGenres().forEach((genre) => {
                console.log(genre.print());
                });
                break;
            case viewPlaylistCommands.ViewCount:
                playlist.getSongs().sort((a, b) => b.getPlays() - a.getPlays());
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            }
        } else {
            switch (command) {
            case viewPlaylistCommands.AlphabeticalSong:
                playlist.getSongs().sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.AlphabeticalArtist:
                let playlistSongs: Song[] = playlist.getSongs();
                let songsMap: Map<Song, string> = new Map();
                playlistSongs.forEach((song) => {
                songsMap.set(song, song.getArtists().getName());
                });
                [...songsMap.entries()].sort((a, b) => a[1].localeCompare(b[1])).reverse();
                songsMap.forEach((string, song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.ViewDuration:
                playlist.getSongs().sort((a, b) => b.getLength() - a.getLength()).reverse();
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            case viewPlaylistCommands.AlphabeticalGenre:
                playlist.getGenres().sort((a, b) => a.getName().localeCompare(b.getName())).reverse();
                playlist.getGenres().forEach((genre) => {
                console.log(genre.print());
                });
                break;
            case viewPlaylistCommands.ViewCount:
                playlist.getSongs().sort((a, b) => b.getPlays() - a.getPlays()).reverse();
                playlist.getSongs().forEach((song) => {
                console.log(song.print());
                });
                break;
            }
        }
        resolve();
        });
    }

De la misma forma que la función printBy() escoge el formato de la salida por pantalla para mostrar información de la memoria, esta función lo hace para, más en concreto, ordenar y mostrar la información de una playlist.

<br><br>

---
<br><br>
# Inmortalizando la Base de Datos: lowdb y JSON
> _“Without a systematic way to start and keep data clean, bad data will happen.”_ ~ Daniel Donato Diorio

Hasta ahora hemos explicado cómo funciona la base de datos en memoria. Ahora, es el momento de saber cómo enfrentarnos al momento en el que el usuario quiera almacenar esa información en un fichero que poder llevarse consigo o simplemente usarlo para una consulta completa de la base de datos entre ejecuciones. Para esto y para cargar, claro está, la información del fichero JSON en la memoria en el momento inicial. La encargada de conseguir esto será la clase JsonDatabase. 

    class JsonDatabase extends Database {

        private initialized: boolean = false;
        private changesSaved: boolean = true;
        private dbName: string = 'none';
        private database?: lowdb.LowdbSync<schemaType>;
        private static JsonDatabase: JsonDatabase;
        private constructor(private dbDir: string = '') {
            // Contenido del constructor
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

Como vemos, JsonDatabase extiende la funcionalidad de Database, hasta ahora solo capaz de manejarse en memoria, para lograr almacenar la información más allá de la ejecución del programa.

La clase tiene seis atributos. Expliquemos cada uno:
- initialized: boolean&emsp;⟶&emsp;Indica si la base de datos ya ha sido inicializada
- changesSaved: boolean&emsp;⟶&emsp;Indica si se han grabado los cambios en la base de datos
- dbName: string&emsp;⟶&emsp;Nombre de la base de datos
- database?: lowdb.LowdbSync<schemaType>&emsp;⟶&emsp;Para instanciar la lowdb utilizaremos el _schema_ declarado.
- private database?: lowdb.LowdbSync<schemaType>&emsp;⟶&emsp;Instancia de lowdb con la estructura de nuestra base de datos musical
- static JsonDatabase: JsonDatabase;&emsp;⟶&emsp;Para poder acceder a la clase en funciones de comprobación de inquirer, debemos trabajar con una clase singleton. Por esto creamos este atributo _static_ y declaramos como privado el constructor.

El _schema_ declarado para instanciar la lowdb debe contar con la misma estructura que la base de datos:

    type schemaType = {
        genres: Genre[],
        artists: Artist[],
        albums: Album[],
        songs: Song[],
        groups: Group[],
        playlists: Playlist[]
    }

---

## Funciones de la clase JsonDatabase

### Constructor

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
            this.dbPlaylists.push(newPlaylist);
            this.addToMemory([newPlaylist]);
            });

            this.initialized = true;
        }
        } else {
        this.initialized = false;
        }
    }

Este es el constructor de la clase JsonDatabase. A la hora de cargar la información del fichero JSON en memoria, se seguirá el orden de instancias que explicamos previamente (para evitar los conflictos de dependencias entre clases), y así iremos almacenando uno por uno los distintos tipos de elementos. Para hacerlo, usaremos la función de búsqueda que hemos desarrollado para encontrar y vincular aquellos objetos a partir del nombre del mismo. 

Para hacerlo más claro, un ejemplo:

Si queremos almacenar en memoria una canción y su artista autor, acudiendo a su información reflejada en el JSON, sabemos que existirá una entrada tanto para la canción como para el artista. Por lo tanto, podremos crear primero el artista (cargando sus atributos según nos indica el orden de instancia) y luego crear la canción de la misma manera. Y, al crear la canción, ¿qué artista de todos los que hemos generado colocamos como su autor? Pues buscamos al artista cuyo atributo *name* contenga el mismo valor que el indicado en el *name* de la entrada de la canción en el JSON.

<br>

### getJsonDatabaseInstance()
> Método para obtener la instancia única de la clase (clase singleton)

    public static getJsonDatabaseInstance(dbDir: string = ''): JsonDatabase {
        if (!JsonDatabase.JsonDatabase || dbDir !== '') {
            JsonDatabase.JsonDatabase = new JsonDatabase(dbDir);
        }
        return JsonDatabase.JsonDatabase;
    }

<br>

### setInitialized()
> Marca la base de datos como inicializada

    public setInitialized(value: boolean): void {
        JsonDatabase.JsonDatabase.initialized = value;
    }

<br>

### isInitialized()
> Indica si la base de datos está inicializada o no

    public isInitialized(): boolean {
        return JsonDatabase.JsonDatabase.initialized;
    }

<br>

### setter de changesSaved
> Marca si se se han guardado los cambios en la base de datos o no

    public setChangesSaved(value: boolean): void {
        JsonDatabase.JsonDatabase.changesSaved = value;
    }

### getter de changesSaved
> Devuelve si la base de datos está al día con todos los cambios realizados

    public areChangesSaved(): boolean {
        return JsonDatabase.JsonDatabase.changesSaved;
    }

### getter de dbName
> Devuelve el nombre de la base de datos

    public getDatabaseName():string {
        return this.dbName;
    }

### saveFromMemToDb()
> Guarda la información de la memoria en el fichero JSON

    public saveFromMemToDb(): Promise<unknown> {
        return new Promise((resolve) => {
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

Esta sería la función clave de este apartado, el eje en torno al que gira todo. Con ella, podemos al fin guardar aquello que el usuario ha realizado en memoria y dejarlo inmortalizado en el fichero JSON, la base de datos tangible. 

Pero, ¿cómo se hace? 

Para cada elemento que queramos almacenar en la base de datos, lo que haremos será crear un nuevo objeto con su misma forma, y le insertaremos en cada uno de los atributos los mismos valores que tenía el objeto original (esto es así porque necesitamos trabajar con [Object] para evitar errores de tipo). Una vez hecho este objeto clon, lo insertamos al array 'dummy' de su respectivo elemento (dummySong, dummyArtist, dummyGenre, etc.) y finalmente los escribimos en la base de datos mediante la función write().

<br>

### purgeDatabase()
> Vacía toda la información de la base de datos

    public purgeDatabase(): Promise<unknown> {
        return new Promise((resolve) => {
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

Esta función sobreescribe en cada tipo de elemento de la base de datos un array vacío, consiguiendo así vaciar por completo la información.

<br>

### print()
> Muestra por pantalla la información de la base de datos

    public print(): Promise<unknown> {
      return new Promise((resolve) => {
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

Realiza un console.log() al valor de cada tipo de elemento de la base de datos, es decir, muestra por pantalla la array de objetos que contiene.

<br><br>

---
<br><br>
# Terminal: Dándole el control al usuario
> _“Design isn’t finished until somebody is using it.”_ ~ Brenda Laurel

Hemos diseñado los planos, reunido todos los materiales y construido desde los cimientos hasta el techo, pero falta una última cosa: abrir las puertas y ventanas. Necesitamos una forma de ofrecerle al usuario el acceso a las herramientas que hemos elaborado, para que pueda cargar, manejar y guardar nueva información en una base de datos musical.

Para ello, usaremos inquirer, un paquete de npm que facilita la recepción de inputs a través de la consola. Con él, conseguiremos que el usuario pueda navegar entre todas y cada una de las opciones que ofrece nuestro programa, logrando una experiencia cerrada desde que inicie el sistema hasta que cierre la sesión, pudiendo por el camino haber guardado sus cambios en la base de datos (fichero JSON) o simplemente habiendo trabajado en memoria para realizar consultas.

Presentamos así la **clase Management.**

## Clase Management

    class Management {
        private database: JsonDatabase;

        constructor(private dbDir: string = '') {
            this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
        }
        ∥ 
        ∥ Funciones
        ∥ 
    }

Contiene dos atributos, la base de datos con la que el usuario trabajará [database] y una string cuyo valor será la dirección de la misma [dbDir] (el directorio donde se ubique el fichero JSON). En el constructor se hará uso del getter de instancia única de la clase JsonDatabase, pasándole como argumento la dirección del fichero para que este llegue a inicializar la lowdb.

## Funciones

<br>

### loadDatabase()
> Carga la base de datos

    private async loadDatabase(dbDir: string): Promise<JsonDatabase> {
        return new Promise((resolve, reject) => {
            this.dbDir = dbDir;
            this.database = JsonDatabase.getJsonDatabaseInstance(dbDir);
            this.database.setInitialized(true);
            resolve(this.database);
        });
    }

Esta función sirve para realziar "manualmente" lo que se haría de forma automática en el constructor. Además, marca la base de datos como inicializada a través del método _setInitialized()_ de la clase JsonDatabase.

<br>

### Getter de database

    private getDatabase(): JsonDatabase {
        return this.database;
    }

<br>

### orderByPrompt()
> Prompt de comandos para ordenar los elementos de una forma específica

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

Esta función sirve para canalizar las funciones printBy() y pintPlaylistBy() según corresponda, sirviendo para ser llamada en cada opción al desplegar el menú con todas las posibilidades. Además de redirigir los comandos a las respectivas funciones printBy, esta función se encarga de manejar el prompt posterior a la operación, permitiendo continuar navegando al usuario por las opciones del sistema.

<br>

### promptViewPlaylist()
> Despliega el menú para ordenar el contenido de una playlist de una forma específica

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

### promptPlaylist()
> Prompt para ver o gestionar una playlist

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

### promptView()
> Prompt para ordenar el contenido de la base de datos de una forma u otra.

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

<br>

### getStatusString()
> Informa sobre si la base de datos está actualizada con respecto a los cambios realizados en memoria.

    private getStatusString(): string {
        let statusString: string = '';
        if (!this.database.areChangesSaved()) {
        statusString += 'DB-UP2DATE: ' + '\x1b[31m' + '■ \x1b[0m';
        } else {
        statusString += 'DB-UP2DATE: ' + '\x1b[32m' + '■ \x1b[0m';
        }
        if (!this.database.isInitialized()) {
        statusString = 'DB-CHANGES: ' + '\x1b[31m' + '■ \x1b[0m' + 'DB-LOADED: ' + '\x1b[31m' + '■ \x1b[0m';
        } else {
        statusString += 'DB-LOADED ('+ (this.database.getDatabaseName()) + ') \x1b[32m' + '■ \x1b[0m';
        }
        return statusString;
    }

Con esta sencilla función podremos avisar en lo alto del prompt si la base de datos está actualizada, o si por el contrario se han realizado cambios en la memoria que no han sido guardados aún.

<br>

### promptStart()
> Comandos iniciales del sistema

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

Esta función hace que se muestren por consola las tres opciones principales al ejecutar el programa:

- **View**&emsp;⟶&emsp;Ver el contenido de la base de datos
- **Playlist**&emsp;⟶&emsp;Accede al prompt que permite ver y manejar las playlists
- **Management**&emsp;⟶&emsp;Menú de gestión (añadir, cambiar, eliminar...) 

<br>

### continuePrompt()
> Reanuda el prompt luego de terminar cualquier operación

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

<br>

### loadDbPrompt()
> Prompt para cargar la base de datos

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

Se solicita al usuario la dirección del fichero .json donde se encuentre la base de datos para así poder ubicarlo y cargarlo en memoria.

<br>

### selectTypePrompt()
> Menú para escoger con qué tipo de elemento se quiere trabajar

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

Antes de poder añadir una canción a algún artista, o un miembro a un grupo, el programa te pregunta lo más básico: ¿sobre qué tipo de elemento vamos a trabajar? Aquí, es donde el usuario indica si quiere navegar por las opciones de edición, adición o eliminación de alguna canción, album, género, artista o grupo.

<br>

### addPrompt()
> Prompt para añadir un nuevo elemento en la base de datos

    private async addPrompt(command: string): Promise<void> {
        const qName: Question = new Question('input', 'name', 'Write the name/title', this.noEmptyOption);
        const qArtist: Question = new Question('search-list', 'selectedArtist', 'Select the artist name or group', this.noEmptyChoice, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
        const qMember: Question = new Question('search-list', 'members', 'Write the members of the group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
        const qLength: Question = new Question('input', 'length', 'Write the length', this.noEmptyOption);
        const qGenres: Question = new Question('search-list', 'selectedGenre', 'Select the genre', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Genre'))).map((o) => o.name));
        const qReleaseDate: Question = new Question('input', 'date', 'Write the release date', this.noEmptyOption);
        const qSongs: Question = new Question('search-list', 'songs', 'Write the songs that are part of this item', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name));
        const qAlbums: Question = new Question('search-list', 'albums', 'Write the albums that this item is part of', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Album'))).map((o) => o.name));
        const qListeners: Question = new Question('input', 'listeners', 'Write the ammount of listeners of this artist', this.noEmptyOption);
        const qPlays: Question = new Question('input', 'plays', 'Write the number of plays', this.noEmptyOption);
        const qSingle: Object = {
        name: 'isSingle',
        type: 'confirm',
        message: 'It is a single?',
        };
        const songQuestions = [qName.returnQuestion(true), qArtist.returnQuestion(true, true),
        qLength.returnQuestion(true), qPlays.returnQuestion(true), qSingle];

        return new Promise(async (resolve, reject) => {
        console.log('------Musitronic360------ \n');
        console.log('Adding ' + command + '\n');
        switch (command) {
            case 'Song':
            await inquirer.prompt(songQuestions).then(async (answers) => {
                let inputs: {selectedGenre: string}[];
                inputs = await this.continueAdding(qGenres);
                let selectedArtist: Artist | Group = this.database.searchByName(answers['selectedArtist'], 'author') as Artist | Group;
                let selectedGenres: Genre[] = [];
                inputs.forEach((genre)=> {
                let dummy: Genre = (this.database.searchByName(genre.selectedGenre, 'genre') as Genre[])[0];
                if (!selectedGenres.includes(dummy)) {
                    selectedGenres.push(dummy);
                }
                });
                let newSong: Song = new Song(answers['name'], selectedArtist, answers['length'], selectedGenres, answers['plays'], answers['isSingle']);
                selectedGenres.forEach((genre) =>{
                genre.setSongs(newSong);
                });
                if (selectedArtist instanceof Artist) {
                selectedArtist.setSongs(newSong);
                }
                this.database.addToMemory([newSong]);
            });
            break;
            case 'Genre':
            const qArtist: Question = new Question('search-list', 'selectedArtist', 'Select the artist name or group (can be none [#$CONTINUE$#])', () => {}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name)));
            const qAlbums: Question = new Question('search-list', 'selectedAlbums', 'Select the albums that this item is part of (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Album'))).map((o) => o.name)));
            const qSongs: Question = new Question('search-list', 'selectedSongs', 'Select the songs that are part of this item (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name)));
            await inquirer.prompt(qName.returnQuestion(true)).then(async (answers) => {
                let artistInputs: {selectedArtist: string}[];
                let selectedArtists: (Group | Artist)[] = [];
                artistInputs = await this.continueAdding(qArtist);
                artistInputs.forEach((artist)=> {
                if (artist.selectedArtist !== '#$CONTINUE$#') {
                    let dummy: Group | Artist = (this.database.searchByName(artist.selectedArtist, 'author') as (Group | Artist)[])[0];
                    if (!selectedArtists.includes(dummy)) {
                    selectedArtists.push(dummy);
                    }
                }
                });
                let albumsInputs: {selectedAlbums: string}[];
                let selectedAlbums: Album[] = [];
                albumsInputs = await this.continueAdding(qAlbums);
                albumsInputs.forEach((album)=> {
                if (album.selectedAlbums !== '#$CONTINUE$#') {
                    let dummy: Album = (this.database.searchByName(album.selectedAlbums, 'album') as Album[])[0];
                    if (!selectedAlbums.includes(dummy)) {
                    selectedAlbums.push(dummy);
                    }
                }
                });
                let songsInputs: {selectedSongs: string}[];
                let selectedSongs: Song[] = [];
                songsInputs = await this.continueAdding(qSongs);
                songsInputs.forEach((song)=> {
                if (song.selectedSongs !== '#$CONTINUE$#') {
                    let dummy: Song = (this.database.searchByName(song.selectedSongs, 'song') as Song[])[0];
                    if (!selectedSongs.includes(dummy)) {
                    selectedSongs.push(dummy);
                    }
                }
                });
                let newGenre: Genre = new Genre(answers['name'], selectedArtists, selectedAlbums, selectedSongs);
                selectedArtists.forEach((artist)=> {
                artist.setGenres(newGenre);
                });
                selectedAlbums.forEach((album)=> {
                album.addGenres([newGenre]);
                });
                selectedSongs.forEach((song)=> {
                song.setGenres(newGenre);
                });
                this.database.addToMemory([newGenre]);
                newGenre.print();
            });
            await this.continuePrompt();
            break;
            case 'Album':
            const qArtist2: Question = new Question('search-list', 'selectedArtist', 'Select the artist name or group', this.noEmptyChoice, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
            const qGenres2: Question = new Question('search-list', 'selectedGenres', 'Select the genre', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Genre'))).map((o) => o.name));
            const qSongs2: Question = new Question('search-list', 'selectedSongs', 'Select the songs that are part of this item', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name));
            await inquirer.prompt([qName.returnQuestion(true), qArtist2.returnQuestion(false, true), qReleaseDate.returnQuestion(true)]).then(async (answers) => {
                let selectedArtist: (Group | Artist) = ((this.database.searchByName(answers['selectedArtist'], 'author') as (Group | Artist)));
                let genresInputs: {selectedGenres: string}[];
                let selectedGenres: Genre[] = [];
                genresInputs = await this.continueAdding(qGenres2);
                genresInputs.forEach((genre)=> {
                if (genre.selectedGenres !== '#$CONTINUE$#') {
                    let dummy: Genre = (this.database.searchByName(genre.selectedGenres, 'genre') as Genre[])[0];
                    if (!selectedGenres.includes(dummy)) {
                    selectedGenres.push(dummy);
                    }
                }
                });
                let songsInputs: {selectedSongs: string}[];
                let selectedSongs: Song[] = [];
                songsInputs = await this.continueAdding(qSongs2);
                songsInputs.forEach((song)=> {
                if (song.selectedSongs !== '#$CONTINUE$#') {
                    let dummy: Song = (this.database.searchByName(song.selectedSongs, 'song') as Song[])[0];
                    if (!selectedSongs.includes(dummy)) {
                    selectedSongs.push(dummy);
                    }
                }
                });
                let newAlbum: Album = new Album(answers['name'], selectedArtist, answers['date'], selectedGenres, selectedSongs);

                selectedArtist.setAlbums(newAlbum);
                selectedGenres.forEach((genre)=> {
                console.log(genre);
                genre.setAlbums(newAlbum);
                });
                this.database.addToMemory([newAlbum]);
                newAlbum.print();
                resolve();
            });
            await this.continuePrompt();
            break;
            case 'Artist':
            const qGroup3: Question = new Question('search-list', 'selectedGroup', 'Select the group (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Group'))).map((o) => o.name)));
            const qGenres3: Question = new Question('search-list', 'selectedGenre', 'Select the genre', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Genre'))).map((o) => o.name));
            const qAlbums3: Question = new Question('search-list', 'selectedAlbum', 'Select the albums that this item is part of (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Album'))).map((o) => o.name)));
            const qSongs3: Question = new Question('search-list', 'selectedSong', 'Select the songs that are part of this item (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name)));
            await inquirer.prompt([qName.returnQuestion(true), qListeners.returnQuestion(true)]).then(async (answers) => {
                let groupsInputs: {selectedGroup: string}[];
                let selectedGroups: Group[] = [];
                groupsInputs = await this.continueAdding(qGroup3);
                let genresInputs: {selectedGenre: string}[];
                let selectedGenres: Genre[] = [];
                genresInputs = await this.continueAdding(qGenres3);
                let albumsInputs: {selectedAlbum: string}[];
                let selectedAlbums: Album[] = [];
                albumsInputs = await this.continueAdding(qAlbums3);
                let songsInputs: {selectedSong: string}[];
                let selectedSongs: Song[] = [];
                songsInputs = await this.continueAdding(qSongs3);
                groupsInputs.forEach((group)=>{
                if (group.selectedGroup !== '#$CONTINUE$#') {
                    let dummy: Group = (this.database.searchByName(group.selectedGroup, 'group') as Group[])[0];
                    if (!selectedGroups.includes(dummy)) {
                    selectedGroups.push(dummy);
                    }
                }
                });
                genresInputs.forEach((genre)=> {
                let dummy: Genre = (this.database.searchByName(genre.selectedGenre, 'genre') as Genre[])[0];
                if (!selectedGenres.includes(dummy)) {
                    selectedGenres.push(dummy);
                }
                });
                albumsInputs.forEach((album)=>{
                if (album.selectedAlbum !== '#$CONTINUE$#') {
                    let dummy: Album = (this.database.searchByName(album.selectedAlbum, 'album') as Album[])[0];
                    if (!selectedAlbums.includes(dummy)) {
                    selectedAlbums.push(dummy);
                    }
                }
                });
                songsInputs.forEach((song)=>{
                if (song.selectedSong !== '#$CONTINUE$#') {
                    let dummy: Song = (this.database.searchByName(song.selectedSong, 'song') as Song[])[0];
                    if (!selectedSongs.includes(dummy)) {
                    selectedSongs.push(dummy);
                    }
                }
                });
                let newArtist: Artist = new Artist(answers['name'], selectedGroups, selectedGenres, selectedAlbums, selectedSongs, answers['listeners'] );
                selectedGroups.forEach((group) =>{
                group.setMembers(newArtist);
                });
                selectedGenres.forEach((genre) =>{
                genre.setAuthors(newArtist);
                });
                selectedAlbums.forEach((album) =>{
                album.setAuthor(newArtist);
                });
                selectedSongs.forEach((song) =>{
                song.setArtists(newArtist);
                });
                this.database.addToMemory([newArtist]);
            });
            break;
            case 'Group':
            const qMember4: Question = new Question('search-list', 'selectedMember', 'Select the members of the group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
            const qGenres4: Question = new Question('search-list', 'selectedGenre', 'Select the genre', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Genre'))).map((o) => o.name));
            const qAlbums4: Question = new Question('search-list', 'selectedAlbum', 'Select the albums that this item is part of (can be none [#$CONTINUE$#])', () =>{}, ['#$CONTINUE$#'].concat((await (this.database.getFromMemory('$ALL$', 'Album'))).map((o) => o.name)));
            await inquirer.prompt([qName.returnQuestion(true), qReleaseDate.returnQuestion(true), qListeners.returnQuestion(true)]).then(async (answers) => {
                let membersInputs: {selectedMember: string}[];
                let selectedMembers: Artist[] = [];
                membersInputs = await this.continueAdding(qMember4);
                let genresInputs: {selectedGenre: string}[];
                let selectedGenres: Genre[] = [];
                genresInputs = await this.continueAdding(qGenres4);
                let albumsInputs: {selectedAlbum: string}[];
                let selectedAlbums: Album[] = [];
                albumsInputs = await this.continueAdding(qAlbums4);
                membersInputs.forEach((artist)=>{
                let dummy: Artist = (this.database.searchByName(artist.selectedMember, 'artist') as Artist[])[0];
                if (!selectedMembers.includes(dummy)) {
                    selectedMembers.push(dummy);
                }
                });
                genresInputs.forEach((genre)=> {
                let dummy: Genre = (this.database.searchByName(genre.selectedGenre, 'genre') as Genre[])[0];
                if (!selectedGenres.includes(dummy)) {
                    selectedGenres.push(dummy);
                }
                });
                albumsInputs.forEach((album)=>{
                if (album.selectedAlbum !== '#$CONTINUE$#') {
                    let dummy: Album = (this.database.searchByName(album.selectedAlbum, 'album') as Album[])[0];
                    if (!selectedAlbums.includes(dummy)) {
                    selectedAlbums.push(dummy);
                    }
                }
                });
                let newGroup: Group = new Group(answers['name'], selectedMembers, answers['date'], selectedGenres, selectedAlbums, answers['listeners'] );
                selectedMembers.forEach((artist) =>{
                artist.setGroups(newGroup);
                });
                selectedGenres.forEach((genre) =>{
                genre.setAuthors(newGroup);
                });
                selectedAlbums.forEach((album) =>{
                album.setAuthor(newGroup);
                });
                this.database.addToMemory([newGroup]);
            });
            break;

            case 'Playlist':
            await inquirer.prompt(qName.returnQuestion()).then(async (answers) => {
                const qSongs: Question = new Question('search-list', 'songs', 'Write the songs that are part of this item', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name));
                let inputs: {songs: string}[];
                inputs = await this.continueAdding(qSongs);
                let selectedSongs: Song[] = [];
                inputs.forEach((song) => {
                let dummy: Song = (this.database.searchByName(song.songs, 'song') as Song[])[0];
                if (!selectedSongs.includes(dummy)) {
                    selectedSongs.push(dummy);
                }
                });
                let newPlaylist: Playlist = new Playlist(answers['name'], selectedSongs, 0, []);
                this.database.addToMemory([newPlaylist]);
            });
            break;
        }
        this.database.updatePlaylists();
        if (this.database.isInitialized()) {
            this.database.setChangesSaved(false);
        }
        resolve();
        });
    }

En lugar de crear una función de adición para cada tipo de objeto, decidimos crear una función única a la que se le indique mediante un argumento qué tipo de objeto se va a crear. Así podremos aprovechar que la operación de adición para todos los objetos es bastante similar y ahorraremos bastantes líneas de código redundante.

El proceso es sencillo, si por ejemplo indicamos a través del argumento que queremos añadir una canción, este comando se evaluará en el switch y accederá al case 'Song', donde se generará un nuevo [Song] con los datos indicados por el usuario.

Estos datos, serán dados mediante preguntas y respuestas. Esto se podría haber implementado directamente en la función, pero habría aumentado notable e innecesariamente la complejidad del código. Para eso, decidimos crear una nueva clase: Question

🔗 [Question.ts](./src/Question.ts)

Esta sirve de abstracción en el manejo de preguntas y respuestas, pudiendo escoger mediante booleanos ciertos rasgos como la presencia o ausencia de opciones entre las que escoger (choices).

Por ejemplo, al crear una canción se le preguntará al usuario por los géneros musicales de la misma, y este responderá con los correspondientes. Estos serán colocados en una variable para más tarde formar parte del constructor de la canción generada. Se hará lo mismo para el resto de atributos de la clase a instanciar.

Además, al realizar esta operación, y el resto de operaciones que hagan diferir la base de datos de memoria de la registrada en el fichero JSON, marcamos el atributo _changesSaved_ del [JsonDatabase] como falso (mediante la función setChangesSaved() que explicamos con anterioridad).

Por último, y también con cada cambio que realicemos (addPrompt(), modifyPrompt() o promptDelete()), se actualizarán las playlists mediante la función updatePlaylists(). Esto es porque, si por ejemplo borramos una canción de la base de datos, tendrá que verse reflejado en aquellas playlists a las que pertenecía.

<br>

### modifyPrompt()
> Prompt para modificar un elemento de la base de datos

    private async modifyPrompt(command: string): Promise<void> {
        const qName: Question = new Question('input', 'name', 'Write the name/title');
        const qArtist: Question = new Question('search-list', 'selectedArtist', 'Select the artist name or group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Artist'))).map((o) => o.name));
        const qMember: Question = new Question('search-list', 'members', 'Write the members of the group', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Group'))).map((o) => o.name));
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
        qLength.returnQuestion(), qGenres.returnQuestion(true, true)];
        const albumQuestions = [qName.returnQuestion(),
        qArtist.returnQuestion(false, true), qReleaseDate.returnQuestion(), qGenres.returnQuestion(false, true), qSongs.returnQuestion(false, true)];
        const artistQuestions = [qName.returnQuestion(),
        qMember.returnQuestion(false, true), qGenres.returnQuestion(false, true),
        qAlbums.returnQuestion(false, true), qSongs.returnQuestion(false, true), qListeners.returnQuestion()];
        const groupQuestions = [qName.returnQuestion(), qArtist.returnQuestion(false, true),
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
            if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
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
                    selectedSongs = this.database.searchByName(answers['discernedSong'], 'song') as Song[];
                    });
                }
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
                resolve();
                });
            }
            break;
            case 'Genre':
            if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
                await inquirer.prompt(genreChoice.returnQuestion(false, true)).then(async (answers) => {
                let selectedGenres: Genre[] = this.database.searchByName(answers['genreChoice'], 'genre') as Genre[];
                let selectedGenre: Genre = selectedGenres[0];
                selectedGenre.print();
                await inquirer.prompt(genreQuestions).then(async (answers) => {
                    selectedGenre.setName(answers['name']);
                    let artistsGroupsRemoved: (Group | Artist)[] = selectedGenre.getAuthors();
                    let artistGroupCopy: (Group | Artist) = this.database.searchByName(answers['selectedArtist'], 'author') as (Artist | Group);
                    console.log(artistGroupCopy);
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
                    if (artistGroupCopy instanceof Artist) {
                    artistGroupCopy.setGenres(selectedGenre);
                    }
                    if (artistGroupCopy instanceof Group) {
                    artistGroupCopy.addGenres([selectedGenre]);
                    }
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
            }
            break;
            case 'Album':
            if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
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
            }
            break;
            case 'Artist':
            if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
                await inquirer.prompt(artistChoice.returnQuestion(false, true)).then(async (answers) => {
                let result: Artist[] = this.database.searchByName(answers['artistChoice'], 'artist') as Artist[];
                let selectedArtist: Artist = result[0];
                selectedArtist.print();
                await inquirer.prompt(artistQuestions).then(async (answers) => {
                    selectedArtist.setName(answers['name']);

                    let groups2Removed: Group[] = selectedArtist.getGroups();
                    let groups2Copy: Group[] = this.database.searchByName(answers['members'], 'group') as Group[];
                    await this.continuePrompt();
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
                    selectedArtist.setGroups(groups2Copy[0]);
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
            }
            break;
            case 'Group':
            if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
                await inquirer.prompt(groupChoice.returnQuestion(false, true)).then(async (answers) => {
                let selectedGroup: Group[] = this.database.searchByName(answers['groupChoice'], 'group') as Group[];
                if (selectedGroup instanceof Array) {
                    selectedGroup[0].print();
                }
                await inquirer.prompt(groupQuestions).then(async (answers) => {
                    selectedGroup[0].setName(answers['name']);

                    let artist4Removed: Artist[] = selectedGroup[0].getMembers();
                    let artist4Copy: Artist[] = this.database.searchByName(answers['selectedArtist'], 'artist') as Artist[];
                    selectedGroup[0].replaceMembers(this.database.searchByName(answers['selectedArtist'], 'artist') as Artist[]);
                    artist4Removed.forEach((artist)=>{
                    artist.getGroups().forEach((group, index)=>{
                        if (group === selectedGroup[0]) {
                        group.getMembers().splice(index, 1);
                        }
                    });
                    });
                    artist4Copy.forEach((artist) =>{
                    artist.getGroups().push(selectedGroup[0]);
                    });
                    selectedGroup[0].setDate(answers['date']);

                    let genres4Removed: Genre[] = selectedGroup[0].getGenres();
                    let genres4Copy: Genre[] = this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[];
                    selectedGroup[0].replaceGenres(this.database.searchByName(answers['selectedGenre'], 'genre') as Genre[]);

                    genres4Removed.forEach((genre) => {
                    genre.getAuthors().forEach((author, index)=>{
                        if (author === selectedGroup[0]) {
                        genre.getAuthors().splice(index, 1);
                        }
                    });
                    });
                    genres4Copy.forEach((genre) => {
                    genre.getAuthors().push(selectedGroup[0]);
                    });

                    let albums4Removed: Album[] = selectedGroup[0].getAlbums();
                    let albums4Copy: Album[] = this.database.searchByName(answers['selectedAlbum'], 'album') as Album[];
                    selectedGroup[0].replaceAlbums((this.database.searchByName(answers['selectedAlbum'], 'album') as Album[]));

                    albums4Copy.forEach((album) => {
                    album.setAuthor(selectedGroup[0]);
                    });
                    selectedGroup[0].setListeners(answers['listeners']);
                    resolve();
                });
                resolve();
                });
            }
            break;

            case 'Playlist':
            if ((await (this.database.getFromMemory('$ONLYNEW$', command))).map((o) => o.name).length == 0) {
                console.log('There are no ' + command + ' to modify');
                await this.continuePrompt();
            } else {
                await inquirer.prompt(playlistChoice.returnQuestion(false, true)).then(async (answers) => {
                let selectedPlaylist: Playlist = (this.database.searchByName(answers['playlistChoice'], 'playlist') as Playlist[])[0];
                selectedPlaylist.print();
                await inquirer.prompt(qName.returnQuestion()).then(async (answers) => {
                    selectedPlaylist.setName(answers['name']);
                    const qSongs: Question = new Question('search-list', 'songs', 'Write the songs that are part of this item', () =>{}, (await (this.database.getFromMemory('$ALL$', 'Song'))).map((o) => o.name));
                    let inputs: {songs: string}[];
                    inputs = await this.continueAdding(qSongs);
                    let selectedSongs: Song[] = [];
                    inputs.forEach((song)=>{
                    selectedSongs.push((this.database.searchByName(song.songs, 'song') as Song[])[0]);
                    console.log(song);
                    });
                    selectedPlaylist.getSongs().splice(0, selectedPlaylist.getSongs().length);
                    selectedSongs.forEach((song) => {
                    if (!selectedPlaylist.getSongs().includes(song)) {
                        selectedPlaylist.setSongs(song);
                    }
                    });
                    selectedPlaylist.updateGenres();
                    selectedPlaylist.updateDuration();
                });
                });
            }
            break;
        }
        this.database.updatePlaylists();
        if (this.database.isInitialized()) {
            this.database.setChangesSaved(false);
        }
        resolve();
        });
  }

Esta función sigue el mismo razonamiento que addPrompt(), salvo que en este caso se localizará el tipo de elemento, luego el elemento en concreto (a través de su nombre), y en cada caso concreto se invocará a una función u otra dependiendo de lo que el usuario haya solicitado modificar a través de las preguntas presentadas. En ese último paso, será cuestión de llamar a los distintos setters de cada clase para modificar sus atributos internos.

<br>

### promptDelete()
> Prompt para eliminar un elemento de la base de datos

    private async promptDelete(command: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      console.log('------Musitronic360------ \n');
      console.log('Deleting ' + command+'\n');
      // console.log((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name));
      switch (command) {
        case 'Song':
          if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
        case 'Genre':
          if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
        case 'Album':
          if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
        case 'Artist':
          if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
        case 'Group':
          if ((await (this.database.getFromMemory('$ALL$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
        case 'Playlist':
          if ((await (this.database.getFromMemory('$ONLYNEW$', command))).map((o) => o.name).length == 0) {
            console.log('There are no ' + command + ' to delete');
            await this.continuePrompt();
          } else {
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
          }
          break;
      }
      this.database.updatePlaylists();
      if (this.database.isInitialized()) {
        this.database.setChangesSaved(false);
      }
      resolve();
    });
  }

Al igual que las dos funciones anteriores (añadir y modificar), se le preguntará al usuario qué objeto quiere borrar a través de preguntas (solo hará falta una, pues no se trabajará con el resto de atributos, solo se pretende borrar el objeto completo). 

Aquí debemos tener en cuenta lo siguiente. Para borrar correctamente un elemento de la base de datos no basta con eliminar su entrada específica, sino que también deben borrarse las referencias al mismo. Por ejemplo, si borramos un grupo no solo habrá que borrar su correspondiente objeto [Group], sino que habrá que eliminarlo de la lista de grupos de los [Artist] que sean miembros y de los [Genre] que tengan dicho grupo en su lista.

Habrá, no obstante, algunos elementos que no podremos eliminar. Por ejemplo, no podremos eliminar el autor de una canción, pues es ilógica esta operación. Si se intenta, saldrá un mensaje avisando de que antes deberá borrarse la canción, y luego podrá eliminarse al artista. Otra alternativa a esto sería implementar algún borrado recursivo, o cualquier técnica que, al intentar borrar un artista, borre primero todas sus canciones y finalmente borre el propio objeto [Artist] (y se haría del mismo modo para situaciones similares con otros elementos vinculados entre sí).

<br>

### promptManagement()
> Prompt para las distintas opciones de gestión de la base de datos

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

<br>

### promptPlaylistManagement()
> Prompt para la gestión de una playlist

    private promptPlaylistManagement(): void {
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

<br><br>

---
<br><br>
# Conclusión: Que suene la música
> _"Music is the universal language of mankind."_ ~ Henry Wadsworth Longfellow

Llegados a este punto, el sistema funciona correctamente. Teníamos un desafío, digitalizar una colección musical, y hemos explicado cada una de las baldosas del camino que nos ha llevado desde los bocetos iniciales hasta tener un software operativo.

Desde el diseño de las clases básicas para representar los distintos elementos de la base de datos, hasta el esqueleto de la base de datos en sí. Las funciones de gestión, de ordenación, los sistemas de preguntas y respuestas. El uso de lowdb para permitir unir los datos generados en memoria con algo más tangible y duradero como es un fichero JSON. El empleo de inquirer para darle el control del sistema al usuario, y entre medias el desarrollo de distintas soluciones que han permitido sortear los variados errores que surgen en cualquier ejercicio de programación.

Ahora, con todos los engranajes bien colocados, la máquina operativa y habiendo comprobado su correcto funcionamiento, solo quedaría mejorarla y ampliar sus horizontes hasta tener la versión perfecta (o casi perfecta) de aquella idea que nació en lápiz y papel. 

Pero, como eso es un camino sin final y debemos ajustarnos al plazo que se nos ha dado para el desarrollo, nos satisface presentar esta primera versión funcional de nuestro programa, Musitronic360.

Descarga el código, compílalo y ejecútalo. Utiliza nuestro programa y haz realidad tu propia colección musical digital. Una vez lo hayas hecho, podremos considerar finalizado nuestro trabajo.

Solo nos queda alzar la batuta y despedir este informe con un último __*¡Música maestro!*__

· Mario, Marco y Jonay
<br>
~ Grupo R
