import 'mocha';
import {expect} from 'chai';
import { Artist } from '../src/models/Artist';
import { Album } from '../src/models/Album';
import { Song } from '../src/models/Song';
import { Group } from '../src/models/Group';
import { Genre } from '../src/models/Genre';

describe('Artist class test', () => {
  const theJackson5 = new Group('The Jackson 5', [], '1968', [], [], 50);
  const blameItOnTheBoogie = new Song('Blame It On The Boogie', theJackson5, 5, [], 100, false);
  const Funk = new Genre('Funk', [theJackson5], [], [blameItOnTheBoogie]);
  const dianaRossPresentsTheJackson5 = new Album('Diana Ross Presents The Jackson 5',
      theJackson5, '1969', [Funk], [blameItOnTheBoogie]);
  const michaelJackson = new Artist('Michael Jackson', [theJackson5], [Funk],
      [dianaRossPresentsTheJackson5], [blameItOnTheBoogie], 200);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Pop = new Genre('Pop', [michaelJackson, elCantoDelLoco],
      [dianaRossPresentsTheJackson5], [blameItOnTheBoogie]);
  const Besos = new Song('Besos', michaelJackson, 4, [], 150, true);
  const Zapatillas = new Album('Zapatillas', elCantoDelLoco, '2000', [Pop], [Besos]);

  describe('Artist Class', () => {
    it('Artist object creation ', () => {
      expect(new Artist('Marlon Jackson', [theJackson5], [Funk], [dianaRossPresentsTheJackson5],
          [blameItOnTheBoogie], 1290000)).not.to.be.eql(null);
    });
  });

  describe('Getters of Artist Class', () => {
    it('Checking getName()', () => {
      expect(michaelJackson.getName()).to.be.eql('Michael Jackson');
    });

    it('Checking getGroup()', () => {
      expect(michaelJackson.getGroups()).to.be.eql([theJackson5]);
    });

    it('Checking getGenres()', () => {
      expect(michaelJackson.getGenres()).to.be.eql([Funk]);
    });

    it('Checking getAlbums()', () => {
      expect(michaelJackson.getAlbums()).to.be.eql([dianaRossPresentsTheJackson5]);
    });

    it('Checking getSongs()', () => {
      expect(michaelJackson.getSongs()).eql([blameItOnTheBoogie]);
    });

    it('Checking getListeners()', () => {
      expect(michaelJackson.getListeners()).eql(29);
    });
  });

  describe('Setters of Artist Class', () => {
    it('Checking setName()', () => {
      michaelJackson.setName('Michael Joseph Jackson');
      expect(michaelJackson.getName()).to.be.eql('Michael Joseph Jackson');
    });

    it('Checking setGroup()', () => {
      michaelJackson.setGroups(elCantoDelLoco);
      expect(michaelJackson.getGroups()).to.be.eql([theJackson5, elCantoDelLoco]);
    });

    it('Checking setGenres()', () => {
      michaelJackson.setGenres(Pop);
      expect(michaelJackson.getGenres()).to.be.eql([Funk, Pop]);
    });

    it('Checking setAlbums()', () => {
      michaelJackson.setAlbums(Zapatillas);
      expect(michaelJackson.getAlbums()).to.be.eql([dianaRossPresentsTheJackson5, Zapatillas]);
    });

    it('Checking setSongs()', () => {
      michaelJackson.setSongs(Besos);
      expect(michaelJackson.getSongs()).eql([blameItOnTheBoogie, Besos]);
    });

    it('Checking replaceSongs()', () => {
      michaelJackson.replaceSongs([blameItOnTheBoogie]);
      expect(michaelJackson.getSongs()).eql([blameItOnTheBoogie]);
    });

    it('Checking replaceSongs()', () => {
      michaelJackson.replaceAlbums([Zapatillas]);
      expect(michaelJackson.getAlbums()).eql([Zapatillas]);
    });
  });

  describe('Print of Artist Class', () => {
    expect(michaelJackson.print()).to.be.a('string');
  });
});
