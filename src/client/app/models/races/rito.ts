import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Character } from '#Models/character';

export class Rito extends Character {
  constructor(subRace?: string) {
    super();

    this.race = 'Rito';
    this.subRace = subRace;

    // All Rito Skills
    this.skills[Skills['Acrobatics']].trained = true; // Acrobatics
    this.skills[Skills['CraftOne']].trained = true; // Craft One
    this.skills[Skills['CraftTwo']].trained = true; // Craft Two
    this.skills[Skills['Fly']].trained = true; // Fly
    this.skills[Skills['Knowledge Local']].trained = true; // Knowledge (Local)
    this.skills[Skills['Knowledge Nature']].trained = true; // Knowledge (Nature)
    this.skills[Skills['Perception']].trained = true; // Perception

    switch (subRace) {
      case 'Sharp Eye': {
        this.attributes[Attributes['Intelligence']].changeValue(1); // Intelligence Buff
        this.skills[Skills['Perception']].racial = 5; // Perception Bonus
        break;
      }
      case 'Sharp Tongue': {
        this.attributes[Attributes['Charisma']].changeValue(1); // Charisma Buff
        this.skills[Skills['Bluff']].trained = true; // Bluff
        this.skills[Skills['Bluff']].misc = 2; // Bluff Buff
        break;
      }
    }
  }
}
