import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '#Models/character';
import { Skill } from '#Models/skill';
import { MessageService } from '#Shared/messages/message.service';
import { SharedModule } from '#Shared/shared.module';
import { SkillComponent } from './skill.component';
import { SkillService } from './skill.service';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, SharedModule],
      declarations: [SkillComponent],
      providers: [
        { provide: MessageService, useValue: messageServiceStub },
        SkillService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillComponent);
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
      component.character.skills[0].trained = true;
      component.character.attributes[1].value = 10;
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
      component.character.skills[0].trained = false;
      component.character.attributes[1].value = 10;
      component.makeCheck('Acrobatics');
    });
  });
});
