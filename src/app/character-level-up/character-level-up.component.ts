import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../Character/character';

@Component({
  selector: 'app-character-level-up',
  templateUrl: './character-level-up.component.html',
  styleUrls: ['./character-level-up.component.css']
})
export class CharacterLevelUpComponent implements OnInit {

  attributeTab = true;
  skillTab = !this.attributeTab;

  skillTypeTab = [ true, false, false];

  attrPoints: number;
  skillPoints: number;

  minimums: number[];
  skillStarts: number[];
  weaponStarts: number[];
  magicStarts: number[];

  skillPrior: number[];
  weaponPrior: number[];
  magicPrior: number[];

  @Input() currChar: Character;


  constructor() {
  }

  ngOnInit() {
    this.skillPrior = new Array();
    this.weaponPrior = new Array();
    this.magicPrior = new Array();
    this.attrPoints = 1;
    this.skillPoints = 10;
    const minimums = new Array();
    for (let i = 0; i < this.currChar.attributes.length; i++) {
      minimums.push(this.currChar.attributes[i].value);
    }
    this.minimums = minimums;

    const skillStarts = new Array();
    for (let j = 0; j < this.currChar.skills.length; j++) {
      skillStarts.push(this.currChar.skills[j].ranks);
    }
    this.skillStarts = skillStarts;

    const weaponStarts = new Array();
    for (let k = 0; k < this.currChar.weaponSkills.length; k++) {
      weaponStarts.push(this.currChar.weaponSkills[k].ranks);
    }
    this.weaponStarts = weaponStarts;

    const magicStarts = new Array();
    for (let m = 0; m < this.currChar.magicSkills.length; m++) {
      magicStarts.push(this.currChar.magicSkills[m].ranks);
    }
    this.magicStarts = magicStarts;
  }

  showTab(tabIndex: number): void {
    this.attributeTab = tabIndex === 0;
    this.skillTab = !this.attributeTab;
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.currChar.attributes.length; i++) {
      if (this.currChar.attributes[i].name === modName) {
        return this.currChar.attributes[i].modifier;
      }
    }
  }

  showSkillTab(skillTabIndex: number): void {
    this.skillTypeTab[skillTabIndex] = true;
    this.skillTypeTab[(skillTabIndex + 1) % 3] = this.skillTypeTab[(skillTabIndex + 2) % 3] = false;
  }

  trackAttr(attrIndex: number): void {
    const val = this.currChar.attributes[attrIndex].value;
    const modifier = val % 2 === 0 ? (val - 10) / 2 : (val - 11) / 2;
    this.currChar.attributes[attrIndex].modifier = modifier;
    console.log(this.currChar.attributes[attrIndex].value - this.minimums[attrIndex]);
    this.attrPoints = this.attrPoints - (this.currChar.attributes[attrIndex].value - this.minimums[attrIndex]);
  }

  trackSkill(skillIndex: number): void {
    const val = this.currChar.skills[skillIndex].ranks;
    if (this.skillPrior[skillIndex]) {
      this.skillPoints = this.skillPoints - (val - this.skillPrior[skillIndex]);
    } else {
      this.skillPoints = this.skillPoints - (val - this.skillStarts[skillIndex]);
    }
    this.skillPrior[skillIndex] = val;
  }

  trackWeapon(weaponIndex: number): void {
    const val = this.currChar.weaponSkills[weaponIndex].ranks;
    if (this.weaponPrior[weaponIndex]) {
      this.skillPoints = this.skillPoints - (val - this.weaponPrior[weaponIndex]);
    } else {
      this.skillPoints = this.skillPoints - (val - this.weaponStarts[weaponIndex]);
    }
    this.weaponPrior[weaponIndex] = val;
  }

  trackMagic(magicIndex: number): void {
    const val = this.currChar.magicSkills[magicIndex].ranks;
    if (this.magicPrior[magicIndex]) {
      this.skillPoints = this.skillPoints - (val - this.magicPrior[magicIndex]);
    } else {
      this.skillPoints = this.skillPoints - (val - this.magicStarts[magicIndex]);
    }
    this.magicPrior[magicIndex] = val;
  }
}
