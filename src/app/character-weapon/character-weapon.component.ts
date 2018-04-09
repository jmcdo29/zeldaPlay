import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';
import { Weapon, RangedWeapon } from '../Character/Weapons/weapon';

@Component({
  selector: 'app-character-weapon',
  templateUrl: './character-weapon.component.html',
  styleUrls: ['./character-weapon.component.css']
})
export class CharacterWeaponComponent implements OnInit {

  @Input() character: Character;

  newWeapon = false;

  mWeapon: Weapon;
  meleeWeapons: Weapon[];

  rWeapon: RangedWeapon;
  rangedWeapons: RangedWeapon[];

  constructor() { }

  ngOnInit() {
    this.mWeapon = new Weapon();
    this.rWeapon = new RangedWeapon();
    this.meleeWeapons = this.character.meleeWeapons;
    this.rangedWeapons = this.character.rangedWeapons;
  }

  addWeapon(): void {
    this.newWeapon = !this.newWeapon;
  }

  saveWeapon(): void {

  }

  validate(id: string, key: string): void {

  }

}
