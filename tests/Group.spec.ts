import 'mocha';
import {expect} from 'chai';
import { Artist } from '../src/Artist';
import { Group } from '../src/Group';
import { Genre } from '../src/Genre';

describe('Group class test', () => {
  const Funk = new Genre('Funk', [], [], []);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Pop = new Genre('Pop', [elCantoDelLoco],
      [], []);
  const michaelJackson = new Artist('Michael Jackson', [], [Funk],
      [], [], 200);
  const theJackson5 = new Group('The Jackson 5', [michaelJackson], '1968', [Funk], [], 50);
  const marlonJackson = new Artist('Marlon Jackson', [theJackson5], [Funk], [], [], 1290000);

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

    it('Checking setMembers()', () => {
      theJackson5.setMembers([michaelJackson, marlonJackson]);
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
  });
});
