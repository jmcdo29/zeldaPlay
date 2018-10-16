import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '#Models/character';
import { Skill } from '#Models/skill';
import { MessageService } from '#Shared/messages/message.service';
import { SharedModule } from '#Shared/shared.module';
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
      component.character.getSkills()[0].setTrained(true);
      component.character.getAttributes()[1].setValue(10);
      let critHit = false;
      let critMiss = false;
      fixture.detectChanges();
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
      component.character.getSkills()[0].setTrained(false);
      component.character.getAttributes()[1].setValue(10);
      component.makeCheck('Acrobatics');
    });
  });
});
