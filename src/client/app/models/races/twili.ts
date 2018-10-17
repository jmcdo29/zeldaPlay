import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Twili extends Character {
  constructor() {
    super();

    this.setRace('Twili');

    this.getAttributes()[Attributes['Intelligence']].changeValue(2); // Int Buff
    this.getAttributes()[Attributes['Constitution']].changeValue(2); // Con Buff
    this.getAttributes()[Attributes['Wisdom']].changeValue(-2); // Wis Neg

    this.getSkills()[Skills['Perform Music']].setTrained(false); // Can't perform Music

    this.getWeaponSkills()[Weapons['Dual Sword']].setTrained(true); // Dual Swords

    this.getSkills()[Skills['Bluff']].setTrained(true); // Bluff
    this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
    this.getSkills()[Skills['Knowledge History']].setTrained(true); // Knowledge (History)
    this.getSkills()[Skills['Knowledge Plains']].setTrained(true);
    this.getSkills()[Skills['Stealth']].setTrained(true); // Stealth
  }
}
