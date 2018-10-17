import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { myChar } from '#Mocks/character.mock';
import { characterReturn } from '#Mocks/characterRes.mock';
import { Character } from '#Models/character';
import { CharacterService } from './character.service';
import { CharactersComponent } from './characters.component';

@Component({ selector: 'app-character-detail', template: '' })
class CharacterDetailStubComponent {
  @Input()
  character;
}

// tslint:disable-next-line:max-classes-per-file
@Component({ selector: 'app-character-create', template: '' })
class CharacterCreateStubComponent {
  @Input()
  CharacterParent;
}

// tslint:disable-next-line:max-classes-per-file
@Component({ selector: 'app-messages', template: '' })
class MessageStubComponent {}

const alertServiceStub: Partial<AlertService> = {
  getMessage(): any {},
  success(message: string): void {
    return;
  },
  clear(): void {
    return;
  }
};

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let characterService: CharacterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [
        CharactersComponent,
        CharacterCreateStubComponent,
        CharacterDetailStubComponent,
        MessageStubComponent
      ],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        CharacterService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    characterService = TestBed.get(CharacterService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Toggles', () => {
    test('hide', () => {
      component.newChar = true;
      component.selectedCharacter = new Character();
      component.hide();
      expect(component.selectedCharacter).toBeNull();
      expect(!component.newChar);
    });
    test('newCharacter', () => {
      component.newChar = false;
      component.selectedCharacter = new Character();
      component.newCharacter();
      expect(component.selectedCharacter).toBeNull();
      expect(component.newChar);
    });
  });
  describe('async ops', () => {
    test('download', () => {
      spyOn(characterService, 'saveCharCopy').and.callFake(() =>
        console.log('Calling fake!')
      );
      component.selectedCharacter = new Character();
      component.download();
    });
    test('onSelect no id', () => {
      component.onSelect(new Character());
    });
    test('onSelect with id', () => {
      const myNewChar = new Character();
      myNewChar.setId('asdjf');
      spyOn(characterService, 'getCharacter').and.returnValue(of(myNewChar));
      component.onSelect(myNewChar);
    });
    test('save', () => {
      component.selectedCharacter = myChar;
      spyOn(characterService, 'saveCharDb').and.returnValue(
        of(characterReturn)
      );
      component.save();
    });
    describe('ops with user logged in', () => {
      beforeEach(() => {
        sessionStorage.setItem('currentUser', ';ajsdf');
        component.selectedCharacter = myChar;
      });
      test('getCharacter', () => {
        spyOn(characterService, 'getUserCharacters').and.returnValues(
          of([characterReturn])
        );
        component.getCharacters();
      });
      test('getCharacters with 0 return', () => {
        spyOn(characterService, 'getUserCharacters').and.returnValues(of([]));
        component.getCharacters();
      });
      test('getCharacters undefined user', () => {
        spyOn(characterService, 'getCharacters').and.returnValues(
          of([characterReturn])
        );
        sessionStorage.setItem('currentUser', 'undefined');
        component.getCharacters();
      });
      test('getCharacters undefined user 0 return', () => {
        spyOn(characterService, 'getCharacters').and.returnValues(of([]));
        sessionStorage.setItem('currentUser', 'undefined');
        component.getCharacters();
      });
      test('return an empty array', () => {});
    });
  });

  test('init with chars', () => {
    component.characters = [myChar];
    fixture.detectChanges();
    component.ngOnInit();
  });
});
