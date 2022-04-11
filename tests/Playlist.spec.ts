import 'mocha';
import {expect} from 'chai';
import { Song } from '../src/Song';
import { Genre } from '../src/Genre';
import { Playlist } from '../src/Playlist';
import { Group } from '../src/Group';

describe('Playlist class test', () => {
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Besos = new Song('Besos', elCantoDelLoco, 4, [], 150, true);
  const Anitos = new Song('16 añitos', elCantoDelLoco, 4.13, [], 17020329, false);
  const Pop = new Genre('playlist', [], [], [Besos, Anitos]);
  const Sera = new Song('Será', elCantoDelLoco, 180, [Pop], 150, true);
  const Rock = new Genre('Rock', [], [], [Sera]);
  const playlist = new Playlist('Mi playlist', [Besos, Anitos], 3600, [Pop]);

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

    it('Checking setGenres()', () => {
      playlist.setGenres(Rock);
      expect(playlist.getGenres()).to.be.eql([Pop, Rock]);
    });
  });
});
