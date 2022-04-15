import 'mocha';
import {expect} from 'chai';
import { Album } from '../src/models/Album';
import { Song } from '../src/models/Song';
import { Group } from '../src/models/Group';
import { Genre } from '../src/models/Genre';

describe('Genre class test', () => {
  const theJackson5 = new Group('The Jackson 5', [], '1968', [], [], 50);
  const blameItOnTheBoogie = new Song('Blame It On The Boogie', theJackson5, 5, [], 100, false);
  const Funk = new Genre('Funk', [theJackson5], [], [blameItOnTheBoogie]);
  const dianaRossPresentsTheJackson5 = new Album('Diana Ross Presents The Jackson 5',
      theJackson5, '1969', [Funk], [blameItOnTheBoogie]);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Besos = new Song('Besos', elCantoDelLoco, 4, [], 150, true);
  const Reggea = new Genre('Reggea', [theJackson5], [dianaRossPresentsTheJackson5], [blameItOnTheBoogie]);

  describe('Genre Class', () => {
    it('Genre object creation ', () => {
      expect(new Genre('Soul', [elCantoDelLoco], [], [Besos])).not.to.be.eql(null);
    });
  });

  describe('Getters of Genre Class', () => {
    it('Checking getName()', () => {
      expect(Funk.getName()).to.be.eql('Funk');
    });

    it('Checking getGroup()', () => {
      expect(Funk.getAuthors()).to.be.eql([theJackson5]);
    });

    it('Checking getAlbums()', () => {
      expect(Funk.getAlbums()).to.be.eql([]);
    });

    it('Checking getSongs()', () => {
      expect(Funk.getSongs()).eql([blameItOnTheBoogie]);
    });
  });

  describe('Setters of Genre Class', () => {
    it('Checking setName()', () => {
      Funk.setName('Michael Joseph Jackson');
      expect(Funk.getName()).to.be.eql('Michael Joseph Jackson');
    });

    it('Checking setGroup()', () => {
      Funk.setAuthors(elCantoDelLoco);
      expect(Funk.getAuthors()).to.be.eql([theJackson5, elCantoDelLoco]);
    });

    it('Checking setAlbums()', () => {
      Funk.setAlbums(dianaRossPresentsTheJackson5);
      expect(Funk.getAlbums()).to.be.eql([dianaRossPresentsTheJackson5]);
    });

    it('Checking setSongs()', () => {
      Funk.setSongs(Besos);
      expect(Funk.getSongs()).eql([blameItOnTheBoogie, Besos]);
    });

    it('Checking replaceAlbums()', () => {
      Funk.replaceAlbums([dianaRossPresentsTheJackson5]);
      expect(Funk.getAlbums()).eql([dianaRossPresentsTheJackson5]);
    });

    it('Checking replaceAlbums()', () => {
      Funk.replaceSongs([Besos]);
      expect(Funk.getSongs()).eql([Besos]);
    });
  });

  describe('Print of Genre Class', () => {
    expect(Reggea.print()).to.be.a('string');
  });
});
