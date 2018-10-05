import { Component, Input, OnInit } from '@angular/core';

import { Character } from '../characterModels/character';
import { Attributes } from '../characterModels/enums/attributes.enum';

@Component({
  selector: 'app-character-level-up',
  templateUrl: './character-level-up.component.html',
  styleUrls: ['./character-level-up.component.scss']
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

  @Input()
  currChar: Character;

  constructor() {}

  ngOnInit() {
    this.attrPoints = 1;
    this.skillPoints = 10;
    const minimums = [];
    for (const attr of this.currChar.getAttributes()) {
      minimums.push(attr.getValue());
      this.attrPrior.push(attr.getValue());
    }
    this.minimums = minimums;

    const skillStarts = [];
    for (const skill of this.currChar.getSkills()) {
      skillStarts.push(skill.getRanks());
    }
    this.skillStarts = skillStarts;
    this.skillsPrior = this.skillStarts;

    const weaponStarts = [];
    for (const wep of this.currChar.getWeaponSkills()) {
      weaponStarts.push(wep.getRanks());
    }
    this.weaponStarts = weaponStarts;
    this.weaponSkillsPrior = this.weaponStarts;

    const magicStarts = [];
    for (const mag of this.currChar.getMagicSkills()) {
      magicStarts.push(mag.getRanks());
    }
    this.magicStarts = magicStarts;
    this.magicSkillsPrior = this.magicStarts;
  }

  showTab(tabIndex: number): void {
    this.attributeTab = tabIndex === 0;
    this.skillTab = !this.attributeTab;
  }

  getMod(modName: string): number {
    return this.currChar.getAttributes()[Attributes[modName]].getModifier();
  }

  showSkillTab(skillTabIndex: number): void {
    this.skillTypeTab[skillTabIndex] = true;
    this.skillTypeTab[(skillTabIndex + 1) % 3] = this.skillTypeTab[
      (skillTabIndex + 2) % 3
    ] = false;
  }

  trackAtt(attrIndex: number): void {
    const val = this.currChar.getAttributes()[attrIndex].getValue();
    this.attrPoints -= val - this.attrPrior[attrIndex];
    this.attrPrior[attrIndex] = val;
  }

  validateAttr(attrIndex: number): void {
    const input = document.getElementById('attr' + attrIndex);
    if (
      this.currChar.getAttributes()[attrIndex].getValue() <
      this.minimums[attrIndex]
    ) {
      input.classList.add('bad-input');
      this.attrPoints +=
        this.currChar.getAttributes()[attrIndex].getValue() -
        this.minimums[attrIndex];
      this.attrPrior[attrIndex] = this.minimums[attrIndex];
      this.currChar
        .getAttributes()
        [attrIndex].setValue(this.minimums[attrIndex]);
    } else if (this.attrPoints < 0) {
      input.classList.add('bad-input');
      this.currChar.getAttributes()[attrIndex].changeValue(this.attrPoints);
      this.attrPrior[attrIndex] = this.currChar
        .getAttributes()
        [attrIndex].getValue();
      this.attrPoints -= this.attrPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }

  track(index: number, type: string): void {
    const val = this.currChar[type][index].ranks;
    const PRIOR = 'Prior';
    this.skillPoints -= val - this[type + PRIOR][index];
    this[type + PRIOR][index] = val;
  }

  validate(index: number, type: string): void {
    const input = document.getElementById(type + index);
    const PRIOR = 'Prior';
    if (this.currChar[type][index].getRanks() < 0) {
      input.classList.add('bad-input');
      this.skillPoints += this.currChar[type][index].ranks;
      this[type + PRIOR][index] = this.currChar[type][index].ranks = 0;
    } else if (this.skillPoints < 0) {
      input.classList.add('bad-input');
      this.currChar[type][index].setRanks(
        this.currChar[type][index].getRanks() + this.skillPoints
      );
      this[type + PRIOR][index] = this.currChar[type][index].getRanks();
      this.skillPoints -= this.skillPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }
}
