import 'mocha';
import {expect} from 'chai';
import { Artist } from '../src/models/Artist';
import { Group } from '../src/models/Group';
import { Genre } from '../src/models/Genre';
import { Album } from '../src/models/Album';

describe('Group class test', () => {
  const Funk = new Genre('Funk', [], [], []);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Pop = new Genre('Pop', [elCantoDelLoco],
      [], []);
  const michaelJackson = new Artist('Michael Jackson', [], [Funk],
      [], [], 200);
  const theJackson5 = new Group('The Jackson 5', [michaelJackson], '1968', [Funk], [], 50);
  const marlonJackson = new Artist('Marlon Jackson', [theJackson5], [Funk], [], [], 1290000);
  const pepe = new Artist('pepe', [theJackson5], [Funk], [], [], 1290000);
  const Reggea = new Genre('Reggea', [elCantoDelLoco],
      [], []);
  const Zapatillas = new Album('Zapatillas', elCantoDelLoco, '2000', [Pop], []);
  const pepe1 = new Group('pepe1', [michaelJackson], '1968', [Funk], [Zapatillas], 50);

  it('Group object creation ', () => {
    expect(new Group('The Jackson 5', [michaelJackson], '1968', [Funk, Pop], [], 50)).not.to.be.eql(null);
  });

  describe('Getters of Group Class', () => {
    it('Checking getName()', () => {
      expect(theJackson5.getName()).to.be.eql('The Jackson 5');
    });

    it('Checking getMembers()', () => {
      expect(theJackson5.getMembers()).to.be.eql([michaelJackson]);
    });

    it('Checking getDate()', () => {
      expect(theJackson5.getDate()).to.be.eql('1968');
    });

    it('Checking getGenres()', () => {
      expect(theJackson5.getGenres()).to.be.eql([Funk]);
    });

    it('Checking getSongs()', () => {
      expect(theJackson5.getAlbums()).eql([]);
    });

    it('Checking getListeners()', () => {
      expect(theJackson5.getListeners()).eql(50);
    });
  });

  describe('Setters of Group Class', () => {
    it('Checking setName()', () => {
      theJackson5.setName('The Jacksons');
      expect(theJackson5.getName()).to.be.eql('The Jacksons');
    });

    it('Checking replaceMembers()', () => {
      theJackson5.replaceMembers([michaelJackson, marlonJackson]);
      expect(theJackson5.getMembers()).to.be.eql([michaelJackson, marlonJackson]);
    });

    it('Checking setDate()', () => {
      theJackson5.setDate('1969');
      expect(theJackson5.getDate()).to.be.eql('1969');
    });

    it('Checking addGenres()', () => {
      theJackson5.addGenres([Pop]);
      expect(theJackson5.getGenres()).to.be.eql([Funk, Pop]);
    });

    it('Checking setSongs()', () => {
      theJackson5.incrementListeners();
      expect(theJackson5.getListeners()).eql(51);
    });

    it('Checking setMembers()', () => {
      theJackson5.setMembers(pepe);
      expect(theJackson5.getMembers()).to.be.eql([michaelJackson, marlonJackson, pepe]);
    });

    it('Checking setGenres()', () => {
      theJackson5.setGenres(Reggea);
      expect(theJackson5.getGenres()).to.be.eql([Funk, Pop, Reggea]);
    });

    it('Checking replaceGenres()', () => {
      theJackson5.replaceGenres([Reggea]);
      expect(theJackson5.getGenres()).to.be.eql([Reggea]);
    });

    it('Checking setAlbums()', () => {
      theJackson5.setAlbums(Zapatillas);
      expect(theJackson5.getAlbums()).to.be.eql([Zapatillas]);
    });

    it('Checking setAlbums()', () => {
      theJackson5.setListeners(200);
      expect(theJackson5.getListeners()).to.be.eql(200);
    });

    it('Checking addGenres()', () => {
      theJackson5.replaceAlbums([Zapatillas]);
      expect(theJackson5.getAlbums()).to.be.eql([Zapatillas]);
    });
  });

  describe('Print of Group Class', () => {
    expect(pepe1.print()).to.be.a('string');
  });
});
