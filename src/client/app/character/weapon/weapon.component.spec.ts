import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';
import { Elemental } from '#Models/weapons/elemental';
import { Weapon } from '#Models/weapons/weapon';
import { MessageService } from '#Shared/messages/message.service';
import { SharedModule } from '#Shared/shared.module';
import { WeaponComponent } from './weapon.component';
import { WeaponService } from './weapon.service';

const sSword = 'Short Sword';

let messageServiceStub: Partial<MessageService>;

messageServiceStub = {
  add(message) {
    return message;
  }
};

describe('WeaponComponent', () => {
  let component: WeaponComponent;
  let fixture: ComponentFixture<WeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, SharedModule],
      declarations: [WeaponComponent],
      providers: [
        { provide: MessageService, useValue: messageServiceStub },
        WeaponService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });
  test('should create', () => {
    expect(component).toBeTruthy();
  });
  test('should split "18,19,20" to [18, 19, 20]', () => {
    component.weapon.critRange = '18,19,20' as any;
    component.setCrit();
    expect(component.weapon.critRange[0]).toBe(18);
    expect(component.weapon.critRange[1]).toBe(19);
    expect(component.weapon.critRange[2]).toBe(20);
  });
  test('should set isRangedWeapon', () => {
    component.weapon.type = 'Bow';
    component.checkForRanged();
    expect(component.isRangedWeapon);
  });
  test('make the roll', () => {
    const roll = component.roll(6);
    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
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
      component.character.weapons.pop();
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
      test('should not show all ranged errors', () => {
        component.isRangedWeapon = true;
        component.weapon.range = 30;
        component.weapon.ammo = 10;
        fixture.detectChanges();
        component.saveWeapon();
        expect(component.character.weapons).toHaveLength(0);
        component.isRangedWeapon = false;
      });
    });
    describe('elemental weapon specifics', () => {
      test('should show all elemental errors', () => {
        component.isElemental = true;
        component.elemental = new Elemental();
        fixture.detectChanges();
        component.saveWeapon();
        expect(component.character.weapons).toHaveLength(0);
        component.isElemental = false;
      });
      test('should not show all elemental errors', () => {
        component.isElemental = true;
        component.elemental = new Elemental(undefined, 'lightning', 3, 2);
        fixture.detectChanges();
        component.saveWeapon();
        expect(component.character.weapons).toHaveLength(0);
        component.isElemental = false;
      });
    });
    test('should save weapon if there are no errors', () => {
      component.weapon = new Weapon(
        undefined,
        'weapon',
        8,
        1,
        [18, 19, 20],
        3,
        sSword,
        'Strength',
        0
      );
      component.saveWeapon();
      expect(component.character.weapons).toHaveLength(1);
    });
  });
  describe('validation function tests', () => {
    beforeEach(() => {
      component.weapon = new Weapon();
    });
    afterEach(() => {
      component.weapon = null;
    });
    test('test weapon key string validate', () => {
      component.validate('weaponName', 'name');
      expect(document.getElementById('weaponName').classList).toContain(
        'bad-input'
      );
      component.weapon.name = 'b4d weapon name';
      component.validate('weaponName', 'name');
      expect(document.getElementById('weaponName').classList).toContain(
        'bad-input'
      );
      component.weapon.name = 'weapon name';
      component.validate('weaponName', 'name');
      expect(document.getElementById('weaponName').classList).not.toContain(
        'bad-input'
      );
    });
    test('test weapon key number validate', () => {
      component.validate('weaponDam', 'attack');
      expect(document.getElementById('weaponDam').classList).toContain(
        'bad-input'
      );
      component.weapon.attack = 8;
      component.validate('weaponDam', 'attack');
      expect(document.getElementById('weaponDam').classList).not.toContain(
        'bad-input'
      );
    });
    describe('elemental validations', () => {
      beforeEach(() => {
        component.isElemental = false;
        component.makeElement();
        component.isElemental = true;
        fixture.detectChanges();
      });
      afterEach(() => {
        component.makeElement();
      });
      test('test element key string validate', () => {
        component.validateElement('eType', 'type');
        expect(document.getElementById('eType').classList).toContain(
          'bad-input'
        );
        component.elemental.type = 'Fire';
        component.validateElement('eType', 'type');
        expect(document.getElementById('eType').classList).not.toContain(
          'bad-input'
        );
      });
    });
  });
  describe('Attack Rolls', () => {
    beforeEach(() => {
      const myWep = new Weapon(
        undefined,
        'weapon',
        8,
        1,
        [18, 19, 20],
        3,
        sSword,
        'Strength',
        0
      );
      component.character.addWeapon(myWep);
      component.character.weaponSkills[Weapons[sSword]].trained = true;
      component.character.attributes[0].value = 10;
    });
    afterEach(() => {
      component.character.weapons.pop();
    });
    test('test making an attack roll', () => {
      component.attack(0);
      expect(component.weaponName).toBe('weapon');
      expect(component.rollToHit).toBeTruthy();
      expect(component.dmgRoll).toBeTruthy();
      for (let i = 0; i < 25; i++) {
        component.attack(0);
      }
    });
    test('make attack rlls with element', () => {
      const myElem: Elemental = new Elemental(undefined, 'Fire', 8, 1);
      component.character.weapons[0].element = myElem;
      component.character.weaponSkills[Weapons[sSword]].trained = false;
      for (let i = 0; i < 25; i++) {
        component.attack(0);
      }
    });
  });
});
