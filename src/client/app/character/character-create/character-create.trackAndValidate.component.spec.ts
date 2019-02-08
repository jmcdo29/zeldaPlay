import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { AlertService } from '#Alert/alert.service';
import { characterReturn } from '#Mocks/characterRes.mock';
import { Character } from '#Models/character';
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

  describe('track and validate commands', () => {
    describe('attribute specific', () => {
      test('track attr', () => {
        const startPoints = component.attPoints;
        component.newCharacter.attributes[2].changeValue(2);
        component.trackAtt(2);
        expect((component.attPoints = startPoints - 2));
        const prior = component.attrPrior[2];
        component.newCharacter.attributes[2].changeValue(1);
        component.trackAtt(2);
        expect((component.attPoints = prior - 1));
      });
      describe('validate attr', () => {
        test('regression value', () => {
          const startPoints = component.attPoints;
          const startAttr = component.newCharacter.attributes[0].value;
          component.newCharacter.attributes[0].changeValue(-1);
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
            component.newCharacter.attributes[0].changeValue(1);
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
            component.newCharacter.attributes[0].changeValue(1);
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
            component.newCharacter.attributes[2].changeValue(1);
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
        component.newCharacter.skills[0].ranks =
          component.newCharacter.skills[0].ranks + 10;
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 10);
        component.newCharacter.skills[0].ranks =
          component.newCharacter.skills[0].ranks + 5;
        component.track(0, 'skills');
        expect(component.skillPoints).toBe(skillPointStart - 15);
      });
      describe('validate skill', () => {
        test('regression value', () => {
          const skillPointsStart = component.skillPoints;
          component.newCharacter.weaponSkills[0].ranks =
            component.newCharacter.weaponSkills[0].ranks - 10;
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
          component.newCharacter.weaponSkills[0].ranks =
            component.newCharacter.weaponSkills[0].ranks + 5 + skillPointsStart;
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
          component.newCharacter.weaponSkills[0].ranks =
            component.newCharacter.weaponSkills[0].ranks + 5 + skillPointsStart;
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
            component.newCharacter.magicSkills[0].ranks =
              component.newCharacter.magicSkills[0].ranks + 1;
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
