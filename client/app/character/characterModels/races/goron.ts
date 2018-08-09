import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Goron extends Character {
  constructor(subRace?: string) {
    super();
    this.skills[Skills['Appraise']].trained = true; // Appraise
    this.skills[Skills['Climb']].trained = true; // Climb
    this.skills[Skills['Intimidate']].trained = true; // Intimidate
    this.weaponSkills[Weapons['One-Handed Hammer']].trained = true; // Hammers
    this.weaponSkills[Weapons['Two-Handed Hammer']].trained = true; // Hammers
    this.race = 'Goron';
    this.subRace = subRace;

    switch (subRace) {
      case 'Rock Spine': {
        this.attributes[Attributes['Strength']].value += 2; // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.attributes[Attributes['Wisdom']].value += 1; // Wisdom Buff
        break;
      }
    }
  }
}
