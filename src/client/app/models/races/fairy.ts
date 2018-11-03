import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Fairy extends Character {
  constructor(subRace?: string) {
    super();

    this.race = 'Fairy';
    this.subRace = subRace;

    this.attributes[Attributes['Strength']].changeValue(-2);
    this.attributes[Attributes['Intelligence']].changeValue(2);
    this.attributes[Attributes['Wisdom']].changeValue(2);

    this.skills[Skills['CraftOne']].trained = true; // Craft 1
    this.skills[Skills['CraftTwo']].trained = true; // Craft 2
    this.skills[Skills['Fly']].trained = true; // Fly
    this.skills[Skills['Heal']].trained = true; // Heal
    this.skills[Skills['Knowledge Geography']].trained = true; // Knowledge (Geography)
    this.skills[Skills['Knowledge History']].trained = true; // Knowledge (History)
    this.skills[Skills['Knowledge Language']].trained = true; // Knowledge (Language)
    this.skills[Skills['Knowledge Local']].trained = true; // Knowledge (Local)
    this.skills[Skills['Knowledge Magic']].trained = true; // Knowledge (Magic)
    this.skills[Skills['Knowledge Monsters']].trained = true; // Knowledge (Monster)
    this.skills[Skills['Knowledge Nature']].trained = true; // Knowledge (Nature)
    this.skills[Skills['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
    this.skills[Skills['Knowledge Plains']].trained = true;
    this.skills[Skills['Knowledge Religion']].trained = true; // Knowledge (Religion)
    this.skills[Skills['Perception']].trained = true; // Perception

    this.weaponSkills[Weapons['Fire Rod']].trained = true; // Fire Rods
    this.weaponSkills[Weapons['Ice Rod']].trained = true; // Ice Rods
    this.weaponSkills[Weapons['Lightning Rod']].trained = true; // Lightning Rods
    this.weaponSkills[Weapons['Tornado Rod']].trained = true; // Tornado Rods
    this.weaponSkills[Weapons['Sand Rod']].trained = true; // Sand Rods

    switch (subRace) {
      case 'Din': {
        break;
      }
      case 'Farore': {
        break;
      }
      case 'Nayru': {
        break;
      }
    }
  }
}
