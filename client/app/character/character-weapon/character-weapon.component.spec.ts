import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { Weapons } from '../characterModels/enums/weapon-skills.enum';
import { Weapon } from '../characterModels/Weapons/weapon';
import { CharacterWeaponComponent } from './character-weapon.component';

let messageServiceStub: Partial<MessageService>;

messageServiceStub = {
  add(message) {
    return message;
  }
};

describe('CharacterWeaponComponent', () => {
  let component: CharacterWeaponComponent;
  let fixture: ComponentFixture<CharacterWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterWeaponComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterWeaponComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('toggle options', () => {
    test('should toggle "showWeapons"', () => {
      const showW = component.showWeapon;
      component.expandWeapon();
      expect(component.showWeapon).not.toBe(showW);
      component.expandWeapon();
      expect(component.showWeapon).toBe(showW);
    });
    test('should toggle "newWeapon"', () => {
      const newW = component.newWeapon;
      component.addWeapon();
      expect(component.newWeapon).not.toBe(newW);
      component.addWeapon();
      expect(component.newWeapon).toBe(newW);
    });
  });
  describe('save weapon functionality', () => {
    beforeEach(() => {
      component.weapon = new Weapon();
    });
    afterAll(() => {
      component.character.weapons = [];
    });
    test('should go through all errors', () => {
      component.saveWeapon();
      expect(component.character.weapons).toHaveLength(0);
    });
    describe('range weapon specifics', () => {
      test('should show all ranged errors', () => {
        component.isRangedWeapon = true;
        component.weapon.range = null;
        component.weapon.ammo = null;
        fixture.detectChanges();
        component.saveWeapon();
        expect(component.character.weapons).toHaveLength(0);
        component.isRangedWeapon = false;
      });
    });
    describe('elemental weapon specifics', () => {
      test('should show all elemental errors', () => {
        component.isElemental = true;
        component.elemental = {
          type: null,
          numberOfAttacks: null,
          attack: null
        };
        fixture.detectChanges();
        component.saveWeapon();
        expect(component.character.weapons).toHaveLength(0);
        component.isElemental = false;
      });
    });
    test('should save weapon if there are no errors', () => {
      component.weapon = {
        name: 'weapon',
        attack: 8,
        numberOfAttacks: 1,
        modifier: 'strength',
        type: 'short sword',
        critDamage: 3,
        critRange: [18, 19, 20],
        range: null,
        ammo: null
      };
      component.saveWeapon();
      expect(component.character.weapons).toHaveLength(1);
    });
  });
  test('should split "18,19,20" to [18, 19, 20]', () => {
    component.weapon.critRange = '18,19,20' as any;
    component.setCrit();
    expect(component.weapon.critRange[0]).toBe(18);
    expect(component.weapon.critRange[1]).toBe(19);
    expect(component.weapon.critRange[2]).toBe(20);
  });
  test('should set isRangedWeapon', () => {
    component.weapon.type = 'bow';
    component.checkForRanged();
    expect(component.isRangedWeapon);
  });
  test('make the roll', () => {
    const roll = component.roll(6);
    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
  });
  test('test making an attack roll', () => {
    const myWep = {
      name: 'weapon',
      attack: 8,
      numberOfAttacks: 1,
      modifier: 'Strength',
      type: 'Short Sword',
      critDamage: 3,
      critRange: [18, 19, 20],
      range: null,
      ammo: null
    };
    component.character.weapons = [myWep];
    component.character.weaponSkills[Weapons['Short Sword']] = {
      skillName: 'Short Sword',
      ranks: 0,
      modifier: 'Strength',
      trained: true
    };
    component.character.attributes[0] = {
      name: 'Strength',
      value: 10,
      modifier: 0
    };
    component.attack(0);
    expect(component.weaponName).toBe(myWep.name);
    expect(component.rollToHit).toBeTruthy();
    expect(component.dmgRoll).toBeTruthy();
    for (let i = 0; i < 50; i++) {
      component.attack(0);
    }
  });
});
