import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';
import { Weapon } from '../Character/Weapons/weapon';

import { Weapons } from '../Character/Enums/weapon-skills.enum';
import { Attributes } from '../Character/Enums/attributes.enum';
import { Elements } from '../Character/Enums/elements.enum';

import { Elemental } from '../Character/Weapons/elemental';

@Component({
  selector: 'app-character-weapon',
  templateUrl: './character-weapon.component.html',
  styleUrls: ['./character-weapon.component.css']
})
export class CharacterWeaponComponent implements OnInit {
  @Input() character: Character;

  allWeapons = Weapons;
  attributes = Attributes;

  newWeapon = false;

  weapon: Weapon;
  weapons: Weapon[];

  isRangedWeapon = false;
  isElemental = false;

  elemental: Elemental;
  elements = Elements;

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

  constructor() {}

  ngOnInit() {
    this.weapon = new Weapon();
    if (this.character.weapons) {
      this.weapons = this.character.weapons;
    } else {
      this.weapons = new Array();
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
    if (! this.weapon.name) {
      error = true;
      document.getElementById('weaponName').classList.add('bad-input');
    }
    if (! this.weapon.type) {
      error = true;
      document.getElementById('weaponType').classList.add('bad-input');
    }
    if (! this.weapon.numberOfAttacks) {
      error = true;
      document.getElementById('weaponMult').classList.add('bad-input');
    }
    if (! this.weapon.attack) {
      error = true;
      document.getElementById('weaponDam').classList.add('bad-input');
    }
    if (! this.weapon.critRange) {
      error = true;
      document.getElementById('critRange').classList.add('bad-input');
    }
    if (! this.weapon.critDamage) {
      error = true;
      document.getElementById('weaponCrit').classList.add('bad-input');
    }
    if (! this.weapon.modifier) {
      error = true;
      document.getElementById('weaponMod').classList.add('bad-input');
    }
    if (this.isRangedWeapon) {
      if (! this.weapon.range) {
        error = true;
        document.getElementById('weaponRange').classList.add('bad-input');
      }
      if (! this.weapon.ammo) {
        error = true;
        document.getElementById('weaponAmmo').classList.add('bad-input');
      }
    }
    if (this.isElemental) {
      if (! this.weapon.element.type) {
        error = true;
        document.getElementById('eType').classList.add('bad-input');
      }
      if (! this.weapon.element.numberOfAttacks) {
        error = true;
        document.getElementById('elementalMult').classList.add('bad-input');
      }
      if (! this.weapon.element.attack) {
        error = true;
        document.getElementById('elementDam').classList.add('bad-input');
      }
    }
    if (! error) {
      this.weapons.push(this.weapon);
      this.character.weapons = this.weapons;
      this.weapon = new Weapon();
      this.addWeapon();
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
    } else {
      if (this.weapon[key] === '') {
        document.getElementById(id).classList.add('bad-input');
        this.weapon[key] = '';
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    }
  }

  validateElement(id: string, key: string): void {
    if (!this.elemental[key]) {
      document.getElementById(id).classList.add('bad-input');
      this.elemental[key] = '';
    } else if (typeof this.elemental[key] === 'string') {
      if (
        this.elemental[key].trim() === '' ||
        (key === 'name' && !/^[a-zA-Z\s]+$/i.test(this.elemental[key]))
      ) {
        document.getElementById(id).classList.add('bad-input');
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    } else {
      if (this.elemental[key] === '') {
        document.getElementById(id).classList.add('bad-input');
        this.elemental[key] = '';
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    }
  }

  makeElement(): void {
    if (this.isElemental) {
      this.elemental = {
        'type': '', 'attack': null, 'numberOfAttacks': null
      };
    } else {
      this.elemental = null;
    }
    console.log(this.elemental);
  }

  checkForRanged(): void {
    if (this.rangeList.includes(this.weapon.type)) {
      this.isRangedWeapon = true;
    } else {
      this.isRangedWeapon = false;
    }
  }

  setCrit(): void {
    const range = this.weapon.critRange.toString().split(',');
    const rangeArray = new Array();
    for (let i = 0; i < range.length; i++) {
      rangeArray.push(Number.parseInt(range[i]));
    }
    this.weapon.critRange = rangeArray;
  }
}
