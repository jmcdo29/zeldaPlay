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
    service.getCharacterById('CHR-TEST1').subscribe(
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
    service.getCharactersByUserId('USR-TEST1').subscribe(
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
});
