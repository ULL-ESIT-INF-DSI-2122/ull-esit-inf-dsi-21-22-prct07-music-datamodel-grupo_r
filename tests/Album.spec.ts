import 'mocha';
import {expect} from 'chai';
import { Artist } from '../src/models/Artist';
import { Album } from '../src/models/Album';
import { Song } from '../src/models/Song';
import { Group } from '../src/models/Group';
import { Genre } from '../src/models/Genre';

describe('Album class test', () => {
  const Funk = new Genre('Funk', [], [], []);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Pop = new Genre('Pop', [elCantoDelLoco],
      [], []);

  const Reaggea = new Genre('Pop', [elCantoDelLoco],
      [], []);
  const Zapatillas = new Album('Zapatillas', elCantoDelLoco, '2000', [Pop], []);
  const eresTonto = new Song('Eres Tonto', elCantoDelLoco, 4, [], 350, true);
  const personas = new Album('Personas', elCantoDelLoco, '2008', [Pop], [eresTonto]);
  const daniMartin = new Artist('Dani Martín', [elCantoDelLoco], [Pop], [Zapatillas],
      [eresTonto], 300);
  const Besos = new Song('Besos', daniMartin, 4, [], 150, true);

  it('Album object creation ', () => {
    expect(new Group('The Jackson 5', [], '1968', [], [], 50)).not.to.be.eql(null);
  });

  describe('Getters of Album Class', () => {
    it('Checking getTitle()', () => {
      expect(personas.getName()).to.be.eql('Personas');
    });

    it('Checking getAuthor()', () => {
      expect(personas.getAuthor()).to.be.eql(elCantoDelLoco);
    });

    it('Checking getDate()', () => {
      expect(personas.getDate()).to.be.eql('2008');
    });

    it('Checking getGenres()', () => {
      expect(personas.getGenres()).to.be.eql([Pop]);
    });

    it('Checking getSongs()', () => {
      expect(personas.getSongs()).eql([eresTonto]);
    });
  });

  describe('Setters of Album Class', () => {
    it('Checking setTitle()', () => {
      personas.setName('Personas!');
      expect(personas.getName()).to.be.eql('Personas!');
    });

    it('Checking addGenres()', () => {
      personas.addGenres([Reaggea]);
      expect(personas.getGenres()).to.be.eql([Pop, Reaggea]);
    });

    it('Checking setAuthor()', () => {
      personas.setAuthor(daniMartin);
      expect(personas.getAuthor()).to.be.eql(daniMartin);
    });

    it('Checking setDate()', () => {
      personas.setDate('2009');
      expect(personas.getDate()).to.be.eql('2009');
    });

    it('Checking setGenres()', () => {
      personas.setGenres([Pop, Funk]);
      expect(personas.getGenres()).to.be.eql([Pop, Funk]);
    });

    it('Checking setSongs()', () => {
      personas.setSongs([Besos, eresTonto]);
      expect(personas.getSongs()).eql([Besos, eresTonto]);
    });
  });

  describe('Print of Album Class', () => {
    expect(personas.print()).to.be.a('string');
  });
});
