import { Character } from '../Character/character';

export class Gerudo extends Character {
  constructor() {
    super();
    this.race = 'Gerudo';
    this.attributes[0].value += 2;  // Strength Buff
    this.attributes[2].value += 1;  // Constitution Buff
    this.skills[11].trained = true; // Intimidate
  }
}
