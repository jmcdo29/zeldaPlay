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
  originalPoints: number;

  error = false;

  attrMins: number[];
  attrPrior: number[];

  attPoints = 48;

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

  skillsPrior: number[];
  weaponPrior: number[];
  magicPrior: number[];

  newCharacter: Character;

  constructor() {}

  ngOnInit() {

    this.attrMins = new Array();
    this.attrPrior = new Array();
    this.skillsPrior = new Array();
    this.weaponPrior = new Array();
    this.magicPrior = new Array();

    this.newCharacter = new Character();
    this.originalPoints = this.skillPoints = (Math.round(Math.random() * 100) % 4 + 1) * 5;
    for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      this.attrMins.push(this.newCharacter.attributes[i].value);
    }
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
    let nullSubRace;
    if (this.newCharacter.race !== 'Gerudo' && this.newCharacter.race !== 'Sheikah' && this.newCharacter.race !== 'Twili') {
      nullSubRace = this.newCharacter.subRace ? false : true;
    } else {
      nullSubRace = false;
    }
    if (this.newCharacter.name != null && (this.skillPoints === 0 && this.attPoints === 0) && !nullSubRace) {
      this.newCharacter.health = 48 + this.newCharacter.attributes[2].modifier;
      this.newCharacter.magic = 20 + this.newCharacter.attributes[4].modifier;
      this.CharacterParent.newChar = false;
      this.CharacterParent.characters.push(this.newCharacter);
      this.CharacterParent.selectedCharacter = this.newCharacter;
    } else {
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
    this.resetPriors();
    this.attPoints = 48;
    this.skillPoints = this.originalPoints;
  }

  resetPriors(): void {
    for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      this.attrMins[i] = this.newCharacter.attributes[i].value;
    }
    for (let j = 0; j < this.attrPrior.length; j++) {
      this.attrPrior[j] = null;
    }
    for (let k = 0; k < this.skillsPrior.length; k++) {
      this.skillsPrior[k] = null;
    }
    for (let m = 0; m < this.weaponPrior.length; m++) {
      this.weaponPrior[m] = null;
    }
    for (let n = 0; n < this.magicPrior.length; n++) {
      this.magicPrior[n] = null;
    }
  }

  calcMod(stat: Attribute): void {
    stat.modifier =
      stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      if (this.newCharacter.attributes[i].name === modName) {
        return this.newCharacter.attributes[i].modifier;
      }
    }
  }

  closeError(): void {
    this.error = false;
  }

  trackAtt(attrIndex: number): void {
    const val = this.newCharacter.attributes[attrIndex].value;
    const modifier = val % 2 === 0 ? (val - 10) / 2 : (val - 11) / 2;
    this.newCharacter.attributes[attrIndex].modifier = modifier;
    if (this.attrPrior[attrIndex]) {
      this.attPoints = this.attPoints - (val - this.attrPrior[attrIndex]);
    } else {
      this.attPoints = this.attPoints - (val - this.attrMins[attrIndex]);
    }
    this.attrPrior[attrIndex] = val;
  }

  trackSkill(skillIndex: number): void {
    const val = this.newCharacter.skills[skillIndex].ranks;
    if (this.skillsPrior[skillIndex]) {
      this.skillPoints = this.skillPoints - (val - this.skillsPrior[skillIndex]);
    } else {
      this.skillPoints = this.skillPoints - val;
    }
    this.skillsPrior[skillIndex] = val;
  }

  trackWeapon(weaponIndex: number): void {
    const val = this.newCharacter.weaponSkills[weaponIndex].ranks;
    if (this.weaponPrior[weaponIndex]) {
      this.skillPoints = this.skillPoints - (val - this.weaponPrior[weaponIndex]);
    } else {
      this.skillPoints = this.skillPoints - val;
    }
    this.weaponPrior[weaponIndex] = val;
  }

  trackMagic(magicIndex: number): void {
    const val = this.newCharacter.magicSkills[magicIndex].ranks;
    if (this.magicPrior[magicIndex]) {
      this.skillPoints = this.skillPoints - (val - this.magicPrior[magicIndex]);
    } else {
      this.skillPoints = this.skillPoints - val;
    }
    this.magicPrior[magicIndex] = val;
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
    this.resetPriors();
    this.skillPoints = this.originalPoints;
  }

}
