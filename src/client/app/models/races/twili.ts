import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Twili extends Character {
  constructor() {
    super();

    this.race = 'Twili';

    this.attributes[Attributes['Intelligence']].changeValue(2); // Int Buff
    this.attributes[Attributes['Constitution']].changeValue(2); // Con Buff
    this.attributes[Attributes['Wisdom']].changeValue(-2); // Wis Neg

    this.skills[Skills['Perform Music']].trained = false; // Can't perform Music

    this.weaponSkills[Weapons['Dual Sword']].trained = true; // Dual Swords

    this.skills[Skills['Bluff']].trained = true; // Bluff
    this.skills[Skills['Intimidate']].trained = true; // Intimidate
    this.skills[Skills['Knowledge History']].trained = true; // Knowledge (History)
    this.skills[Skills['Knowledge Plains']].trained = true;
    this.skills[Skills['Stealth']].trained = true; // Stealth
  }
}
