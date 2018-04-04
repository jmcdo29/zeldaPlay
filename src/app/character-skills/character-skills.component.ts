import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.css']
})
export class CharacterSkillsComponent implements OnInit {

  @Input() character: Character;

  showSkills = true;
  showWeapon = true;
  showMagic = true;

  constructor() { }

  ngOnInit() {
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.character.attributes.length; i++) {
      if (this.character.attributes[i].name === modName) {
        return this.character.attributes[i].modifier;
      }
    }
  }

  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  expandWeapon(): void {
    this.showWeapon = !this.showWeapon;
  }

  expandMagic(): void {
    this.showMagic = !this.showMagic;
  }

}
