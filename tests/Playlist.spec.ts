import 'mocha';
import {expect} from 'chai';
import { Song } from '../src/models/Song';
import { Genre } from '../src/models/Genre';
import { Playlist } from '../src/models/Playlist';
import { Group } from '../src/models/Group';

describe('Playlist class test', () => {
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Pop2 = new Genre('Pop2', [], [], []);
  const Besos = new Song('Besos', elCantoDelLoco, 4, [], 150, true);
  const Besos2 = new Song('Besos2', elCantoDelLoco, 4, [Pop2, Pop2], 150, true);
  const Anitos = new Song('16 añitos', elCantoDelLoco, 4.13, [], 17020329, false);
  const Pop = new Genre('Pop', [], [], [Besos, Anitos]);
  const Anitos2 = new Song('Anitos2', elCantoDelLoco, 4, [Pop], 150, true);
  const Sera = new Song('Será', elCantoDelLoco, 180, [Pop], 150, true);
  const Rock = new Genre('Rock', [], [], [Sera]);
  const playlist = new Playlist('Mi playlist', [Besos, Anitos], 3600, [Pop]);
  const playlist2 = new Playlist('Mi playlist', [Besos2, Anitos2], 3600, [Pop, Pop]);

  describe('Playlist Class', () => {
    it('Playlist object creation ', () => {
      expect(new Playlist('Mi playlist', [Besos, Anitos], 3600, [Pop])).not.to.be.eql(null);
    });
  });

  describe('Getters of Playlist Class', () => {
    it('Checking getName()', () => {
      expect(playlist.getName()).to.be.eql('Mi playlist');
    });

    it('Checking getSongs()', () => {
      expect(playlist.getSongs()).eql([Besos, Anitos]);
    });

    it('Checking getDuration()', () => {
      expect(playlist.getDuration()).to.be.eql(3600);
    });

    it('Checking getGenres()', () => {
      expect(playlist.getGenres()).to.be.eql([Pop]);
    });
  });

  describe('Setters of Playlist Class', () => {
    it('Checking setName()', () => {
      playlist.setName('Mi Super Playlist');
      expect(playlist.getName()).to.be.eql('Mi Super Playlist');
    });

    it('Checking setSongs()', () => {
      playlist.setSongs(Sera);
      expect(playlist.getSongs()).eql([Besos, Anitos, Sera]);
    });

    it('Checking updateDuration()', () => {
      playlist.updateDuration();
      expect(playlist.getDuration()).eql(188.13);
    });

    it('Checking updateGenres()', () => {
      playlist2.updateGenres();
      expect(playlist2.getGenres()).to.be.eql([Pop2, Pop]);
    });

    it('Checking setGenres()', () => {
      playlist.setGenres(Rock);
      expect(playlist.getGenres()).to.be.eql([Pop, Rock]);
    });
    it('Checking printDuration()', () => {
      expect(playlist.printDuration(1231412)).to.be.a('string');
      expect(playlist.printDuration(128192)).to.be.a('string');
    });
  });

  describe('Print of Playlist Class', () => {
    expect(playlist.print()).to.be.a('string');
  });
});
