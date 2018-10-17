import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Fairy extends Character {
  constructor(subRace?: string) {
    super();

    this.setRace('Fairy');
    this.setSubRace(subRace);

    this.getAttributes()[Attributes['Strength']].changeValue(-2);
    this.getAttributes()[Attributes['Intelligence']].changeValue(2);
    this.getAttributes()[Attributes['Wisdom']].changeValue(2);

    this.getSkills()[Skills['CraftOne']].setTrained(true); // Craft 1
    this.getSkills()[Skills['CraftTwo']].setTrained(true); // Craft 2
    this.getSkills()[Skills['Fly']].setTrained(true); // Fly
    this.getSkills()[Skills['Heal']].setTrained(true); // Heal
    this.getSkills()[Skills['Knowledge Geography']].setTrained(true); // Knowledge (Geography)
    this.getSkills()[Skills['Knowledge History']].setTrained(true); // Knowledge (History)
    this.getSkills()[Skills['Knowledge Language']].setTrained(true); // Knowledge (Language)
    this.getSkills()[Skills['Knowledge Local']].setTrained(true); // Knowledge (Local)
    this.getSkills()[Skills['Knowledge Magic']].setTrained(true); // Knowledge (Magic)
    this.getSkills()[Skills['Knowledge Monsters']].setTrained(true); // Knowledge (Monster)
    this.getSkills()[Skills['Knowledge Nature']].setTrained(true); // Knowledge (Nature)
    this.getSkills()[Skills['Knowledge Nobility']].setTrained(true); // Knowledge (Nobility)
    this.getSkills()[Skills['Knowledge Plains']].setTrained(true);
    this.getSkills()[Skills['Knowledge Religion']].setTrained(true); // Knowledge (Religion)
    this.getSkills()[Skills['Perception']].setTrained(true); // Perception

    this.getWeaponSkills()[Weapons['Fire Rod']].setTrained(true); // Fire Rods
    this.getWeaponSkills()[Weapons['Ice Rod']].setTrained(true); // Ice Rods
    this.getWeaponSkills()[Weapons['Lightning Rod']].setTrained(true); // Lightning Rods
    this.getWeaponSkills()[Weapons['Tornado Rod']].setTrained(true); // Tornado Rods
    this.getWeaponSkills()[Weapons['Sand Rod']].setTrained(true); // Sand Rods

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
