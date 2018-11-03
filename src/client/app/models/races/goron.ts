import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';

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
        this.attributes[Attributes['Strength']].changeValue(2); // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.attributes[Attributes['Wisdom']].changeValue(1); // Wisdom Buff
        break;
      }
    }
  }
}
