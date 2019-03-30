import { Component, Input, OnInit } from '@angular/core';

import { Attributes } from '#Enums/attributes.enum';
import { Character } from '#Models/character';

@Component({
  selector: 'app-character-level-up',
  templateUrl: './character-level-up.component.html',
  styleUrls: ['./character-level-up.component.scss']
})
export class CharacterLevelUpComponent implements OnInit {
  attributeTab = true;
  skillTab = !this.attributeTab;

  topTab = 0;
  secondTab = 0;

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

  /**
   * Set up the value tracking for character level up
   * Also creates a minimum/starting array for all skills
   * to allow better tracking and reverting values
   */
  ngOnInit() {
    this.attrPoints = 1;
    this.skillPoints = 10;
    const minimums = [];
    for (const attr of this.currChar.attributes) {
      minimums.push(attr.value);
      this.attrPrior.push(attr.value);
    }
    this.minimums = minimums;

    const skillStarts = [];
    for (const skill of this.currChar.skills) {
      skillStarts.push(skill.ranks);
    }
    this.skillStarts = skillStarts;
    this.skillsPrior = this.skillStarts;

    const weaponStarts = [];
    for (const wep of this.currChar.weaponSkills) {
      weaponStarts.push(wep.ranks);
    }
    this.weaponStarts = weaponStarts;
    this.weaponSkillsPrior = this.weaponStarts;

    const magicStarts = [];
    for (const mag of this.currChar.magicSkills) {
      magicStarts.push(mag.ranks);
    }
    this.magicStarts = magicStarts;
    this.magicSkillsPrior = this.magicStarts;
  }

  /**
   * Function to switch which tab is visible
   * @param tabIndex The tab's array index
   */
  showTab(tabIndex: number): void {
    this.attributeTab = tabIndex === 0;
    this.skillTab = !this.attributeTab;
  }

  /**
   * Utility function to get the modifier's value based on the mod name
   * @param modName Mod name string ('Strength', 'Dexterity', etc.)
   */
  getMod(modName: string): number {
    return this.currChar.attributes[Attributes[modName]].modifier;
  }

  /**
   * Another function to allow for the changing of tabs. This time for skills.
   * @param skillTabIndex The Array index of the skills tab
   */
  showSkillTab(skillTabIndex: number): void {
    this.skillTypeTab[skillTabIndex] = true;
    this.skillTypeTab[(skillTabIndex + 1) % 3] = this.skillTypeTab[
      (skillTabIndex + 2) % 3
    ] = false;
  }

  /**
   * Function to manage the tracking of adding values to the attribute while also updating
   * the attribute's prior value
   * @param attrIndex The attribute's index in the attribute array
   */
  trackAtt(attrIndex: number): void {
    const val = this.currChar.attributes[attrIndex].value;
    this.attrPoints -= val - this.attrPrior[attrIndex];
    this.attrPrior[attrIndex] = val;
  }

  /**
   * Function to validate that the recently assigned attribute value is in fact a
   * valid value. To do this it checks that the attribute's value is not below
   * it's original value (minimum) and that the current number of points for allocation
   * is not less than zero. Lastly it checks if there were any problems in the
   * allocation beforehand: if so, remove the problems, if not ignore.
   * @param attrIndex The attribute's index in the attribute array
   */
  validateAttr(attrIndex: number): void {
    const input = document.getElementById('attr' + attrIndex);
    if (this.currChar.attributes[attrIndex].value < this.minimums[attrIndex]) {
      input.classList.add('bad-input');
      this.attrPoints +=
        this.currChar.attributes[attrIndex].value - this.minimums[attrIndex];
      this.attrPrior[attrIndex] = this.minimums[attrIndex];
      this.currChar.attributes[attrIndex].value = this.minimums[attrIndex];
    } else if (this.attrPoints < 0) {
      input.classList.add('bad-input');
      this.currChar.attributes[attrIndex].changeValue(this.attrPoints);
      this.attrPrior[attrIndex] = this.currChar.attributes[attrIndex].value;
      this.attrPoints -= this.attrPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }

  /**
   * Like trackAttr but for Skills
   * @param index The skill's index in the skills array
   * @param type Which skills array to look in (skills, weaponSkills, magicSkills)
   */
  track(index: number, type: string): void {
    const val = this.currChar[type][index].ranks;
    const PRIOR = 'Prior';
    this.skillPoints -= val - this[type + PRIOR][index];
    this[type + PRIOR][index] = val;
  }

  /**
   * Like validateAttr but for skills
   * @param index the skill's index in its skills array
   * @param type Which skills array to look in (skills, weaponSkills, or magicSkills)
   */
  validate(index: number, type: string): void {
    const input = document.getElementById(type + index);
    const PRIOR = 'Prior';
    if (this.currChar[type][index].ranks < 0) {
      input.classList.add('bad-input');
      this.skillPoints += this.currChar[type][index].ranks;
      this[type + PRIOR][index] = this.currChar[type][index].ranks = 0;
    } else if (this.skillPoints < 0) {
      input.classList.add('bad-input');
      this.currChar[type][index].ranks =
        this.currChar[type][index].ranks + this.skillPoints;
      this[type + PRIOR][index] = this.currChar[type][index].ranks;
      this.skillPoints -= this.skillPoints;
    } else if (input.classList.contains('bad-input')) {
      input.classList.remove('bad-input');
    }
  }
}
