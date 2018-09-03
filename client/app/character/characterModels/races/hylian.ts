import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Hylian extends Character {
  constructor(subRace?: string) {
    super();
    // All Hylian Skills
    this.getSkills()[Skills['Diplomacy']].setRacial(4);
    this.getSkills()[Skills['CraftOne']].setTrained(true); // Craft 1
    this.getSkills()[Skills['Climb']].setTrained(true); // Climb
    this.getSkills()[Skills['Knowledge History']].setTrained(true); // Knowledge (History)
    this.getSkills()[Skills['Knowledge Local']].setTrained(true); // Knowledge (Local)
    this.getSkills()[Skills['Perception']].setTrained(true); // Perception

    this.getWeaponSkills()[Weapons['Short Sword']].setTrained(true); // Short Sword
    this.getWeaponSkills()[Weapons['Long Sword']].setTrained(true); // Long Sword
    this.getWeaponSkills()[Weapons['Light Shield']].setTrained(true); // Light Shield
    this.getWeaponSkills()[Weapons['Heavy Shield']].setTrained(true); // Heavy Shield

    this.setRace('Hylian');
    this.setSubRace(subRace);

    if (subRace) {
      switch (subRace) {
        case 'Farmer': {
          // Farmhand Hylian Skills
          this.getAttributes()[Attributes['Strength']].changeValue(2); // Strength Buff
          this.getSkills()[Skills['Acrobatics']].setTrained(true); // Acrobatics
          this.getSkills()[Skills['Handle Animal']].setTrained(true); // Handle Animal
          this.getSkills()[Skills['Knowledge Geography']].setTrained(true); // Knowledge (Geography)
          this.getSkills()[Skills['Knowledge Nature']].setTrained(true); // Knowledge (Nature)
          this.getSkills()[Skills['Ride']].setTrained(true); // Ride
          this.getSkills()[Skills['Survival']].setTrained(true); // Survival
          this.getSkills()[Skills['Swim']].setTrained(true); // Swim
          break;
        }
        case 'Sheikah': {
          // Sheikah Hylian Skills
          this.getAttributes()[Attributes['Dexterity']].changeValue(2); // Dexterity Buff
          this.getSkills()[Skills['Acrobatics']].setTrained(true); // Acrobatics
          this.getSkills()[Skills['Appraise']].setTrained(true); // Appraise
          this.getSkills()[Skills['Bluff']].setTrained(true); // Bluff
          this.getSkills()[Skills['Escape Artist']].setTrained(true); // Escape Artist
          this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
          this.getSkills()[Skills['Knowledge Language']].setTrained(true); // Knowledge (Language)
          this.getSkills()[Skills['Knowledge Nobility']].setTrained(true); // Knowledge (Nobility)
          this.getSkills()[Skills['Knowledge Religion']].setTrained(true); // Knowledge (Religion)
          this.getSkills()[Skills['Sense Motive']].setTrained(true); // Sense Motive
          this.getSkills()[Skills['Stealth']].setTrained(true); // Stealth
          break;
        }
        case 'Guard': {
          // Guard Hylian Skills
          this.getAttributes()[Attributes['Constitution']].changeValue(2); // Constitution Buff
          this.getSkills()[Skills['Bluff']].setTrained(true); // Bluff
          this.getSkills()[Skills['Diplomacy']].setTrained(true); // Diplomacy
          this.getSkills()[Skills['Heal']].setTrained(true); // Heal
          this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
          this.getSkills()[Skills['Knowledge Nobility']].setTrained(true); // Knowledge (Nobility)
          this.getSkills()[Skills['Knowledge Religion']].setTrained(true); // Knowledge (Religion)
          this.getSkills()[Skills['Profession']].setTrained(true); // Profession
          this.getSkills()[Skills['Ride']].setTrained(true); // Ride
          this.getSkills()[Skills['Sense Motive']].setTrained(true); // Sense Motive
          break;
        }
      }
    }
  }
}
