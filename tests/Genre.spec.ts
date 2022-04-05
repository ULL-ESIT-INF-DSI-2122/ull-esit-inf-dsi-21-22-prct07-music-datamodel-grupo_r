import 'mocha';
import {expect} from 'chai';

import { Album } from '../src/Album';
import { Song } from '../src/Song';
import { Group } from '../src/Group';
import { Genre } from '../src/Genre';

describe('Genre class test', () => {
  const blameItOnTheBoogie = new Song('Blame It On The Boogie', [], 5, [], 100, false);
  const theJackson5 = new Group('The Jackson 5', [], '1968', [], [], 50);
  const Funk = new Genre('Funk', [theJackson5], [], [blameItOnTheBoogie]);
  const dianaRossPresentsTheJackson5 = new Album('Diana Ross Presents The Jackson 5',
      theJackson5, '1969', [Funk], [blameItOnTheBoogie]);
  const elCantoDelLoco = new Group('El Canto Del Loco', [], '2001', [], [], 200);
  const Besos = new Song('Besos', [], 4, [], 150, true);

  it('Genre object creation ', () => {
    expect(new Genre('Soul', [elCantoDelLoco], [], [Besos])).not.to.be.eql(null);
  });

  describe('Getters of Genre Class', () => {
    it('Checking getName()', () => {
      expect(Funk.getName()).to.be.eql('Funk');
    });

    it('Checking getGroup()', () => {
      expect(Funk.getGroups()).to.be.eql([theJackson5]);
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
      Funk.setGroups(elCantoDelLoco);
      expect(Funk.getGroups()).to.be.eql([theJackson5, elCantoDelLoco]);
    });

    it('Checking setAlbums()', () => {
      Funk.setAlbums(dianaRossPresentsTheJackson5);
      expect(Funk.getAlbums()).to.be.eql([dianaRossPresentsTheJackson5]);
    });

    it('Checking setSongs()', () => {
      Funk.setSongs(Besos);
      expect(Funk.getSongs()).eql([blameItOnTheBoogie, Besos]);
    });
  });
});
