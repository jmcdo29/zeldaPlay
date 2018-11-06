import { Component, Input, OnInit } from '@angular/core';

import { Attributes } from '#Enums/attributes.enum';
import { Elements } from '#Enums/elements.enum';
import { Weapons } from '#Enums/weapon-skills.enum';

import { Character } from '#Models/character';
import { Elemental } from '#Models/weapons/elemental';
import { Weapon } from '#Models/weapons/weapon';

import { MessageService } from '#Shared/messages/message.service';
import { WeaponService } from './weapon.service';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnInit {
  @Input()
  character: Character;

  allWeapons = Weapons;
  attributes = Attributes;

  newWeapon = false;

  showWeapon = true;

  weapon: Weapon;
  weapons: Weapon[] = [];

  isRangedWeapon = false;
  isElemental = false;

  elemental: Elemental;
  elements = Elements;

  weaponName: string;
  rollToHit: number;
  dmgRoll: number;
  elemRoll: number;

  rangeList = [
    'Spear',
    'Halberd',
    'Bow',
    'Sling',
    'Naginata',
    'Boomerang',
    'Fire Rod',
    'Ice Rod',
    'Tornado Rod',
    'Sand Rod',
    'Lightning Rod',
    'Whip',
    'Ball & Chain'
  ];

  constructor(
    private readonly message: MessageService,
    private readonly weaponService: WeaponService
  ) {}

  ngOnInit() {
    this.weapon = new Weapon(
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
    if (this.character.weapons.length === 0) {
      this.weaponService.getWeapons(this.character.id).subscribe((weapons) => {
        weapons.forEach((weapon) => {
          this.character.addWeapon(weapon);
        });
      });
    }
  }

  addWeapon(): void {
    this.newWeapon = !this.newWeapon;
  }

  saveWeapon(): void {
    let error = false;
    if (this.elemental) {
      this.weapon.element = this.elemental;
    }
    if (!this.weapon.name) {
      error = true;
      document.getElementById('weaponName').classList.add('bad-input');
    }
    if (!this.weapon.type) {
      error = true;
      document.getElementById('weaponType').classList.add('bad-input');
    }
    if (!this.weapon.numberOfAttacks) {
      error = true;
      document.getElementById('weaponMult').classList.add('bad-input');
    }
    if (!this.weapon.attack) {
      error = true;
      document.getElementById('weaponDam').classList.add('bad-input');
    }
    if (!this.weapon.critRange) {
      error = true;
      document.getElementById('critRange').classList.add('bad-input');
    }
    if (!this.weapon.critDamage) {
      error = true;
      document.getElementById('weaponCrit').classList.add('bad-input');
    }
    if (!this.weapon.modifier) {
      error = true;
      document.getElementById('weaponMod').classList.add('bad-input');
    }
    if (this.isRangedWeapon) {
      if (!this.weapon.range) {
        error = true;
        document.getElementById('weaponRange').classList.add('bad-input');
      }
      if (!this.weapon.ammo) {
        error = true;
        document.getElementById('weaponAmmo').classList.add('bad-input');
      }
    }
    if (this.isElemental) {
      if (!this.weapon.element.type) {
        error = true;
        document.getElementById('eType').classList.add('bad-input');
      }
      if (!this.weapon.element.numberOfAttacks) {
        error = true;
        document.getElementById('elementalMult').classList.add('bad-input');
      }
      if (!this.weapon.element.attack) {
        error = true;
        document.getElementById('elementDam').classList.add('bad-input');
      }
    }
    if (!error) {
      if (sessionStorage.getItem('currentUser')) {
        this.weaponService
          .newWeapon(this.character.id, this.weapon)
          .subscribe((retWeap) => {
            this.weapon = retWeap;
          });
      }
      this.character.addWeapon(this.weapon);
      this.addWeapon();
      this.createMessage();
      this.weapon = new Weapon(
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
    }
  }

  validate(id: string, key: string): void {
    if (!this.weapon[key]) {
      document.getElementById(id).classList.add('bad-input');
      this.weapon[key] = '';
    } else if (typeof this.weapon[key] === 'string') {
      if (
        this.weapon[key].trim() === '' ||
        (key === 'name' && !/^[a-zA-Z\s]+$/i.test(this.weapon[key]))
      ) {
        document.getElementById(id).classList.add('bad-input');
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    } else if (document.getElementById(id).classList.contains('bad-input')) {
      document.getElementById(id).classList.remove('bad-input');
    }
  }

  validateElement(id: string, key: string): void {
    if (!this.elemental[key]) {
      document.getElementById(id).classList.add('bad-input');
      this.elemental[key] = '';
    } else if (document.getElementById(id).classList.contains('bad-input')) {
      document.getElementById(id).classList.remove('bad-input');
    }
  }

  makeElement(): void {
    this.elemental = !this.isElemental
      ? new Elemental(undefined, undefined, undefined, undefined)
      : null;
  }

  checkForRanged(): void {
    this.isRangedWeapon = this.rangeList.includes(this.weapon.type);
  }

  setCrit(): void {
    const range = this.weapon.critRange.toString().split(',');
    const rangeArray = [];
    for (const int of range) {
      rangeArray.push(Number.parseInt(int, 10));
    }
    this.weapon.critRange = rangeArray;
  }

  createMessage(): void {
    const name = this.character.name;
    const weapon = this.character.weapons[this.character.weapons.length - 1];
    const weaponName = weapon.name;
    const weaponType = weapon.type;

    const message =
      name + ' added a ' + weaponType + ' called ' + weaponName + '.';

    this.message.add(message);
  }

  expandWeapon(): void {
    this.showWeapon = !this.showWeapon;
  }

  attack(weaponIndex: number): void {
    let elemDmg;
    let crit = false;
    // set up constants for the weapon attack.
    const character = this.character;
    const weapon = character.weapons[weaponIndex];
    const weapSkill = character.weaponSkills[Weapons[weapon.type]];
    const modifier = character.attributes[Attributes[weapon.modifier]];
    // make the roll to hit and see if the roll was a crit.
    const initialRoll = this.roll(20);
    if (weapon.critRange.includes(initialRoll)) {
      crit = true;
    }
    // the roll to hit adding the total weapon bonus and the weapon's modifier bonus.
    const rollWithBonus =
      initialRoll +
      weapSkill.ranks +
      (weapSkill.trained ? 3 : 0) +
      modifier.modifier;
    const dmgRoll =
      this.roll(weapon.attack) *
        weapon.numberOfAttacks *
        (crit ? weapon.critDamage : 1) +
      modifier.modifier;
    if (weapon.element && weapon.element != null) {
      elemDmg =
        this.roll(weapon.element.attack) * weapon.element.numberOfAttacks;
      this.elemRoll = elemDmg;
    } else {
      this.elemRoll = null;
    }
    this.attackMessage(
      character,
      weapon,
      rollWithBonus,
      dmgRoll,
      elemDmg,
      weapon.element
    );
    this.weaponName = weapon.name;
    this.rollToHit = rollWithBonus;
    this.dmgRoll = dmgRoll;
  }

  attackMessage(
    character: Character,
    weapon: Weapon,
    hit: number,
    dmg: number,
    elemDam?: number,
    elem?: Elemental
  ): void {
    const name = character.name;
    let rolled =
      ' rolled a ' +
      hit +
      ' to hit with ' +
      weapon.name +
      ' for ' +
      dmg +
      ' points of physical damage.';
    if (elemDam && elem) {
      rolled = rolled.replace(
        '.',
        ' and ' + elemDam + ' points of ' + elem.type + ' damage.'
      );
    }
    const message = name + rolled;
    this.message.add(message);
  }

  roll(mod: number): number {
    return (Math.round(Math.random() * 100) % mod) + 1;
  }
}
