import { Character } from '../character';

export class Goron extends Character {
  constructor(subRace?: string) {
    super();
    this.skills[1].trained = true;        // Appraise
    this.skills[3].trained = true;        // Climb
    this.skills[11].trained = true;       // Intimidate
    this.weaponSkills[7].trained = true;  // Hammers
    this.weaponSkills[8].trained = true;  // Hammers
    this.race = 'Goron';
    this.subRace = subRace;

    switch (subRace) {
      case 'Rock Spine': {
        this.attributes[0].value += 2;    // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.attributes[4].value += 1;    // Wisdom Buff
        break;
      }
    }
  }
}
