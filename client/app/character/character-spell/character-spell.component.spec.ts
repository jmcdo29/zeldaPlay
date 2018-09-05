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
    // tslint:disable-next-line:quotemark
    test("getMod should get a character's attributes modifier", () => {
      component.character.getAttributes()[4].setValue(20);
      expect(component.getMod('Wisdom')).toBe(5);
    });
  });
  describe('cast spell tests', () => {
    beforeEach(() => {
      const mySpell = new Spell(undefined, 'test spell', 'this is the spell effect', 4, 3, 10, 'Nayru', false, 'Wisdom');
      component.character.addSpell(mySpell);
    });
    afterEach(() => {
      component.character.getSpells().pop();
    });
    test('should fail with not enough magic', () => {
      component.character.setMagic(9);
      component.castSpell(0);
    });
    test('should succeed in casting spell', () => {
      component.character.getAttributes()[4].setValue(10);
      component.spellName = 'test spell';
      fixture.detectChanges();
      component.character.setMagic(15);
      component.castSpell(0);
      expect(component.dmgRoll).toBeTruthy();
    });
    test('should succeed in casting diety spell', () => {
      component.character.getSpells()[0].setUseDiety(true);
      component.character.getAttributes()[4].setValue(10);
      component.spellName = 'test spell';
      fixture.detectChanges();
      let critMissRoll = false;
      let critMissDmg = false;
      let critHit = false;
      let maxDmg = false;
      do {
        component.character.setMagic(15);
        component.castSpell(0);
        if (
          document.getElementById('spellRoll').classList.contains('critMiss')
        ) {
          critMissRoll = true;
        }
        if (
          document.getElementById('spellDmgRoll').classList.contains('critMiss')
        ) {
          critMissDmg = true;
        }
        if (document.getElementById('spellRoll').classList.contains('crit')) {
          critHit = true;
        }
        if (document.getElementById('spellDmgRoll').classList.contains('max')) {
          maxDmg = true;
        }
      } while (!(critMissRoll && critMissDmg && critHit && maxDmg));
      expect(component.dmgRoll).toBeTruthy();
    });
    test('cast spell with no useDiety and no modifier', () => {
      component.character.getSpells()[0].setModifier('');
      component.spellName = 'test spell';
      fixture.detectChanges();
      component.castSpell(0);
      expect(component.dmgRoll).toBeTruthy();
    });
  });
  describe('save spell', () => {
    test('should not save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
      expect(component.spellArray).toHaveLength(0);
    });
    test('should save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell(undefined, 'my Spell', 'some effect', 8, 2, 5, 'Nayru', false, 'Wisdom');
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
      expect(component.spellArray).toHaveLength(1);
      component.spellArray.pop();
    });
  });
  describe('validate spell', () => {
    beforeEach(() => {
      const mySpell = new Spell(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      component.spell = mySpell;
      component.newSpell = true;
      fixture.detectChanges();
    });
    test('should not validate spell (Bad Effect)', () => {
      component.spell.setEffect('Th!s is bad.');
      component.validate('spellEffect', 'effect');
    });
    test('should not validate spell (Bad Name)', () => {
      component.spell.setName('B4d');
      component.validate('spellName', 'name');
    });
    test('should not validate spell (Number)', () => {
      component.validate('spellDam', 'damage');
      component.spell.setDamage(5);
      component.validate('spellDam', 'damage');
      component.validate('spellDam', 'damage');
    });
    test('should not validate spell (String)', () => {
      component.validate('spellMod', 'modifier');
      component.spell.setModifier('Wisdom');
      component.validate('spellMod', 'modifier');
    });
    test('should validate the spell', () => {
      component.spell.setName('my Spell');
      component.spell.setEffect('some effect');
      component.spell.setDiety('Nayru');
      component.spell.setDamage(8);
      component.spell.setModifier('Wisdom');
      component.spell.setMultiplier(2);
      component.spell.setUseDiety(false);
      component.spell.setMpUse(5);
      component.validate('spellName', 'name');
    });
  });
});
