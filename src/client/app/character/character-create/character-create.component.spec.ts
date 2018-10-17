import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { myChar } from '#Mocks/character.mock';
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
  saveCharDb(sampleChar: Character): Observable<any> {
    return of(characterReturn);
  }
};

describe('CharacterCreateComponent', () => {
  let component: CharacterCreateComponent;
  let fixture: ComponentFixture<CharacterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [CharacterCreateComponent],
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
        alertServiceStub as AlertService
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
        component.newCharacter.getAttributes()[0].setValue(15);
        expect(component.newCharacter.getAttributes()[0].getModifier()).toBe(2);
      });
      test('even stat value', () => {
        component.newCharacter.getAttributes()[0].setValue(16);
        expect(component.newCharacter.getAttributes()[0].getModifier()).toBe(3);
      });
    });
    test('getMod should return the mod of the specified attribute', () => {
      component.newCharacter.getAttributes()[1].setValue(16);
      const modVal = component.getMod('Dexterity');
      expect(modVal).toBe(
        component.newCharacter.getAttributes()[1].getModifier()
      );
    });
  });

  describe('go through all race changes and all sub race changes', () => {
    describe('hylian', () => {
      test('no sub', () => {
        component.newCharacter.setRace('Hylian');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
      });
      test('farmer', () => {
        const subRace = 'Farmer';
        component.newCharacter.setRace('Hylian');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(10);
      });
      test('guard', () => {
        const subRace = 'Guard';
        component.newCharacter.setRace('Hylian');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(10);
      });
      test('sheikah', () => {
        const subRace = 'Sheikah';
        component.newCharacter.setRace('Hylian');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
      });
    });
    describe('goron', () => {
      test('no sub', () => {
        component.newCharacter.setRace('Goron');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
      });
      test('soft belly', () => {
        const subRace = 'Soft Belly';
        component.newCharacter.setRace('Goron');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(9);
      });
      test('rock spine', () => {
        const subRace = 'Rock Spine';
        component.newCharacter.setRace('Goron');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(10);
      });
    });
    describe('zora', () => {
      test('no sub', () => {
        component.newCharacter.setRace('Zora');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
      });
      test('river', () => {
        const subRace = 'River';
        component.newCharacter.setRace('Zora');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
      });
      test('ocean', () => {
        const subRace = 'Ocean';
        component.newCharacter.setRace('Zora');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(10);
      });
      test('swamp', () => {
        const subRace = 'Swamp';
        component.newCharacter.setRace('Zora');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(10);
      });
    });
    describe('rito', () => {
      test('no sub', () => {
        component.newCharacter.setRace('Rito');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
      });
      test('sharp tongue', () => {
        const subRace = 'Sharp Tongue';
        component.newCharacter.setRace('Rito');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[5].getValue()).toBe(9);
      });
      test('sharp eye', () => {
        const subRace = 'Sharp Eye';
        component.newCharacter.setRace('Rito');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(9);
      });
    });
    describe('sheikah', () => {
      test('Sheikah', () => {
        component.newCharacter.setRace('Sheikah');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Sheikah);
        expect(component.newCharacter.getAttributes()[1].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[5].getValue()).toBe(6);
      });
    });
    describe('twili', () => {
      test('', () => {
        component.newCharacter.setRace('Twili');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Twili);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(6);
      });
    });
    describe('gerudo', () => {
      test('', () => {
        component.newCharacter.setRace('Gerudo');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Gerudo);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[2].getValue()).toBe(9);
      });
    });
    describe('fairy', () => {
      test('no sub', () => {
        component.newCharacter.setRace('Fairy');
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(10);
      });
      test('din', () => {
        const subRace = 'Din';
        component.newCharacter.setRace('Fairy');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(10);
      });
      test('nayru', () => {
        const subRace = 'Nayru';
        component.newCharacter.setRace('Fairy');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(10);
      });
      test('farore', () => {
        const subRace = 'Farore';
        component.newCharacter.setRace('Fairy');
        component.newCharacter.setSubRace(subRace);
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.getSubRace()).toBe(subRace);
        expect(component.newCharacter.getAttributes()[0].getValue()).toBe(6);
        expect(component.newCharacter.getAttributes()[3].getValue()).toBe(10);
        expect(component.newCharacter.getAttributes()[4].getValue()).toBe(10);
      });
    });
  });

  describe('reset commands', () => {
    test('reset skills', () => {
      component.resetSkills();
      expect(component.newCharacter.getSkills()[0].getRanks()).toBe(0);
      expect(component.newCharacter.getWeaponSkills()[0].getRanks()).toBe(0);
      expect(component.newCharacter.getMagicSkills()[0].getRanks()).toBe(0);
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

  describe('track and validate commands', () => {
    describe('attribute specific', () => {
      test('track attr', () => {
        const startPoints = component.attPoints;
        component.newCharacter.getAttributes()[2].changeValue(2);
        component.trackAtt(2);
        expect((component.attPoints = startPoints - 2));
        const prior = component.attrPrior[2];
        component.newCharacter.getAttributes()[2].changeValue(1);
        component.trackAtt(2);
        expect((component.attPoints = prior - 1));
      });
      describe('validate attr', () => {
        test('regression value', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter
            .getAttributes()[0]
            .getValue();
          component.newCharacter.getAttributes()[0].changeValue(-1);
          component.trackAtt(0);
          expect(component.attPoints).toBe(startPoints + 1);
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.attPoints).toBe(startPoints);
          expect(component.newCharacter.getAttributes()[0].getValue()).toBe(
            startAttr
          );
        });
        test('overused points', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter
            .getAttributes()[0]
            .getValue();
          for (let i = 0; i <= startPoints; i++) {
            component.newCharacter.getAttributes()[0].changeValue(1);
            component.trackAtt(0);
          }
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.getAttributes()[0].getValue()).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
        });
        test('overused points and re-adjust', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter
            .getAttributes()[0]
            .getValue();
          for (let i = 0; i <= startPoints; i++) {
            component.newCharacter.getAttributes()[0].changeValue(1);
            component.trackAtt(0);
          }
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.getAttributes()[0].getValue()).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
          component.trackAtt(0);
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).not.toContain(
            'bad-input'
          );
          expect(component.newCharacter.getAttributes()[0].getValue()).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
        });
        test('good input', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter
            .getAttributes()[2]
            .getValue();
          for (let i = 0; i < startPoints; i++) {
            component.newCharacter.getAttributes()[2].changeValue(1);
            component.trackAtt(2);
          }
          component.validateAttr(2);
          expect(document.getElementById('attr0').classList).not.toContain(
            'bad-input'
          );
          expect(component.newCharacter.getAttributes()[2].getValue()).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[2]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
        });
      });
    });
    describe('skill specific', () => {
      test('track skill', () => {
        const skillPointStart = component.skillPoints;
        component.newCharacter
          .getSkills()[0]
          .setRanks(component.newCharacter.getSkills()[0].getRanks() + 10);
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 10);
        component.newCharacter
          .getSkills()[0]
          .setRanks(component.newCharacter.getSkills()[0].getRanks() + 5);
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 15);
      });
      describe('validate skill', () => {
        test('regression value', () => {
          const skillPointsStart = component.skillPoints;
          component.newCharacter
            .getWeaponSkills()[0]
            .setRanks(
              component.newCharacter.getWeaponSkills()[0].getRanks() - 10
            );
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.weaponSkillsPrior[0]).toBe(0);
          expect(component.skillPoints).toBe(skillPointsStart - 10);
        });
        test('overused points', () => {
          const skillStart = component.newCharacter
            .getWeaponSkills()[0]
            .getRanks();
          const skillPointsStart = component.skillPoints;
          component.newCharacter
            .getWeaponSkills()[0]
            .setRanks(
              component.newCharacter.getWeaponSkills()[0].getRanks() +
                5 +
                skillPointsStart
            );
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.getWeaponSkills()[0].getRanks()).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
        });
        test('overused points and re-adjust', () => {
          const skillStart = component.newCharacter
            .getWeaponSkills()[0]
            .getRanks();
          const skillPointsStart = component.skillPoints;
          component.newCharacter
            .getWeaponSkills()[0]
            .setRanks(
              component.newCharacter.getWeaponSkills()[0].getRanks() +
                5 +
                skillPointsStart
            );
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.getWeaponSkills()[0].getRanks()).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(
            document.getElementById('weaponSkills0').classList
          ).not.toContain('bad-input');
          expect(component.newCharacter.getWeaponSkills()[0].getRanks()).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
        });
        test('good input', () => {
          const skillPointsStart = component.skillPoints;
          for (let i = 0; i < skillPointsStart; i++) {
            component.newCharacter
              .getMagicSkills()[0]
              .setRanks(
                component.newCharacter.getMagicSkills()[0].getRanks() + 1
              );
          }
          component.track(0, 'magicSkills');
          component.validate(0, 'magicSkills');
          expect(component.newCharacter.getMagicSkills()[0].getRanks()).toBe(
            skillPointsStart
          );
          expect(component.skillPoints).toBe(0);
        });
      });
    });
  });

  describe('saving the character', () => {
    describe('saving while logged in', () => {
      test('it should fully save the character and set all ids', () => {
        component.newCharacter = myChar;
        sessionStorage.setItem('currentUser', '00UjYh3bYs92');
        component.CharacterParent = new CharactersComponent(
          characterServiceStub as CharacterService,
          alertServiceStub as AlertService
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
        component.newCharacter.setName('Test Gerudo');
        component.skillPoints = 0;
        component.attPoints = 0;
        component.CharacterParent = new CharactersComponent(
          characterServiceStub as CharacterService,
          alertServiceStub as AlertService
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
        component.newCharacter.setName('Test Hylian');
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without spending all attr points', () => {
        component.newCharacter = new Sheikah();
        component.skillPoints = 0;
        component.attPoints = 5;
        component.newCharacter.setName('Test Sheikah');
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without spending all skill points', () => {
        component.newCharacter = new Twili();
        component.skillPoints = 5;
        component.attPoints = 0;
        component.newCharacter.setName('Test Twili');
        component.save();
        expect(component.error).toBe(true);
      });
      test('should not save without a character name', () => {
        component.newCharacter = new Hylian();
        component.newCharacter.setSubRace('Farmer');
        component.skillPoints = component.attPoints = 0;
        component.save();
        expect(component.error).toBe(true);
      });
    });
  });
  describe('create message', () => {
    test('create message for character with subrace', () => {
      component.newCharacter = new Hylian();
      component.newCharacter.setSubRace('Guard');
      component.newCharacter.setName('Test Guard');
      component.createMessage();
    });
    test('create message for character without sub race', () => {
      component.newCharacter = new Twili();
      component.newCharacter.setName('Test Twili');
      component.createMessage();
    });
  });
});
