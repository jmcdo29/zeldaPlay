import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Rito extends Character {
  constructor(subRace?: string) {
    super();

    this.setRace('Rito');
    this.setSubRace(subRace);

    // All Rito Skills
    this.getSkills()[Skills['Acrobatics']].setTrained(true); // Acrobatics
    this.getSkills()[Skills['CraftOne']].setTrained(true); // Craft One
    this.getSkills()[Skills['CraftTwo']].setTrained(true); // Craft Two
    this.getSkills()[Skills['Fly']].setTrained(true); // Fly
    this.getSkills()[Skills['Knowledge Local']].setTrained(true); // Knowledge (Local)
    this.getSkills()[Skills['Knowledge Nature']].setTrained(true); // Knowledge (Nature)
    this.getSkills()[Skills['Perception']].setTrained(true); // Perception

    switch (subRace) {
      case 'Sharp Eye': {
        this.getAttributes()[Attributes['Intelligence']].changeValue(1); // Intelligence Buff
        this.getSkills()[Skills['Perception']].setRacial(5); // Perception Bonus
        break;
      }
      case 'Sharp Tongue': {
        this.getAttributes()[Attributes['Charisma']].changeValue(1); // Charisma Buff
        this.getSkills()[Skills['Bluff']].setTrained(true); // Bluff
        this.getSkills()[Skills['Bluff']].setMisc(2); // Bluff Buff
        break;
      }
    }
  }
}
