import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { Skill } from '../characterModels/skill';
import { CharacterSkillsComponent } from './character-skills.component';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('CharacterSkillsComponent', () => {
  let component: CharacterSkillsComponent;
  let fixture: ComponentFixture<CharacterSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterSkillsComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillsComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('toggle functions', () => {
    test('expandSkill', () => {
      const showSkill = component.showSkills;
      component.expandSkill();
      expect(component.showSkills).not.toBe(showSkill);
      component.expandSkill();
      expect(component.showSkills).toBe(showSkill);
    });
    test('hide skill check', () => {
      component.skill = 'Craft One';
      component.checkVal = 17;
      component.hideCheck();
      expect(component.skill).toBeNull();
      expect(component.checkVal).toBeNull();
    });
  });
  describe('making checks', () => {
    beforeEach(() => {
      component.skill = 'Acrobatics';
      component.checkVal = 1;
      component.showSkills = true;
      fixture.detectChanges();
    });
    test('should make a check for trained Acrobatics', () => {
      const mySkill = new Skill();
      mySkill.skillName = 'Acrobatics';
      mySkill.ranks = 0;
      mySkill.trained = true;
      mySkill.misc = 0;
      mySkill.item = 0;
      mySkill.racial = 0;
      mySkill.modifier = 'Dexterity';
      component.character.skills[0] = mySkill;
      component.character.attributes[1] = {
        name: 'Dexterity',
        value: 10,
        modifier: 0
      };
      let critHit = false;
      let critMiss = false;
      do {
        component.makeCheck('Acrobatics');
        if (document.getElementById('roll').classList.contains('crit')) {
          critHit = true;
        }
        if (document.getElementById('roll').classList.contains('critMiss')) {
          critMiss = true;
        }
      } while (!(critHit && critMiss));
    });
    test('should make a check for untrained Acrobatics', () => {
      const mySkill = new Skill();
      mySkill.skillName = 'Acrobatics';
      mySkill.ranks = 0;
      mySkill.trained = false;
      mySkill.misc = 0;
      mySkill.item = 0;
      mySkill.racial = 0;
      mySkill.modifier = 'Dexterity';
      component.character.skills[0] = mySkill;
      component.character.attributes[1] = {
        name: 'Dexterity',
        value: 10,
        modifier: 0
      };
      component.skill = 'Acrobatics';
      component.checkVal = 0;
      fixture.detectChanges();
      component.makeCheck('Acrobatics');
    });
  });
});
