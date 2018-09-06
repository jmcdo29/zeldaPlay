import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Gerudo extends Character {
  constructor() {
    super();

    this.setRace('Gerudo');
    this.getAttributes()[Attributes['Strength']].changeValue(2); // Strength Buff
    this.getAttributes()[Attributes['Constitution']].changeValue(1); // Constitution Buff
    this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
    this.getSkills()[Skills['Knowledge Geography']].setTrained(true);
    this.getSkills()[Skills['Knowledge Nature']].setTrained(true);
    this.getSkills()[Skills['Profession']].setTrained(true);
    this.getSkills()[Skills['Ride']].setTrained(true);
    this.getSkills()[Skills['Survival']].setTrained(true);
    this.getWeaponSkills()[Weapons['Long Sword']].setTrained(true);
    this.getWeaponSkills()[Weapons['Halberd']].setTrained(true);
  }
}
