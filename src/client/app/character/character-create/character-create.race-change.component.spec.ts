import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { characterReturn } from '#Mocks/characterRes.mock';
import { Character } from '#Models/character';
import {
  Fairy,
  Gerudo,
  Goron,
  Hylian,
  Rito,
  Sheikah,
  Twili,
  Zora
} from '#Models/Races';
import { CapitalizePipe } from '#Shared/helpers/capitalize.pipe';
import { MaterialModule } from '#Shared/material/material.module';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterService } from '../character.service';
import { CharacterCreateComponent } from './character-create.component';

const alertServiceStub: Partial<AlertService> = {
  error(message) {
    return message;
  },
  clear(): void {
    return;
  }
};
const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};
const characterServiceStub: Partial<CharacterService> = {
  saveNewCharDb(sampleChar: Character): Observable<any> {
    return of(characterReturn);
  }
};

describe('CharacterCreateComponent', () => {
  let component: CharacterCreateComponent;
  let fixture: ComponentFixture<CharacterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule
      ],
      declarations: [CharacterCreateComponent, CapitalizePipe],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: MessageService, useValue: messageServiceStub },
        { provide: CharacterService, useValue: characterServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCreateComponent);
    component = fixture.componentInstance;
    component.newCharacter = new Character();
    fixture.detectChanges();
  });
  describe('go through all race changes and all sub race changes', () => {
    describe('hylian', () => {
      test('All Hylian subraces', () => {
        component.newCharacter.race = 'Hylian';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        // Farmer Hylian
        let subRace = 'Farmer';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(10);
        // Guard Hylian
        subRace = 'Guard';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[2].value).toBe(10);
        // Sheikah Hylian
        subRace = 'Sheikah';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
      });
    });
    describe('goron', () => {
      test('All Goron Subraces', () => {
        component.newCharacter.race = 'Goron';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        // Soft Belly Goron
        let subRace = 'Soft Belly';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[4].value).toBe(9);
        // Rock Spine Goron
        subRace = 'Rock Spine';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(10);
      });
    });
    describe('zora', () => {
      test('All Zora subraces', () => {
        component.newCharacter.race = 'Zora';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        // River Zora
        let subRace = 'River';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[2].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        // Ocean Zora
        subRace = 'Ocean';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(6);
        expect(component.newCharacter.attributes[0].value).toBe(10);
        // Swamp Zora
        subRace = 'Swamp';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[2].value).toBe(10);
      });
    });
    describe('rito', () => {
      test('All Rito Subraces', () => {
        component.newCharacter.race = 'Rito';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        // Sharp Tongue Rito
        let subRace = 'Sharp Tongue';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[5].value).toBe(9);
        // Sharp Eye Rito
        subRace = 'Sharp Eye';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[3].value).toBe(9);
      });
    });
    describe('sheikah', () => {
      test('Sheikah', () => {
        component.newCharacter.race = 'Sheikah';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Sheikah);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[2].value).toBe(10);
        expect(component.newCharacter.attributes[5].value).toBe(6);
      });
    });
    describe('twili', () => {
      test('', () => {
        component.newCharacter.race = 'Twili';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Twili);
        expect(component.newCharacter.attributes[2].value).toBe(10);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(6);
      });
    });
    describe('gerudo', () => {
      test('Geurod Test', () => {
        component.newCharacter.race = 'Gerudo';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Gerudo);
        expect(component.newCharacter.attributes[0].value).toBe(10);
        expect(component.newCharacter.attributes[2].value).toBe(9);
      });
    });
    describe('fairy', () => {
      test('no sub', () => {
        component.newCharacter.race = 'Fairy';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
        // Din Fairy
        let subRace = 'Din';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
        // Nayri Fairy
        subRace = 'Nayru';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
        // Farore Fairy
        subRace = 'Farore';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
      });
    });
  });
});
