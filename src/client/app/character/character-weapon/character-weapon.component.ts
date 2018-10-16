import { Component, Input, OnInit } from '@angular/core';

import { Attributes } from '#Enums/attributes.enum';
import { Elements } from '#Enums/elements.enum';
import { Weapons } from '#Enums/weapon-skills.enum';

import { Character } from '#Models/character';
import { Elemental } from '#Models/weapons/elemental';
import { Weapon } from '#Models/weapons/weapon';

import { MessageService } from '#Shared/messages/message.service';

@Component({
  selector: 'app-character-weapon',
  templateUrl: './character-weapon.component.html',
  styleUrls: ['./character-weapon.component.scss']
})
export class CharacterWeaponComponent implements OnInit {
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

  constructor(public message: MessageService) {}

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
    if (this.character.getWeapons()) {
      this.weapons = this.character.getWeapons();
    }
  }

  addWeapon(): void {
    this.newWeapon = !this.newWeapon;
  }

  saveWeapon(): void {
    let error = false;
    if (this.elemental) {
      this.weapon.setElement(this.elemental);
    }
    if (!this.weapon.getName()) {
      error = true;
      document.getElementById('weaponName').classList.add('bad-input');
    }
    if (!this.weapon.getType()) {
      error = true;
      document.getElementById('weaponType').classList.add('bad-input');
    }
    if (!this.weapon.getNOfA()) {
      error = true;
      document.getElementById('weaponMult').classList.add('bad-input');
    }
    if (!this.weapon.getAttack()) {
      error = true;
      document.getElementById('weaponDam').classList.add('bad-input');
    }
    if (!this.weapon.getCritRange()) {
      error = true;
      document.getElementById('critRange').classList.add('bad-input');
    }
    if (!this.weapon.getCritDamage()) {
      error = true;
      document.getElementById('weaponCrit').classList.add('bad-input');
    }
    if (!this.weapon.getModifier()) {
      error = true;
      document.getElementById('weaponMod').classList.add('bad-input');
    }
    if (this.isRangedWeapon) {
      if (!this.weapon.getRange()) {
        error = true;
        document.getElementById('weaponRange').classList.add('bad-input');
      }
      if (!this.weapon.getAmmo()) {
        error = true;
        document.getElementById('weaponAmmo').classList.add('bad-input');
      }
    }
    if (this.isElemental) {
      if (!this.weapon.getElement().getType()) {
        error = true;
        document.getElementById('eType').classList.add('bad-input');
      }
      if (!this.weapon.getElement().getNOfA()) {
        error = true;
        document.getElementById('elementalMult').classList.add('bad-input');
      }
      if (!this.weapon.getElement().getAttack()) {
        error = true;
        document.getElementById('elementDam').classList.add('bad-input');
      }
    }
    if (!error) {
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
    this.isRangedWeapon = this.rangeList.includes(this.weapon.getType());
  }

  setCrit(): void {
    const range = this.weapon
      .getCritRange()
      .toString()
      .split(',');
    const rangeArray = [];
    for (const int of range) {
      rangeArray.push(Number.parseInt(int, 10));
    }
    this.weapon.setCritRange(rangeArray);
  }

  createMessage(): void {
    const name = this.character.getName();
    const weapon = this.character.getWeapons()[
      this.character.getWeapons().length - 1
    ];
    const weaponName = weapon.getName();
    const weaponType = weapon.getType();

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
    const weapon = character.getWeapons()[weaponIndex];
    const weapSkill = character.getWeaponSkills()[Weapons[weapon.getType()]];
    const modifier = character.getAttributes()[
      Attributes[weapon.getModifier()]
    ];
    // make the roll to hit and see if the roll was a crit.
    const initialRoll = this.roll(20);
    if (weapon.getCritRange().includes(initialRoll)) {
      crit = true;
    }
    // the roll to hit adding the total weapon bonus and the weapon's modifier bonus.
    const rollWithBonus =
      initialRoll +
      weapSkill.getRanks() +
      (weapSkill.getTrained() ? 3 : 0) +
      modifier.getModifier();
    const dmgRoll =
      this.roll(weapon.getAttack()) *
        weapon.getNOfA() *
        (crit ? weapon.getCritDamage() : 1) +
      modifier.getModifier();
    if (weapon.getElement() && weapon.getElement() != null) {
      elemDmg =
        this.roll(weapon.getElement().getAttack()) *
        weapon.getElement().getNOfA();
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
      weapon.getElement()
    );
    this.weaponName = weapon.getName();
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
    const name = character.getName();
    let rolled =
      ' rolled a ' +
      hit +
      ' to hit with ' +
      weapon.getName() +
      ' for ' +
      dmg +
      ' points of physical damage.';
    if (elemDam && elem) {
      rolled = rolled.replace(
        '.',
        ' and ' + elemDam + ' points of ' + elem.getType() + ' damage.'
      );
    }
    const message = name + rolled;
    this.message.add(message);
  }

  roll(mod: number): number {
    return (Math.round(Math.random() * 100) % mod) + 1;
  }
}
