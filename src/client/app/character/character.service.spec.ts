import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { scribe } from 'mc-scribe';

import { environment } from '#Environment/environment';
import { characterDB } from '#Mocks/characterDB.mock';
import { Character } from '#Models/character';
import { CharacterService } from './character.service';

console.error = jest.fn();

jest.mock('file-saver', () => {
  return {
    saveAs: jest.fn()
  };
});
const charName = 'character name';

// tslint:disable-next-line:no-big-function
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
        { id: 'some id', name: charName, race: 'the race' }
      ]);
      expect(actualReturn).toBeTruthy();
      expect(typeof actualReturn).toBe('object');
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
        { id: 'some id', name: charName, race: 'the race' }
      ]);
      expect(actualReturn).toEqual([
        {
          _ac: undefined,
          _attributes: [
            { _modifier: NaN, _name: 'Strength', _value: undefined },
            { _modifier: NaN, _name: 'Dexterity', _value: undefined },
            { _modifier: NaN, _name: 'Constitution', _value: undefined },
            { _modifier: NaN, _name: 'Intelligence', _value: undefined },
            { _modifier: NaN, _name: 'Wisdom', _value: undefined },
            { _modifier: NaN, _name: 'Charisma', _value: undefined }
          ],
          _craftOne: undefined,
          _craftTwo: undefined,
          _exp: undefined,
          _flatFooted: undefined,
          _health: undefined,
          _id: undefined,
          _importantNotes: [],
          _inventory: [],
          _level: undefined,
          _magic: undefined,
          _magicSkills: [],
          _maxHealth: undefined,
          _maxMagic: undefined,
          _name: undefined,
          _notes: [],
          _performCust: undefined,
          _profession: undefined,
          _race: undefined,
          _savingThrows: [],
          _size: undefined,
          _skills: [],
          _spells: [],
          _subRace: undefined,
          _touch: undefined,
          _weaponSkills: [],
          _weapons: []
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
        scribe('INFO', 'saving Character')
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
      characterService.saveNewCharDb(myChar).subscribe();

      const saveCharacter = backend.expectOne(
        `${environment.apiUrl}/character/new/${userId}`
      );

      expect(saveCharacter.request.url).toBe(
        `${environment.apiUrl}/character/new/${userId}`
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
