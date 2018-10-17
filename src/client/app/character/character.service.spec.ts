import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';

import { environment } from '#Environment/environment';
import { characterDB } from '#Mocks/characterDB.mock';
import { Character } from '#Models/character';
import { CharacterService } from './character.service';

jest.mock('file-saver', () => {
  return {
    saveAs: jest.fn()
  };
});

describe('CharacterService', () => {
  let backend: HttpTestingController;
  let characterService: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CharacterService]
    });
    characterService = TestBed.get(CharacterService);
    backend = TestBed.get(HttpTestingController);
  });

  test('should be created', inject(
    [CharacterService],
    (service: CharacterService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('#getAllCharacters', () => {
    test('successful request', () => {
      const expectedReturn: Character[] = [new Character(null, characterDB)];
      let actualReturn: Character[];

      characterService.getCharacters().subscribe((characters) => {
        actualReturn = characters;
        expect(characters.length).toBe(1);
        expect(characters).toEqual(expectedReturn);
      });

      const getCharacters = backend.expectOne(
        `${environment.apiUrl}/character`
      );

      expect(getCharacters.request.url).toBe(`${environment.apiUrl}/character`);
      getCharacters.flush([
        { id: 'some id', name: 'character Name', race: 'the race' }
      ]);
      expect(actualReturn).toEqual([
        {
          ac: undefined,
          attributes: [
            { modifier: NaN, name: 'Strength', value: undefined },
            { modifier: NaN, name: 'Dexterity', value: undefined },
            {
              modifier: NaN,
              name: 'Constitution',
              value: undefined
            },
            { modifier: NaN, name: 'Intelligence', value: undefined },
            { modifier: NaN, name: 'Wisdom', value: undefined },
            { modifier: NaN, name: 'Charisma', value: undefined }
          ],
          craftOne: undefined,
          craftTwo: undefined,
          exp: undefined,
          flat_footed: undefined,
          health: undefined,
          id: 'some id',
          importantNotes: [],
          inventory: [],
          level: undefined,
          magic: undefined,
          magicSkills: [],
          maxHealth: undefined,
          maxMagic: undefined,
          name: 'character Name',
          notes: [],
          performCust: undefined,
          profession: undefined,
          race: 'the race',
          savingThrows: [],
          size: undefined,
          skills: [],
          spells: [],
          subRace: undefined,
          touch: undefined,
          weaponSkills: [],
          weapons: []
        }
      ]);
    });
    test('unsuccessful request', () => {
      const expectedReturn = new Character(null, characterDB);
      let actualReturn: Character[];
      characterService.getCharacters().subscribe((characters) => {
        actualReturn = characters;
      });

      const getCharacters = backend.expectOne(
        `${environment.apiUrl}/character`
      );

      expect(getCharacters.request.url).toBe(`${environment.apiUrl}/character`);
      getCharacters.flush({});

      expect(actualReturn).not.toEqual(expectedReturn);
    });
  });

  describe('#getSpecifiedCharacter', () => {
    test('success', () => {
      const myChar = new Character(null, characterDB);
      const expectedResult = myChar;
      let actualResult: Character;

      characterService.getCharacter('00cIDkwd242k').subscribe((character) => {
        expect(character).toBeTruthy();
        expect(character instanceof Character);
        actualResult = character;
      });

      const getChar = backend.expectOne(
        `${environment.apiUrl}/character/00cIDkwd242k`
      );

      expect(getChar.request.url).toBe(
        `${environment.apiUrl}/character/00cIDkwd242k`
      );

      getChar.flush(characterDB);

      expect(actualResult).toEqual(expectedResult);
    });
    test('failure', () => {
      const myChar = new Character(null, characterDB);
      const expectedResult = myChar;
      let actualResult: Character;

      characterService.getCharacter('00cIDkwd242k').subscribe((character) => {
        expect(character).toBeTruthy();
        expect(character instanceof Character);
        actualResult = character;
      });

      const getChar = backend.expectOne(
        `${environment.apiUrl}/character/00cIDkwd242k`
      );

      expect(getChar.request.url).toBe(
        `${environment.apiUrl}/character/00cIDkwd242k`
      );

      getChar.flush({});

      expect(actualResult).not.toEqual(expectedResult);
    });
  });

  describe('#getUserCharacters', () => {
    test('successful request', () => {
      const expectedReturn: Character[] = [new Character(null, characterDB)];
      let actualReturn: Character[];
      const userId = '00U2sIh48cOm31H';
      characterService.getUserCharacters(userId).subscribe((characters) => {
        actualReturn = characters;
        expect(characters.length).toBe(1);
        expect(characters).toEqual(expectedReturn);
      });

      const getUserCharacters = backend.expectOne(
        `${environment.apiUrl}/character/user/${userId}`
      );
      expect(getUserCharacters.request.url).toBe(
        `${environment.apiUrl}/character/user/${userId}`
      );
      getUserCharacters.flush([
        { id: 'some id', name: 'character Name', race: 'the race' }
      ]);
      expect(actualReturn).toEqual([
        {
          ac: undefined,
          attributes: [
            { modifier: NaN, name: 'Strength', value: undefined },
            { modifier: NaN, name: 'Dexterity', value: undefined },
            {
              modifier: NaN,
              name: 'Constitution',
              value: undefined
            },
            { modifier: NaN, name: 'Intelligence', value: undefined },
            { modifier: NaN, name: 'Wisdom', value: undefined },
            { modifier: NaN, name: 'Charisma', value: undefined }
          ],
          craftOne: undefined,
          craftTwo: undefined,
          exp: undefined,
          flat_footed: undefined,
          health: undefined,
          id: 'some id',
          importantNotes: [],
          inventory: [],
          level: undefined,
          magic: undefined,
          magicSkills: [],
          maxHealth: undefined,
          maxMagic: undefined,
          name: 'character Name',
          notes: [],
          performCust: undefined,
          profession: undefined,
          race: 'the race',
          savingThrows: [],
          size: undefined,
          skills: [],
          spells: [],
          subRace: undefined,
          touch: undefined,
          weaponSkills: [],
          weapons: []
        }
      ]);
    });
    test('unsuccessful request', () => {
      const expectedReturn = new Character(null, characterDB);
      let actualReturn: Character[];
      const userId = '00U82jsyN72k';
      characterService.getUserCharacters(userId).subscribe((characters) => {
        actualReturn = characters;
      });

      const getUserCharacters = backend.expectOne(
        `${environment.apiUrl}/character/user/${userId}`
      );
      expect(getUserCharacters.request.url).toBe(
        `${environment.apiUrl}/character/user/${userId}`
      );
      getUserCharacters.flush({});

      expect(actualReturn).not.toEqual(expectedReturn);
    });
  });

  describe('#saveCharCopy', () => {
    test('save character json', () => {
      (FileSaver.saveAs as jest.Mock).mockImplementation(() =>
        console.log('saving Character')
      );
      const myChar = new Character();
      characterService.saveCharCopy(myChar);
      expect(FileSaver.saveAs).toHaveBeenCalled();
    });
  });

  describe('#saveDBCopy', () => {
    test('success', () => {
      const myChar = new Character();
      const userId = '00U82jsyMncI';
      sessionStorage.setItem('currentUser', userId);
      characterService.saveCharDb(myChar).subscribe();

      const saveCharacter = backend.expectOne(
        `${environment.apiUrl}/character/${userId}`
      );

      expect(saveCharacter.request.url).toBe(
        `${environment.apiUrl}/character/${userId}`
      );

      saveCharacter.flush({});
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (_httpClient: HttpTestingController) => {
      _httpClient.verify();
    }
  ));
});
