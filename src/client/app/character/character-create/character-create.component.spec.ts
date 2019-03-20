import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { myChar } from '#Mocks/character.mock';
import { characterReturn } from '#Mocks/characterRes.mock';
import { Character } from '#Models/character';
import { Gerudo, Hylian, Sheikah, Twili } from '#Models/Races';
import { CapitalizePipe } from '#Shared/helpers/capitalize.pipe';
import { MaterialModule } from '#Shared/material/material.module';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterService } from '../character.service';
import { CharactersComponent } from '../characters.component';
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

const navBarServiceStub: any = {
  navigate: (naviagation: { page: string }) => {}
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

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle and close function', () => {
    test('toggle aboutRace', () => {
      const showRace = component.showRaceModal;
      component.aboutRace();
      expect(component.showRaceModal).not.toBe(showRace);
      component.aboutRace();
      expect(component.showRaceModal).toBe(showRace);
    });
    test('close a pop up error', () => {
      const error = component.error;
      component.error = true;
      component.closeError();
      expect(component.error).toBe(error);
    });
    test('cancel new character creation', () => {
      component.CharacterParent = new CharactersComponent(
        characterServiceStub as CharacterService,
        alertServiceStub as AlertService,
        navBarServiceStub
      );
      component.cancel();
      expect(component.newCharacter).toBeNull();
    });
    test('show race should make one race true and all others false', () => {
      const raceVal = Math.round(Math.random() * 100) % 8;
      component.show(raceVal);
      for (let i = 0; i < component.showRace.length; i++) {
        if (i === raceVal) {
          expect(component.showRace[i]);
        } else {
          expect(!component.showRace[i]);
        }
      }
    });
  });

  describe('calculate and get character mod', () => {
    describe('calc mod should return stat - 10 (or 11) / 2. Should always be integer', () => {
      test('odd stat value', () => {
        component.newCharacter.attributes[0].value = 15;
        expect(component.newCharacter.attributes[0].modifier).toBe(2);
      });
      test('even stat value', () => {
        component.newCharacter.attributes[0].value = 16;
        expect(component.newCharacter.attributes[0].modifier).toBe(3);
      });
    });
    test('getMod should return the mod of the specified attribute', () => {
      component.newCharacter.attributes[1].value = 16;
      const modVal = component.getMod('Dexterity');
      expect(modVal).toBe(component.newCharacter.attributes[1].modifier);
    });
  });

  describe('reset commands', () => {
    test('reset skills', () => {
      component.resetSkills();
      expect(component.newCharacter.skills[0].ranks).toBe(0);
      expect(component.newCharacter.weaponSkills[0].ranks).toBe(0);
      expect(component.newCharacter.magicSkills[0].ranks).toBe(0);
    });
    test('reset priors', () => {
      component.attrPrior[0] = 22;
      component.skillsPrior[0] = 22;
      component.weaponSkillsPrior[0] = 22;
      component.magicSkillsPrior[0] = 22;
      component.resetPriors();
      expect(component.attrPrior[0]).toBeNull();
      expect(component.skillsPrior[0]).toBeNull();
      expect(component.magicSkillsPrior[0]).toBeNull();
      expect(component.weaponSkillsPrior[0]).toBeNull();
    });
  });

  describe('saving the character', () => {
    describe('saving while logged in', () => {
      test('it should fully save the character and set all ids', () => {
        component.newCharacter = myChar;
        sessionStorage.setItem('currentUser', '00UjYh3bYs92');
        component.CharacterParent = new CharactersComponent(
          characterServiceStub as CharacterService,
          alertServiceStub as AlertService,
          navBarServiceStub
        );
        component.attPoints = component.skillPoints = 0;
        component.save();
        expect(component.CharacterParent.characters.length).toBe(1);
        expect(component.error).toBe(false);
        expect(component.CharacterParent).toBeTruthy();
      });
    });
    describe('saving failures', () => {
      test('should not save if not logged in', () => {
        component.newCharacter = new Gerudo();
        component.newCharacter.name = 'Test Gerudo';
        component.skillPoints = 0;
        component.attPoints = 0;
        component.CharacterParent = new CharactersComponent(
          characterServiceStub as CharacterService,
          alertServiceStub as AlertService,
          navBarServiceStub
        );
        sessionStorage.removeItem('currentUser');
        component.save();
        expect(component.CharacterParent.characters.length).toBe(1);
        expect(component.error).toBe(false);
        expect(component.CharacterParent.newChar).toBe(false);
        expect(component.CharacterParent.selectedCharacter).toEqual(
          component.newCharacter
        );
      });
      test('should not save without Hylian Subrace', () => {
        component.newCharacter = new Hylian();
        component.skillPoints = component.attPoints = 0;
        component.newCharacter.name = 'Test Hylian';
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without spending all attr points', () => {
        component.newCharacter = new Sheikah();
        component.skillPoints = 0;
        component.attPoints = 5;
        component.newCharacter.name = 'Test Sheikah';
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without spending all skill points', () => {
        component.newCharacter = new Twili();
        component.skillPoints = 5;
        component.attPoints = 0;
        component.newCharacter.name = 'Test Twili';
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without a character name', () => {
        component.newCharacter = new Hylian();
        component.newCharacter.subRace = 'Farmer';
        component.skillPoints = component.attPoints = 0;
        component.save();
        expect(component.error).toBe(true);
      });
    });
  });
  describe('create message', () => {
    test('create message for character with subrace', () => {
      component.newCharacter = new Hylian();
      component.newCharacter.subRace = 'Guard';
      component.newCharacter.name = 'Test Guard';
      component.createMessage();
    });
    test('create message for character without sub race', () => {
      component.newCharacter = new Twili();
      component.newCharacter.name = 'Test Twili';
      component.createMessage();
    });
  });
});
