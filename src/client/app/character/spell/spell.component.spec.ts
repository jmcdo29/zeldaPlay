import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AlertService } from '#Alert/alert.service';
import { Character } from '#Models/character';
import { Spell } from '#Models/spells';
import { MessageService } from '#Shared/messages/message.service';
import { SharedModule } from '#Shared/shared.module';
import { SpellComponent } from './spell.component';
import { SpellService } from './spell.service';

const tSpell = 'test spell';

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

// tslint:disable-next-line:no-big-function
describe('SpellComponent', () => {
  let component: SpellComponent;
  let fixture: ComponentFixture<SpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, HttpClientModule],
      declarations: [SpellComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: MessageService, useValue: messageServiceStub },
        SpellService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellComponent);
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
      component.character.attributes[4].value = 20;
      expect(component.getMod('Wisdom')).toBe(5);
    });
  });
  describe('cast spell tests', () => {
    beforeEach(() => {
      const mySpell = new Spell(
        undefined,
        tSpell,
        'this is the spell effect',
        4,
        3,
        10,
        'Nayru',
        false,
        'Wisdom'
      );
      component.character.addSpell(mySpell);
    });
    afterEach(() => {
      component.character.spells.pop();
    });
    test('should fail with not enough magic', () => {
      component.character.magic = 9;
      component.castSpell(0);
    });
    test('should succeed in casting spell', () => {
      component.character.attributes[4].value = 10;
      component.spellName = tSpell;
      fixture.detectChanges();
      component.character.magic = 15;
      component.castSpell(0);
      expect(component.dmgRoll).toBeTruthy();
    });
    test('should succeed in casting diety spell', () => {
      component.character.spells[0].useDiety = true;
      component.character.attributes[4].value = 10;
      component.spellName = tSpell;
      fixture.detectChanges();
      let critMissRoll = false;
      let critMissDmg = false;
      let critHit = false;
      let maxDmg = false;
      do {
        component.character.magic = 15;
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
      component.character.spells[0].modifier = '';
      component.character.magic = 15;
      component.spellName = tSpell;
      fixture.detectChanges();
      component.castSpell(0);
      expect(component.dmgRoll).toBeTruthy();
    });
  });
  describe('save spell', () => {
    test('should not save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
    });
    test('should save spell', () => {
      component.newSpell = true;
      const mySpell = new Spell(
        undefined,
        'my Spell',
        'some effect',
        8,
        2,
        5,
        'Nayru',
        false,
        'Wisdom'
      );
      component.spell = mySpell;
      fixture.detectChanges();
      component.saveSpell();
      expect(component.character.spells).toHaveLength(1);
      component.character.spells.pop();
    });
  });
  describe('validate spell', () => {
    beforeEach(() => {
      const mySpell = new Spell(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
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
