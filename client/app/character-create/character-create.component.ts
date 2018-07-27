import { Component, Input, OnInit } from '@angular/core';
import { CharactersComponent } from '../characters/characters.component';
import { Character } from '../_models/character';
import { Attribute } from '../_models/attribute';
import {
  Fairy,
  Gerudo,
  Goron,
  Hylian,
  Rito,
  Sheikah,
  Twili,
  Zora
} from '../_models/Races';
import { Attributes } from '../_enums/attributes.enum';
import { MessageService } from '../_services/message.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { CharacterService } from '../_services/character.service';

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

  attrMins: number[] = [];
  attrPrior: number[] = [];

  attPoints = 48;

  showRaceModal = false;

  showRace: boolean[] = [
    false, // Hylian 0
    false, // Goron 1
    false, // Zora 2
    false, // Gerudo 3
    false, // Sheikah 4
    false, // Rito 5
    false, // Twili 6
    false // Fairy 7
  ];

  skillsPrior: number[] = [];
  weaponSkillsPrior: number[] = [];
  magicSkillsPrior: number[] = [];

  nullSubRaceClasses = ['Sheikah', 'Gerudo', 'Twili'];

  newCharacter: Character;

  constructor(
    public message: MessageService,
    private router: Router,
    private alertService: AlertService,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    this.attrMins = [];
    this.attrPrior = [];
    this.skillsPrior = [];
    this.weaponSkillsPrior = [];
    this.magicSkillsPrior = [];

    this.newCharacter = new Character();
    this.originalPoints = this.skillPoints =
      ((Math.round(Math.random() * 100) % 4) + 1) * 5;
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
    let nullSubRace = false;
    if (!this.nullSubRaceClasses.includes(this.newCharacter.race)) {
      nullSubRace = this.newCharacter.subRace ? false : true;
    }
    if (
      this.newCharacter.name != null &&
      (this.skillPoints === 0 && this.attPoints === 0) &&
      !nullSubRace
    ) {
      this.newCharacter.maxHealth = this.newCharacter.health =
        48 + this.newCharacter.attributes[2].modifier;
      this.newCharacter.maxMagic = this.newCharacter.magic =
        20 + this.newCharacter.attributes[4].modifier;
      this.CharacterParent.newChar = false;
      this.CharacterParent.characters.push(this.newCharacter);
      this.CharacterParent.selectedCharacter = this.newCharacter;
      this.createMessage();
    } else {
      this.error = true;
    }
    if (localStorage.getItem('currentUser') && !this.error) {
      // save character to database
      this.characterService.saveCharDb(this.newCharacter).subscribe(response => {
        this.CharacterParent.selectedCharacter.id = response;
      });
    } else if (!this.error) {
      this.alertService.error('You must be logged in to save your character for re-use.');
    }
  }

  cancel(): void {
    this.CharacterParent.newChar = false;
    this.newCharacter = null;
  }

  raceChange(): void {
    const raceTemp = this.newCharacter.race;
    switch (this.newCharacter.race) {
      case 'Hylian': {
        this.newCharacter = new Hylian(
          this.newCharacter.subRace ? this.newCharacter.subRace : null
        );
        break;
      }
      case 'Goron': {
        this.newCharacter = new Goron(
          this.newCharacter.subRace ? this.newCharacter.subRace : null
        );
        break;
      }
      case 'Zora': {
        this.newCharacter = new Zora(
          this.newCharacter.subRace ? this.newCharacter.subRace : null
        );
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
        this.newCharacter = new Rito(
          this.newCharacter.subRace ? this.newCharacter.subRace : null
        );
        break;
      }
      case 'Twili': {
        this.newCharacter = new Twili();
        break;
      }
      case 'Fairy': {
        this.newCharacter = new Fairy(
          this.newCharacter.subRace ? this.newCharacter.subRace : null
        );
        break;
      }
    }
    this.resetPriors();
    this.attPoints = 48;
    this.skillPoints = this.originalPoints;
    this.newCharacter.race = raceTemp;
    this.newCharacter.level = 1;
    this.newCharacter.exp = 0;
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
    for (let m = 0; m < this.weaponSkillsPrior.length; m++) {
      this.weaponSkillsPrior[m] = null;
    }
    for (let n = 0; n < this.magicSkillsPrior.length; n++) {
      this.magicSkillsPrior[n] = null;
    }
  }

  calcMod(stat: Attribute): void {
    stat.modifier =
      stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
  }

  getMod(modName: string): number {
    return this.newCharacter.attributes[Attributes[modName]].modifier;
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

  track(index: number, type: string): void {
    const val = this.newCharacter[type][index].ranks;
    const PRIOR = 'Prior';
    if (this[type + PRIOR][index]) {
      this.skillPoints = this.skillPoints - (val - this[type + PRIOR][index]);
    } else {
      this.skillPoints = this.skillPoints - val;
    }
    this[type + PRIOR][index] = val;
  }

  validateAttr(attrIndex: number): void {
    const input = document.getElementById('attr' + attrIndex);
    if (
      this.newCharacter.attributes[attrIndex].value < this.attrMins[attrIndex]
    ) {
      input.classList.add('bad-input');
      this.attPoints +=
        this.newCharacter.attributes[attrIndex].value -
        this.attrMins[attrIndex];
      this.attrPrior[attrIndex] = this.newCharacter.attributes[
        attrIndex
      ].value = this.attrMins[attrIndex];
    } else if (this.attPoints < 0) {
      input.classList.add('bad-input');
      this.newCharacter.attributes[attrIndex].value += this.attPoints;
      this.attrPrior[attrIndex] = this.newCharacter.attributes[attrIndex].value;
      this.attPoints -= this.attPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }

  validate(index: number, type: string): void {
    const input = document.getElementById(type + index);
    const PRIOR = 'Prior';
    if (this.newCharacter[type][index].ranks < 0) {
      input.classList.add('bad-input');
      this.skillPoints += this.newCharacter[type][index].ranks;
      this[type + PRIOR][index] = this.newCharacter[type][index].ranks = 0;
    } else if (this.skillPoints < 0) {
      input.classList.add('bad-input');
      this.newCharacter[type][index].ranks += this.skillPoints;
      this[type + PRIOR][index] = this.newCharacter[type][index].ranks;
      this.skillPoints -= this.skillPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
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

  createMessage(): void {
    const name = this.newCharacter.name;
    const race = this.newCharacter.race;
    const subRace = this.newCharacter.subRace
      ? this.newCharacter.subRace + ' '
      : '';
    const message = name + ' the ' + subRace + race + ' was created.';

    this.message.add(message);
  }
}
