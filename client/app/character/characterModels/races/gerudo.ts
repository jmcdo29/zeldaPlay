import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Gerudo extends Character {
  constructor() {
    super();

    this.race = 'Gerudo';
    this.attributes[Attributes['Strength']].value += 2; // Strength Buff
    this.attributes[Attributes['Constitution']].value += 1; // Constitution Buff
    this.skills[Skills['Intimidate']].trained = true; // Intimidate
    this.skills[Skills['Knowledge Geography']].trained = true;
    this.skills[Skills['Knowledge Nature']].trained = true;
    this.skills[Skills['Profession']].trained = true;
    this.skills[Skills['Ride']].trained = true;
    this.skills[Skills['Survival']].trained = true;
    this.weaponSkills[Weapons['Long Sword']].trained = true;
    this.weaponSkills[Weapons['Halberd']].trained = true;
  }
}
