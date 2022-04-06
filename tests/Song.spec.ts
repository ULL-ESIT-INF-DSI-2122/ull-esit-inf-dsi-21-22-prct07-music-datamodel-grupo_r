import 'mocha';
import {expect} from 'chai';

import { Artist } from '../src/Artist';
import { Album } from '../src/Album';
import { Song } from '../src/Song';
import { Group } from '../src/Group';
import { Genre } from '../src/Genre';

describe('Song class test', () => {
  const Anitos = new Song('16 añitos', [], 4.13, [], 17020329, false);
  const Pop = new Genre('playlist', [], [], [Anitos]);
  const Sera = new Song('Será', [], 180, [Pop], 150, true);
  const Rock = new Genre('Rock', [], [], [Sera]);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Zapatillas = new Album('Zapatillas', elCantoDelLoco, '2000', [Pop], []);
  const daniMartin = new Artist('Dani Martín', [elCantoDelLoco], [Pop], [Zapatillas],
      [Anitos], 300);
  const Besos = new Song('Besos', [daniMartin], 4, [Pop], 150, true);
  const michaelJackson = new Artist('Michael Jackson', [], [], [], [], 200);

  it('Song object creation ', () => {
    expect(new Song('Peter Pan', [], 4, [], 123, true)).not.to.be.eql(null);
  });

  describe('Getters of Song Class', () => {
    it('Checking getName()', () => {
      expect(Besos.getName()).to.be.eql('Besos');
    });

    it('Checking getArtists()', () => {
      expect(Besos.getArtists()).eql([daniMartin]);
    });

    it('Checking getDuration()', () => {
      expect(Besos.getLength()).to.be.eql(4);
    });

    it('Checking getGenres()', () => {
      expect(Besos.getGenres()).to.be.eql([Pop]);
    });

    it('Checking getPlays()', () => {
      expect(Besos.getPlays()).to.be.eql(150);
    });

    it('Checking getSingle()', () => {
      expect(Besos.getSingle()).to.be.eql(true);
    });
  });

  describe('Setters of Song Class', () => {
    it('Checking setName()', () => {
      Besos.setName('Besos todas');
      expect(Besos.getName()).to.be.eql('Besos todas');
    });

    it('Checking setArtists()', () => {
      Besos.setArtists(michaelJackson);
      expect(Besos.getArtists()).eql([daniMartin, michaelJackson]);
    });

    it('Checking setLength()', () => {
      Besos.setLength(120);
      expect(Besos.getLength()).to.be.eql(120);
    });

    it('Checking setGenres()', () => {
      Besos.setGenres(Rock);
      expect(Besos.getGenres()).to.be.eql([Pop, Rock]);
    });

    it('Checking setPlays()', () => {
      Besos.setPlays(500);
      expect(Besos.getPlays()).to.be.eql(500);
    });

    it('Checking setSingle()', () => {
      Besos.setSingle(false);
      expect(Besos.getSingle()).to.be.eql(false);
    });
  });
});
