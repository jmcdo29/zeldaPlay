import { Test, TestingModule } from '@nestjs/testing';
import { Character } from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';

const mockCharacter: Character = {} as any;

describe('CharacterResolver', () => {
  let resolver: CharacterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterResolver,
        {
          provide: CharacterService,
          useValue: {
            getCharacterById: jest.fn().mockReturnValue(of(mockCharacter)),
            getCharactersByUserId: jest
              .fn()
              .mockReturnValue(of([mockCharacter, mockCharacter])),
            insertNewCharacter: jest.fn().mockReturnValue(of(mockCharacter)),
            updateCharacter: jest.fn().mockReturnValue(of(mockCharacter))
          }
        }
      ]
    }).compile();

    resolver = module.get<CharacterResolver>(CharacterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should return a character for getCharacter', (done) => {
    resolver.getCharacter({ id: 'CHR-TEST1' }).subscribe(
      (character) => {
        expect(character).toBeTruthy();
        expect(character).toEqual(mockCharacter);
      },
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should return multiple characters for getUserCharacters', (done) => {
    resolver.getUserCharacters({ id: 'USR-TEST1' }).subscribe(
      (characters) => {
        expect(characters.length).toBe(2);
        expect(characters).toEqual([mockCharacter, mockCharacter]);
      },
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should get return for character insert', (done) => {
    resolver
      .insertCharacter({
        name: 'Test character',
        race: 'Halfling',
        subrace: 'Lightfoot',
        experience: 0,
        level: 1,
        ideal: '',
        proficiencies: [],
        background: 'Hermit',
        alignment: 'Neutral Good',
        flaw: '',
        personalityTraits: [],
        maxHealth: 15,
        health: 15,
        isDead: false,
        playerId: 'USR-TEST',
        bond: '',
        languages: ['Common', 'Dwarvish'],
        game: 'dd5'
      })
      .subscribe(
        (character) => {
          expect(character).toBeTruthy();
          expect(character).toEqual(mockCharacter);
        },
        (error) => {
          throw new Error(error);
        },
        () => done()
      );
  });
  it('should get return for character update', (done) => {
    resolver.updateCharacter({ level: 2 }, { id: 'CHR-TEST' }).subscribe(
      (character) => {
        expect(character).toBeTruthy();
        expect(character).toEqual(mockCharacter);
      },
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
});
