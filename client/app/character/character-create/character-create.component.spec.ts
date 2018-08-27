import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../../alert/alert.service';
import { MessageService } from '../../shared/messages/message.service';
import { CharacterService } from '../character.service';
import { Character } from '../characterModels/character';
import {
  Fairy,
  Gerudo,
  Goron,
  Hylian,
  Rito,
  Sheikah,
  Twili,
  Zora
} from '../characterModels/Races';
import { CharactersComponent } from '../characters.component';
import { CharacterCreateComponent } from './character-create.component';

const alertServiceStub: Partial<AlertService> = {};
const messageServiceStub: Partial<MessageService> = {};
const characterServiceStub: Partial<CharacterService> = {};

describe('CharacterCreateComponent', () => {
  let component: CharacterCreateComponent;
  let fixture: ComponentFixture<CharacterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [CharacterCreateComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: MessageService, useValue: messageServiceStub }
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
        component.newCharacter.attributes[0].value = 15;
        component.calcMod(component.newCharacter.attributes[0]);
        expect(component.newCharacter.attributes[0].modifier).toBe(2);
      });
      test('even stat value', () => {
        component.newCharacter.attributes[0].value = 16;
        component.calcMod(component.newCharacter.attributes[0]);
        expect(component.newCharacter.attributes[0].modifier).toBe(3);
      });
    });
    test('getMod should return the mod of the specified attribute', () => {
      component.newCharacter.attributes[1].modifier = 3;
      const modVal = component.getMod('Dexterity');
      expect(modVal).toBe(component.newCharacter.attributes[1].modifier);
    });
  });

  describe('go through all race changes and all sub race changes', () => {
    describe('hylian', () => {
      test('no sub', () => {
        component.newCharacter.race = 'Hylian';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
      });
      test('farmer', () => {
        const subRace = 'Farmer';
        component.newCharacter.race = 'Hylian';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(10);
      });
      test('guard', () => {
        const subRace = 'Guard';
        component.newCharacter.race = 'Hylian';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[2].value).toBe(10);
      });
      test('sheikah', () => {
        const subRace = 'Sheikah';
        component.newCharacter.race = 'Hylian';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Hylian);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
      });
    });
    describe('goron', () => {
      test('no sub', () => {
        component.newCharacter.race = 'Goron';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
      });
      test('soft belly', () => {
        const subRace = 'Soft Belly';
        component.newCharacter.race = 'Goron';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[4].value).toBe(9);
      });
      test('rock spine', () => {
        const subRace = 'Rock Spine';
        component.newCharacter.race = 'Goron';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Goron);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(10);
      });
    });
    describe('zora', () => {
      test('no sub', () => {
        component.newCharacter.race = 'Zora';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.attributes[1].value).toBe(10);
      });
      test('river', () => {
        const subRace = 'River';
        component.newCharacter.race = 'Zora';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[2].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
      });
      test('ocean', () => {
        const subRace = 'Ocean';
        component.newCharacter.race = 'Zora';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Zora);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[1].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(6);
        expect(component.newCharacter.attributes[0].value).toBe(10);
      });
      test('swamp', () => {
        const subRace = 'Swamp';
        component.newCharacter.race = 'Zora';
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
      test('no sub', () => {
        component.newCharacter.race = 'Rito';
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
      });
      test('sharp tongue', () => {
        const subRace = 'Sharp Tongue';
        component.newCharacter.race = 'Rito';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Rito);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[5].value).toBe(9);
      });
      test('sharp eye', () => {
        const subRace = 'Sharp Eye';
        component.newCharacter.race = 'Rito';
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
      test('', () => {
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
      });
      test('din', () => {
        const subRace = 'Din';
        component.newCharacter.race = 'Fairy';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
      });
      test('nayru', () => {
        const subRace = 'Nayru';
        component.newCharacter.race = 'Fairy';
        component.newCharacter.subRace = subRace;
        component.raceChange();
        expect(component.newCharacter).toBeInstanceOf(Fairy);
        expect(component.newCharacter.subRace).toBe(subRace);
        expect(component.newCharacter.attributes[0].value).toBe(6);
        expect(component.newCharacter.attributes[3].value).toBe(10);
        expect(component.newCharacter.attributes[4].value).toBe(10);
      });
      test('farore', () => {
        const subRace = 'Farore';
        component.newCharacter.race = 'Fairy';
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

  describe('track and validate commands', () => {
    describe('attribute specific', () => {
      test('track attr', () => {
        const startPoints = component.attPoints;
        component.newCharacter.attributes[2].value += 2;
        component.trackAtt(2);
        expect((component.attPoints = startPoints - 2));
        const prior = component.attrPrior[2];
        component.newCharacter.attributes[2].value += 1;
        component.trackAtt(2);
        expect((component.attPoints = prior - 1));
      });
      describe('validate attr', () => {
        test('regression value', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter.attributes[0].value;
          component.newCharacter.attributes[0].value--;
          component.trackAtt(0);
          expect(component.attPoints).toBe(startPoints + 1);
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.attPoints).toBe(startPoints);
          expect(component.newCharacter.attributes[0].value).toBe(startAttr);
        });
        test('overused points', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter.attributes[0].value;
          for (let i = 0; i <= startPoints; i++) {
            component.newCharacter.attributes[0].value++;
            component.trackAtt(0);
          }
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.attributes[0].value).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
        });
        test('overused points and re-adjust', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter.attributes[0].value;
          for (let i = 0; i <= startPoints; i++) {
            component.newCharacter.attributes[0].value++;
            component.trackAtt(0);
          }
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.attributes[0].value).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
          component.trackAtt(0);
          component.validateAttr(0);
          expect(document.getElementById('attr0').classList).not.toContain(
            'bad-input'
          );
          expect(component.newCharacter.attributes[0].value).toBe(
            startAttr + startPoints
          );
          expect(component.attrPrior[0]).toBe(startAttr + startPoints);
          expect(component.attPoints).toBe(0);
        });
        test('good input', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter.attributes[2].value;
          for (let i = 0; i < startPoints; i++) {
            component.newCharacter.attributes[2].value++;
            component.trackAtt(2);
          }
          component.validateAttr(2);
          expect(document.getElementById('attr0').classList).not.toContain(
            'bad-input'
          );
          expect(component.newCharacter.attributes[2].value).toBe(
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
        component.newCharacter.skills[0].ranks += 10;
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 10);
        component.newCharacter.skills[0].ranks += 5;
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 15);
      });
      describe('validate skill', () => {
        test('regression value', () => {
          const skillPointsStart = component.skillPoints;
          component.newCharacter.weaponSkills[0].ranks -= 10;
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.weaponSkillsPrior[0]).toBe(0);
          expect(component.skillPoints).toBe(skillPointsStart - 10);
        });
        test('overused points', () => {
          const skillStart = component.newCharacter.weaponSkills[0].ranks;
          const skillPointsStart = component.skillPoints;
          component.newCharacter.weaponSkills[0].ranks += skillPointsStart + 5;
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.weaponSkills[0].ranks).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
        });
        test('overused points and re-adjust', () => {
          const skillStart = component.newCharacter.weaponSkills[0].ranks;
          const skillPointsStart = component.skillPoints;
          component.newCharacter.weaponSkills[0].ranks += skillPointsStart + 5;
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(document.getElementById('weaponSkills0').classList).toContain(
            'bad-input'
          );
          expect(component.newCharacter.weaponSkills[0].ranks).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
          component.track(0, 'weaponSkills');
          component.validate(0, 'weaponSkills');
          expect(
            document.getElementById('weaponSkills0').classList
          ).not.toContain('bad-input');
          expect(component.newCharacter.weaponSkills[0].ranks).toBe(
            skillStart + skillPointsStart
          );
          expect(component.weaponSkillsPrior[0]).toBe(skillPointsStart);
          expect(component.skillPoints).toBe(0);
        });
        test('good input', () => {
          const skillPointsStart = component.skillPoints;
          for (let i = 0; i < skillPointsStart; i++) {
            component.newCharacter.magicSkills[0].ranks++;
          }
          component.track(0, 'magicSkills');
          component.validate(0, 'magicSkills');
          expect(component.newCharacter.magicSkills[0].ranks).toBe(
            skillPointsStart
          );
          expect(component.skillPoints).toBe(0);
        });
      });
    });
  });
});
