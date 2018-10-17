import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

export class Zora extends Character {
  constructor(subRace?: string) {
    super();

    this.setRace('Zora');
    this.setSubRace(subRace);

    this.getSkills()[Skills['Swim']].setRacial(4);

    this.getAttributes()[Attributes['Dexterity']].changeValue(2); // Dexterity

    this.getSkills()[Skills['Acrobatics']].setTrained(true); // Acrobatics
    this.getSkills()[Skills['CraftOne']].setTrained(true); // Craft 1
    this.getSkills()[Skills['CraftTwo']].setTrained(true); // Craft 2
    this.getSkills()[Skills['Perception']].setTrained(true); // Perception
    this.getSkills()[Skills['Swim']].setTrained(true); // Swim

    this.getWeaponSkills()[Weapons['Spear']].setTrained(true); // Spears

    switch (subRace) {
      case 'River': {
        this.getAttributes()[Attributes['Constitution']].changeValue(-2); // Con Neg
        this.getAttributes()[Attributes['Intelligence']].changeValue(2); // Int Buff

        this.getSkills()[Skills['Diplomacy']].setTrained(true); // Diplomacy
        this.getSkills()[Skills['Heal']].setTrained(true); // Heal;
        this.getSkills()[Skills['Knowledge History']].setTrained(true); // Knowledge (History)
        this.getSkills()[Skills['Knowledge Nature']].setTrained(true); // Knowledge(Nature)
        this.getSkills()[Skills['Perform Other']].setTrained(true); // Perform (Other)

        break;
      }
      case 'Ocean': {
        this.getAttributes()[Attributes['Strength']].changeValue(2);
        this.getAttributes()[Attributes['Wisdom']].changeValue(-2);

        this.getSkills()[Skills['Diplomacy']].setTrained(true); // Diplomacy
        this.getSkills()[Skills['Escape Artist']].setTrained(true); // Escape Artist
        this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
        this.getSkills()[Skills['Knowledge Nature']].setTrained(true); // Knowledge (Nature)

        break;
      }
      case 'Swamp': {
        this.getAttributes()[Attributes['Strength']].changeValue(-2);
        this.getAttributes()[Attributes['Constitution']].changeValue(2);

        this.getSkills()[Skills['Bluff']].setTrained(true); // Bluff
        this.getSkills()[Skills['Escape Artist']].setTrained(true); // Escape Artist
        this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
        this.getSkills()[Skills['Sense Motive']].setTrained(true); // Sense Motive
        this.getSkills()[Skills['Stealth']].setTrained(true); // Stealth

        break;
      }
    }
  }
}
