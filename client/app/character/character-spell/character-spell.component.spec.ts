import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AlertService } from '../../alert/alert.service';
import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { Spell } from '../characterModels/spells';
import { CharacterSpellComponent } from './character-spell.component';

const alertServiceStub: Partial<AlertService> = {
  error(message, keepAfterNavigationChange = false) {
    return { message, type: 'error' };
  }
};
const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('CharacterSpellComponent', () => {
  let component: CharacterSpellComponent;
  let fixture: ComponentFixture<CharacterSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, HttpClientModule],
      declarations: [CharacterSpellComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: MessageService, useValue: messageServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('all the toggle and small functions', () => {
    test('expandSpell should toggle "showMagic"', () => {
      const showMagic = component.showMagic;
      component.expandMagic();
      expect(showMagic).not.toBe(component.showMagic);
      component.expandMagic();
      expect(showMagic).toBe(component.showMagic);
    });
    test('addSpell should toggle "newSpell"', () => {
      const newSpell = component.newSpell;
      component.addSpell();
      expect(newSpell).not.toBe(component.newSpell);
      expect(component.spell).toBeDefined();
      component.addSpell();
      expect(newSpell).toBe(component.newSpell);
    });
    test("getMod should get a character's attributes modifier", () => {
      component.character.attributes[4].modifier = 5;
      expect(component.getMod('Wisdom')).toBe(5);
    });
  });
  describe('cast spell tests', () => {
    beforeEach(() => {
      const mySpell = new Spell();
      mySpell.diety = 'Nayru';
      mySpell.damage = 4;
      mySpell.mpUse = 10;
      mySpell.multiplier = 3;
      mySpell.name = 'test spell';
      mySpell.useDiety = false;
      mySpell.effect = 'this is the spells effect';
      mySpell.modifier = 'Wisdom';
      component.character.spells.push(mySpell);
    });
    afterEach(() => {
      component.character.spells.pop();
    });
    test('should fail with not enough magic', () => {
      component.character.magic = 9;
      component.castSpell(0);
    });
    test('should succeed in casting spell', () => {
      component.character.magicSkills[2].ranks = 0;
      component.character.magicSkills[2].modifier = 'Wisdom';
      component.character.attributes[4].modifier = 0;
      component.spellName = 'test spell';
      fixture.detectChanges();
      for (let i = 0; i < 25; i++) {
        component.character.magic = 15;
        component.castSpell(0);
      }
      expect(component.dmgRoll).toBeTruthy();
    });
    test('should succeed in casting diety spell', () => {
      component.character.spells[0].useDiety = true;
      component.character.magicSkills[2].ranks = 0;
      component.character.magicSkills[2].modifier = 'Wisdom';
      component.character.attributes[4].modifier = 0;
      component.spellName = 'test spell';
      fixture.detectChanges();
      for (let i = 0; i < 25; i++) {
        component.character.magic = 15;
        component.castSpell(0);
      }
      expect(component.dmgRoll).toBeTruthy();
    });
  });
  describe('save spell', () => {
    test('should not save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell();
      mySpell.name = '';
      mySpell.effect = '';
      mySpell.diety = '';
      mySpell.damage = null;
      mySpell.modifier = '';
      mySpell.multiplier = null;
      mySpell.useDiety = false;
      mySpell.mpUse = null;
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
      expect(component.spellArray).toHaveLength(0);
    });
    test('should save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell();
      mySpell.name = 'my Spell';
      mySpell.effect = 'some effect';
      mySpell.diety = 'Nayru';
      mySpell.damage = 8;
      mySpell.modifier = 'Wisdom';
      mySpell.multiplier = 2;
      mySpell.useDiety = false;
      mySpell.mpUse = 5;
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
      expect(component.spellArray).toHaveLength(1);
      component.spellArray.pop();
    });
  });
  describe('validate spell', () => {
    beforeEach(() => {
      const mySpell = new Spell();
      mySpell.name = '';
      mySpell.effect = '';
      mySpell.diety = '';
      mySpell.damage = null;
      mySpell.modifier = '';
      mySpell.multiplier = null;
      mySpell.useDiety = false;
      mySpell.mpUse = null;
      component.spell = mySpell;
      component.newSpell = true;
      fixture.detectChanges();
    });
    test('should not validate spell (Bad Effect)', () => {
      component.spell.effect = 'Th!s is bad.';
      component.validate('spellEffect', 'effect');
    });
    test('should not validate spell (Bad Name)', () => {
      component.spell.name = 'B4d';
      component.validate('spellName', 'name');
    });
    test('should not validate spell (Number)', () => {
      component.validate('spellDam', 'damage');
      component.spell.damage = 5;
      component.validate('spellDam', 'damage');
    });
    test('should not validate spell (String)', () => {
      component.validate('spellMod', 'modifier');
      component.spell.modifier = 'Wisdom';
      component.validate('spellMod', 'modifier');
    });
    test('should validate the spell', () => {
      component.spell.name = 'my Spell';
      component.spell.effect = 'some effect';
      component.spell.diety = 'Nayru';
      component.spell.damage = 8;
      component.spell.modifier = 'Wisdom';
      component.spell.multiplier = 2;
      component.spell.useDiety = false;
      component.spell.mpUse = 5;
      component.validate('spellName', 'name');
    });
  });
});
