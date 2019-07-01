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
              .mockReturnValue(of([mockCharacter, mockCharacter]))
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
    resolver.getCharacter('CHR-TEST1').subscribe(
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
    resolver.getUserCharacters('USR-TEST1').subscribe(
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
