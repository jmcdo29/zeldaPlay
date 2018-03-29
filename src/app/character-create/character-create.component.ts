import { Component, Input, OnInit } from '@angular/core';
import { CharactersComponent } from '../characters/characters.component';
import { Character } from '../Character/character';
import { Attribute } from '../Character/attribute';
import { Hylian } from '../Races/Hylian';
import { Goron } from '../Races/Goron';
import { Zora } from '../Races/Zora';
import { Gerudo } from '../Races/Gerudo';
import { Sheikah } from '../Races/Sheikah';
import { Rito } from '../Races/Rito';
import { Twili } from '../Races/Twili';
import { Fairy } from '../Races/Fairy';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.css']
})
export class CharacterCreateComponent implements OnInit {
  @Input() CharacterParent: CharactersComponent;

  skillPoints: number;
  pointsUsed = 0;

  error = false;

  strMin: number;
  dexMin: number;
  conMin: number;
  intMin: number;
  wisMin: number;
  chaMin: number;

  attPoints = 48;
  attPointsUsed = 0;

  showRaceModal = false;

  showRace: boolean[] = [
    false,    // Hylian 0
    false,    // Goron 1
    false,    // Zora 2
    false,    // Gerudo 3
    false,    // Sheikah 4
    false,    // Rito 5
    false,    // Twili 6
    false     // Fairy 7
  ];

  newCharacter: Character;

  constructor() {}

  ngOnInit() {
    this.newCharacter = new Character();
    this.skillPoints = (Math.round(Math.random() * 100) % 4 + 1) * 5;
    this.strMin = this.newCharacter.attributes[0].value;
    this.dexMin = this.newCharacter.attributes[1].value;
    this.conMin = this.newCharacter.attributes[2].value;
    this.intMin = this.newCharacter.attributes[3].value;
    this.wisMin = this.newCharacter.attributes[4].value;
    this.chaMin = this.newCharacter.attributes[5].value;
  }

  aboutRace(): void {
    this.showRaceModal = !this.showRaceModal;
  }

  show(race: number): void {
    for (let i = 0; i < this.showRace.length; i++) {
      this.showRace[i] = false;
    }
    this.showRace[race] = true;
  }

  save(): void {
    if (this.newCharacter.name != null && (this.pointsUsed < this.skillPoints && this.attPointsUsed < this.attPoints)) {
      this.newCharacter.health = 48 + this.newCharacter.attributes[2].modifier;
      this.newCharacter.magic = 20 + this.newCharacter.attributes[4].modifier;
      this.CharacterParent.newChar = false;
      this.CharacterParent.characters.push(this.newCharacter);
      this.CharacterParent.selectedCharacter = this.newCharacter;
    } else {
      for (let i = 0; i < this.newCharacter.skills.length; i++) {
        this.newCharacter.skills[i].ranks = 0;
      }
      for (let i = 0; i < this.newCharacter.weaponSkills.length; i++) {
        this.newCharacter.weaponSkills[i].ranks = 0;
      }
      for (let i = 0; i < this.newCharacter.magicSkills.length; i++) {
        this.newCharacter.magicSkills[i].ranks = 0;
      }
      this.newCharacter.attributes[0].value = this.strMin;
      this.newCharacter.attributes[1].value = this.dexMin;
      this.newCharacter.attributes[2].value = this.conMin;
      this.newCharacter.attributes[3].value = this.intMin;
      this.newCharacter.attributes[4].value = this.wisMin;
      this.newCharacter.attributes[5].value = this.chaMin;
      this.pointsUsed = 0;
      this.attPointsUsed = 0;
      this.error = true;
    }
  }

  cancel(): void {
    this.CharacterParent.newChar = false;
    this.newCharacter = null;
  }

  raceChange(): void {
    switch (this.newCharacter.race) {
      case 'Hylian': {
        this.newCharacter = new Hylian(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case 'Goron': {
        this.newCharacter = new Goron(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case 'Zora': {
        this.newCharacter = new Zora(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case 'Gerudo': {
        this.newCharacter = new Gerudo();
        break;
      }
      case 'Sheikah': {
        this.newCharacter = new Sheikah();
        break;
      }
      case 'Rito': {
        this.newCharacter = new Rito(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case 'Twili': {
        this.newCharacter = new Twili();
        break;
      }
      case 'Fairy': {
        this.newCharacter = new Fairy(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
    }
    this.strMin = this.newCharacter.attributes[0].value;
    this.dexMin = this.newCharacter.attributes[1].value;
    this.conMin = this.newCharacter.attributes[2].value;
    this.intMin = this.newCharacter.attributes[3].value;
    this.wisMin = this.newCharacter.attributes[4].value;
    this.chaMin = this.newCharacter.attributes[5].value;
  }

  calcMod(stat: Attribute): void {
    stat.modifier =
      stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
  }

  calcModtemp(stat: number): number {
    return stat % 2 === 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      if (this.newCharacter.attributes[i].name === modName) {
        return this.newCharacter.attributes[i].modifier;
      }
    }
  }

  getMin(attr: number): number {
    switch (attr) {
      case 0: {
        return this.strMin;
      }
      case 1: {
        return this.dexMin;
      }
      case 2: {
        return this.conMin;
      }
      case 3: {
        return this.intMin;
      }
      case 4: {
        return this.wisMin;
      }
      case 5: {
        return this.chaMin;
      }
    }
  }

  usePoint(): void {
    let used = 0;
    for (let i = 0; i < this.newCharacter.skills.length; i++) {
      used += this.newCharacter.skills[i].ranks;
    }
    for (let i = 0; i < this.newCharacter.weaponSkills.length; i++) {
      used += this.newCharacter.weaponSkills[i].ranks;
    }
    for (let i = 0; i < this.newCharacter.magicSkills.length; i++) {
      used += this.newCharacter.magicSkills[i].ranks;
    }
    this.pointsUsed = used;
  }

  closeError(): void {
    this.error = false;
  }

  trackAtt(): void {
    let used = 0;

    used += this.newCharacter.attributes[0].value - this.strMin;
    used += this.newCharacter.attributes[1].value - this.dexMin;
    used += this.newCharacter.attributes[2].value - this.conMin;
    used += this.newCharacter.attributes[3].value - this.intMin;
    used += this.newCharacter.attributes[4].value - this.wisMin;
    used += this.newCharacter.attributes[5].value - this.chaMin;

    this.attPointsUsed = used;
  }

  resetSkills(): void {
    for (let i = 0; i < this.newCharacter.skills.length; i++) {
      this.newCharacter.skills[i].ranks = 0;
    }
    for (let i = 0; i < this.newCharacter.weaponSkills.length; i++) {
      this.newCharacter.weaponSkills[i].ranks = 0;
    }
    for (let i = 0; i < this.newCharacter.magicSkills.length; i++) {
      this.newCharacter.magicSkills[i].ranks = 0;
    }
    this.pointsUsed = 0;
  }

  validateSkill(): void {
    return;
  }
}
