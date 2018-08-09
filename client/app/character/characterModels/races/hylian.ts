import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Hylian extends Character {
  constructor(subRace?: string) {
    super();
    // All Hylian Skills
    this.skills[Skills['Diplomacy']].racial = 4;
    this.skills[Skills['CraftOne']].trained = true; // Craft 1
    this.skills[Skills['Climb']].trained = true; // Climb
    this.skills[Skills['Knowledge History']].trained = true; // Knowledge (History)
    this.skills[Skills['Knowledge Local']].trained = true; // Knowledge (Local)
    this.skills[Skills['Perception']].trained = true; // Perception

    this.weaponSkills[Weapons['Short Sword']].trained = true; // Short Sword
    this.weaponSkills[Weapons['Long Sword']].trained = true; // Long Sword
    this.weaponSkills[Weapons['Light Shield']].trained = true; // Light Shield
    this.weaponSkills[Weapons['Heavy Shield']].trained = true; // Heavy Shield

    this.race = 'Hylian';
    this.subRace = subRace;

    if (subRace) {
      switch (subRace) {
        case 'Farmer': {
          // Farmhand Hylian Skills
          this.attributes[Attributes['Strength']].value += 2; // Strength Buff
          this.skills[Skills['Acrobatics']].trained = true; // Acrobatics
          this.skills[Skills['Handle Animal']].trained = true; // Handle Animal
          this.skills[Skills['Knowledge Geography']].trained = true; // Knowledge (Geography)
          this.skills[Skills['Knowledge Nature']].trained = true; // Knowledge (Nature)
          this.skills[Skills['Ride']].trained = true; // Ride
          this.skills[Skills['Survival']].trained = true; // Survival
          this.skills[Skills['Swim']].trained = true; // Swim
          break;
        }
        case 'Sheikah': {
          // Sheikah Hylian Skills
          this.attributes[Attributes['Dexterity']].value += 2; // Dexterity Buff
          this.skills[Skills['Acrobatics']].trained = true; // Acrobatics
          this.skills[Skills['Appraise']].trained = true; // Appraise
          this.skills[Skills['Bluff']].trained = true; // Bluff
          this.skills[Skills['Escape Artist']].trained = true; // Escape Artist
          this.skills[Skills['Intimidate']].trained = true; // Intimidate
          this.skills[Skills['Knowledge Language']].trained = true; // Knowledge (Language)
          this.skills[Skills['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
          this.skills[Skills['Knowledge Religion']].trained = true; // Knowledge (Religion)
          this.skills[Skills['Sense Motive']].trained = true; // Sense Motive
          this.skills[Skills['Stealth']].trained = true; // Stealth
          break;
        }
        case 'Guard': {
          // Guard Hylian Skills
          this.attributes[Attributes['Constitution']].value += 2; // Constitution Buff
          this.skills[Skills['Bluff']].trained = true; // Bluff
          this.skills[Skills['Diplomacy']].trained = true; // Diplomacy
          this.skills[Skills['Heal']].trained = true; // Heal
          this.skills[Skills['Intimidate']].trained = true; // Intimidate
          this.skills[Skills['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
          this.skills[Skills['Knowledge Religion']].trained = true; // Knowledge (Religion)
          this.skills[Skills['Profession']].trained = true; // Profession
          this.skills[Skills['Ride']].trained = true; // Ride
          this.skills[Skills['Sense Motive']].trained = true; // Sense Motive
          break;
        }
      }
    }
  }
}
