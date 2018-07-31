import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../characterModels/character';
import { Attributes } from '../characterModels/enums/attributes.enum';

@Component({
  selector: 'app-character-level-up',
  templateUrl: './character-level-up.component.html',
  styleUrls: ['./character-level-up.component.css']
})
export class CharacterLevelUpComponent implements OnInit {

  attributeTab = true;
  skillTab = !this.attributeTab;

  skillTypeTab = [true, false, false];

  attrPoints: number;
  skillPoints: number;

  minimums: number[] = [];
  skillStarts: number[] = [];
  weaponStarts: number[] = [];
  magicStarts: number[] = [];

  attrPrior: number[] = [];
  skillsPrior: number[] = [];
  weaponSkillsPrior: number[] = [];
  magicSkillsPrior: number[] = [];

  @Input() currChar: Character;


  constructor() {
  }

  ngOnInit() {
    this.attrPoints = 1;
    this.skillPoints = 10;
    const minimums = [];
    for (let i = 0; i < this.currChar.attributes.length; i++) {
      minimums.push(this.currChar.attributes[i].value);
    }
    this.minimums = minimums;
    this.attrPrior = this.minimums;

    const skillStarts = [];
    for (let j = 0; j < this.currChar.skills.length; j++) {
      skillStarts.push(this.currChar.skills[j].ranks);
    }
    this.skillStarts = skillStarts;
    this.skillsPrior = this.skillStarts;

    const weaponStarts = [];
    for (let k = 0; k < this.currChar.weaponSkills.length; k++) {
      weaponStarts.push(this.currChar.weaponSkills[k].ranks);
    }
    this.weaponStarts = weaponStarts;
    this.weaponSkillsPrior = this.weaponStarts;

    const magicStarts = [];
    for (let m = 0; m < this.currChar.magicSkills.length; m++) {
      magicStarts.push(this.currChar.magicSkills[m].ranks);
    }
    this.magicStarts = magicStarts;
    this.magicSkillsPrior = this.magicStarts;
  }

  showTab(tabIndex: number): void {
    this.attributeTab = tabIndex === 0;
    this.skillTab = !this.attributeTab;
  }

  getMod(modName: string): number {
    return this.currChar.attributes[Attributes[modName]].modifier;
  }

  showSkillTab(skillTabIndex: number): void {
    this.skillTypeTab[skillTabIndex] = true;
    this.skillTypeTab[(skillTabIndex + 1) % 3] = this.skillTypeTab[(skillTabIndex + 2) % 3] = false;
  }

  trackAtt(attrIndex: number): void {
    const val = this.currChar.attributes[attrIndex].value;
    const modifier = val % 2 === 0 ? (val - 10) / 2 : (val - 11) / 2;
    this.currChar.attributes[attrIndex].modifier = modifier;
    if (this.attrPrior[attrIndex]) {
      this.attrPoints = this.attrPoints - (val - this.attrPrior[attrIndex]);
    } else {
      this.attrPoints = this.attrPoints - (val - this.minimums[attrIndex]);
    }
    this.attrPrior[attrIndex] = val;
  }

  track(index: number, type: string): void {
    const val = this.currChar[type][index].ranks;
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
    if ( this.currChar.attributes[attrIndex].value < this.minimums[attrIndex]) {
      input.classList.add('bad-input');
      this.attrPoints += (this.currChar.attributes[attrIndex].value - this.minimums[attrIndex]);
      this.attrPrior[attrIndex] = this.currChar.attributes[attrIndex].value = this.minimums[attrIndex];
    } else if (this.attrPoints < 0) {
      input.classList.add('bad-input');
      this.currChar.attributes[attrIndex].value += this.attrPoints;
      this.attrPrior[attrIndex] = this.currChar.attributes[attrIndex].value;
      this.attrPoints -= this.attrPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }

  validate(index: number, type: string): void {
    const input = document.getElementById(type + index);
    const PRIOR = 'Prior';
    if (this.currChar[type][index].ranks < 0) {
      input.classList.add('bad-input');
      this.skillPoints += (this.currChar[type][index].ranks);
      this[type + PRIOR][index] = this.currChar[type][index].ranks = 0;
    } else if (this.skillPoints < 0) {
      input.classList.add('bad-input');
      this.currChar[type][index].ranks += this.skillPoints;
      this[type + PRIOR][index] = this.currChar[type][index].ranks;
      this.skillPoints -= this.skillPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }
}
