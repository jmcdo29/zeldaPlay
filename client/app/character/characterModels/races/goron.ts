import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Goron extends Character {
  constructor(subRace?: string) {
    super();
    this.getSkills()[Skills['Appraise']].setTrained(true); // Appraise
    this.getSkills()[Skills['Climb']].setTrained(true); // Climb
    this.getSkills()[Skills['Intimidate']].setTrained(true); // Intimidate
    this.getWeaponSkills()[Weapons['One-Handed Hammer']].setTrained(true); // Hammers
    this.getWeaponSkills()[Weapons['Two-Handed Hammer']].setTrained(true); // Hammers
    this.setRace('Goron');
    this.setSubRace(subRace);

    switch (subRace) {
      case 'Rock Spine': {
        this.getAttributes()[Attributes['Strength']].changeValue(2); // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.getAttributes()[Attributes['Wisdom']].changeValue(1); // Wisdom Buff
        break;
      }
    }
  }
}
