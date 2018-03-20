import { Character } from '../character';

export class Sheikah extends Character {

  constructor() {
    super();

    this.attributes[1].value += 2;        // Dex Buff
    this.attributes[2].value += 2;        // Con Buff
    this.attributes[5].value -= 2;        // Cha Neg

    this.skills[28].racial = 4;           // Stealth buff

    this.weaponSkills[11].trained = true; // Naginatas

    this.skills[0].trained = true;        // Acrobatics
    this.skills[4].trained = true;        // Craft 1
    this.skills[5].trained = true;        // Craft 2
    this.skills[7].trained = true;        // Escape Artist
    this.skills[13].trained = true;       // Knowledge (History)
    this.skills[14].trained = true;       // Knowledge (Language)
    this.skills[15].trained = true;       // Knowledge (Local)
    this.skills[19].trained = true;       // Knowledge (Nobility)
    this.skills[20].trained = true;       // Knowledge (Religion)
    this.skills[21].trained = true;       // Perception
    this.skills[26].trained = true;       // Sense Motive
    this.skills[27].trained = true;       // Sleight of Hand
    this.skills[28].trained = true;       // Stealth
  }
}
