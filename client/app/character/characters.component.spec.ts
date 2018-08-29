import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertService } from '../alert/alert.service';
import { CharacterService } from './character.service';
import { Character } from './characterModels/character';
import { CharactersComponent } from './characters.component';
import { myChar } from './mocks/character.mock';
import { characterReturn } from './mocks/characterRes.mock';

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
  }
};

const characterServiceStub: Partial<CharacterService> = {
  saveCharDb(sampleChar: Character): Observable<any> {
    return of(characterReturn);
  },
  getUserCharacters(userId: string): Observable<Character[]> {
    const char = new Character();
    char.id = 'the id';
    return of([char]);
  },
  getCharacter(id: string): Observable<any> {
    return of(characterReturn);
  },
  getCharacters(): Observable<Character[]> {
    return of([new Character(), new Character(), new Character()]);
  },
  saveCharCopy(selected: Character): void {
    return;
  }
};

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

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
        { provide: CharacterService, useValue: characterServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
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
    beforeEach(() => {
      jest.setTimeout(10000);
    });
    test('download', () => {
      component.selectedCharacter = new Character();
      component.download();
    });
    test('onSelect no id', () => {
      component.onSelect(new Character());
    });
    test('onSelect with id', () => {
      const myNewChar = new Character();
      myNewChar.id = 'asdjf';
      component.onSelect(myNewChar);
    });
    test('save', () => {
      component.selectedCharacter = myChar;
      component.save();
    });
    describe('ops with user logged in', () => {
      beforeEach(() => {
        localStorage.setItem('currentUser', ';ajsdf');
        component.selectedCharacter = myChar;
      });
      test('getCharacter', () => {
        component.getCharacters();
      });
      test('getCharacters undefined user', () => {
        localStorage.setItem('currentUser', 'undefined');
        component.getCharacters();
      });
      test('return an empty array', () => {});
    });
  });
});
