import { Test, TestingModule } from '@nestjs/testing';
import { Character } from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { CharacterService } from './character.service';

const mockCharacter: Character = {} as any;

describe('CharacterService', () => {
  let service: CharacterService;
  let db: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    db = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a character related to the id', (done) => {
    db.query = jest.fn().mockReturnValueOnce(of([mockCharacter]));
    service.getCharacterById({ id: 'CHR-TEST1' }).subscribe(
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
  it('should get multiple characters related to the userId', (done) => {
    db.query = jest
      .fn()
      .mockReturnValueOnce(of([mockCharacter, mockCharacter]));
    service.getCharactersByUserId({ id: 'USR-TEST1' }).subscribe(
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
  it('should insert character and return the new id', (done) => {
    const characterInput = {
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
    };
    db.query = jest.fn().mockReturnValueOnce(of([mockCharacter]));
    service.insertNewCharacter(characterInput).subscribe(
      (character) => {
        expect(character).toBeTruthy();
        expect(character).toEqual(characterInput);
      },
      (error) => {
        throw new Error(error);
      },
      () => done()
    );
  });
  it('should update the character and return the id', (done) => {
    db.query = jest.fn().mockReturnValueOnce(of([mockCharacter]));
    service.updateCharacter({ level: 2 }, { id: 'CHR-TEST' }).subscribe(
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
