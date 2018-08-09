import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Twili extends Character {
  constructor() {
    super();

    this.race = 'Twili';

    this.attributes[Attributes['Intelligence']].value += 2; // Int Buff
    this.attributes[Attributes['Constitution']].value += 2; // Con Buff
    this.attributes[Attributes['Wisdom']].value -= 2; // Wis Neg

    this.skills[Skills['Perform Music']].trained = false; // Can't perform Music

    this.weaponSkills[Weapons['Dual Sword']].trained = true; // Dual Swords

    this.skills[Skills['Bluff']].trained = true; // Bluff
    this.skills[Skills['Intimidate']].trained = true; // Intimidate
    this.skills[Skills['Knowledge History']].trained = true; // Knowledge (History)
    this.skills[Skills['Knowledge Plains']].trained = true;
    this.skills[Skills['Stealth']].trained = true; // Stealth
  }
}
