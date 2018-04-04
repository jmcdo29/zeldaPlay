import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';

@Component({
  selector: 'app-character-weapon',
  templateUrl: './character-weapon.component.html',
  styleUrls: ['./character-weapon.component.css']
})
export class CharacterWeaponComponent implements OnInit {

  @Input() character: Character;

  newWeapon = false;

  constructor() { }

  ngOnInit() {
  }

  addWeapon(): void {
    this.newWeapon = !this.newWeapon;
  }

}
