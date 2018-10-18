import { Component, Input, OnInit } from '@angular/core';

import { AlertService } from '#Alert/alert.service';
import { Attributes } from '#Enums/attributes.enum';
import { Magics } from '#Enums/magic-skills.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';
import {
  Fairy,
  Gerudo,
  Goron,
  Hylian,
  Rito,
  Sheikah,
  Twili,
  Zora
} from '#Models/Races';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterService } from '../character.service';
import { CharactersComponent } from '../characters.component';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  @Input()
  CharacterParent: CharactersComponent;

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
    for (const attr of this.newCharacter.getAttributes()) {
      this.attrMins.push(attr.getValue());
    }
    /* for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      this.attrMins.push(this.newCharacter.attributes[i].value);
    } */
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
    if (!this.nullSubRaceClasses.includes(this.newCharacter.getRace())) {
      nullSubRace = this.newCharacter.getSubRace() ? false : true;
    }
    if (
      this.newCharacter.getName() &&
      (this.skillPoints === 0 && this.attPoints === 0) &&
      !nullSubRace
    ) {
      this.newCharacter.setMaxHealth(
        48 + this.newCharacter.getAttributes()[2].getModifier()
      );
      this.newCharacter.setHealth(this.newCharacter.getMaxHealth());
      this.newCharacter.setMaxMagic(
        20 + this.newCharacter.getAttributes()[4].getModifier()
      );
      this.newCharacter.setMagic(this.newCharacter.getMaxMagic());
      this.CharacterParent.newChar = false;
      this.CharacterParent.characters.push(this.newCharacter);
      this.CharacterParent.selectedCharacter = this.newCharacter;
      this.createMessage();
    } else {
      this.error = true;
    }
    if (!this.error) {
      if (sessionStorage.getItem('currentUser')) {
        // save character to database
        this.characterService
          .saveNewCharDb(this.newCharacter)
          .subscribe((characterRes) => {
            return characterRes;
          });
        this.alertService.clear();
      } else {
        this.alertService.error(
          'You must be logged in to save your character for re-use.'
        );
      }
    } else {
      this.alertService.error('There was a problem with saving the character.');
    }
  }

  cancel(): void {
    this.CharacterParent.newChar = false;
    this.newCharacter = null;
  }

  raceChange(): void {
    const raceTemp = this.newCharacter.getRace();
    switch (this.newCharacter.getRace()) {
      case 'Hylian': {
        this.newCharacter = new Hylian(this.newCharacter.getSubRace());
        break;
      }
      case 'Goron': {
        this.newCharacter = new Goron(this.newCharacter.getSubRace());
        break;
      }
      case 'Zora': {
        this.newCharacter = new Zora(this.newCharacter.getSubRace());
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
        this.newCharacter = new Rito(this.newCharacter.getSubRace());
        break;
      }
      case 'Twili': {
        this.newCharacter = new Twili();
        break;
      }
      case 'Fairy': {
        this.newCharacter = new Fairy(this.newCharacter.getSubRace());
        break;
      }
    }
    this.resetPriors();
    this.attPoints = 48;
    this.skillPoints = this.originalPoints;
    this.newCharacter.setRace(raceTemp);
    this.newCharacter.setLevel(1);
    this.newCharacter.setExp(0);
  }

  resetPriors(): void {
    for (let i = 0; i < this.newCharacter.getAttributes().length; i++) {
      this.attrMins[i] = this.newCharacter.getAttributes()[i].getValue();
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

  getMod(modName: string): number {
    return this.newCharacter.getAttributes()[Attributes[modName]].getModifier();
  }

  closeError(): void {
    this.error = false;
  }

  trackAtt(attrIndex: number): void {
    const val = this.newCharacter.getAttributes()[attrIndex].getValue();
    this.newCharacter.getAttributes()[attrIndex].setValue(val);
    this.attPoints -=
      val -
      (this.attrPrior[attrIndex]
        ? this.attrPrior[attrIndex]
        : this.attrMins[attrIndex]);
    this.attrPrior[attrIndex] = val;
  }

  track(index: number, type: string): void {
    const val = this.newCharacter[type][index].ranks;
    const PRIOR = 'Prior';
    this.skillPoints -=
      val - (this[type + PRIOR][index] ? this[type + PRIOR][index] : 0);
    this[type + PRIOR][index] = val;
  }

  validateAttr(attrIndex: number): void {
    const input = document.getElementById('attr' + attrIndex);
    if (
      this.newCharacter.getAttributes()[attrIndex].getValue() <
      this.attrMins[attrIndex]
    ) {
      input.classList.add('bad-input');
      this.attPoints +=
        this.newCharacter.getAttributes()[attrIndex].getValue() -
        this.attrMins[attrIndex];
      this.attrPrior[attrIndex] = this.attrMins[attrIndex];
      this.newCharacter
        .getAttributes()
        [attrIndex].setValue(this.attrMins[attrIndex]);
    } else if (this.attPoints < 0) {
      input.classList.add('bad-input');
      this.newCharacter.getAttributes()[attrIndex].changeValue(this.attPoints);
      this.attrPrior[attrIndex] = this.newCharacter
        .getAttributes()
        [attrIndex].getValue();
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
    for (const skill of this.newCharacter.getSkills()) {
      skill.setRanks(0);
    }
    for (const wep of this.newCharacter.getWeaponSkills()) {
      wep.setRanks(0);
    }
    for (const mag of this.newCharacter.getMagicSkills()) {
      mag.setRanks(0);
    }
    this.resetPriors();
    this.skillPoints = this.originalPoints;
  }

  createMessage(): void {
    const name = this.newCharacter.getName();
    const race = this.newCharacter.getRace();
    const subRace = this.newCharacter.getSubRace()
      ? this.newCharacter.getSubRace() + ' '
      : '';
    const message = name + ' the ' + subRace + race + ' was created.';

    this.message.add(message);
  }
}

function findObjectPartial(array, key, value): number {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
}
