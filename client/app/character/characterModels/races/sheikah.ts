import { Character } from '../character';
import { Attributes } from '../enums/attributes.enum';
import { Skills } from '../enums/skills.enum';
import { Weapons } from '../enums/weapon-skills.enum';

export class Sheikah extends Character {
  constructor() {
    super();

    this.setRace('Sheikah');
    this.getAttributes()[Attributes['Dexterity']].changeValue(2); // Dex Buff
    this.getAttributes()[Attributes['Constitution']].changeValue(2); // Con Buff
    this.getAttributes()[Attributes['Charisma']].changeValue(-2); // Cha Neg

    this.getSkills()[Skills['Stealth']].setRacial(4); // Stealth buff

    this.getWeaponSkills()[Weapons['Naginata']].setTrained(true); // Naginatas

    this.getSkills()[Skills['Acrobatics']].setTrained(true); // Acrobatics
    this.getSkills()[Skills['CraftOne']].setTrained(true); // Craft 1
    this.getSkills()[Skills['CraftTwo']].setTrained(true); // Craft 2
    this.getSkills()[Skills['Escape Artist']].setTrained(true); // Escape Artist
    this.getSkills()[Skills['Knowledge History']].setTrained(true); // Knowledge (History)
    this.getSkills()[Skills['Knowledge Language']].setTrained(true); // Knowledge (Language)
    this.getSkills()[Skills['Knowledge Local']].setTrained(true); // Knowledge (Local)
    this.getSkills()[Skills['Knowledge Nobility']].setTrained(true); // Knowledge (Nobility)
    this.getSkills()[Skills['Knowledge Plains']].setTrained(true);
    this.getSkills()[Skills['Knowledge Religion']].setTrained(true); // Knowledge (Religion)
    this.getSkills()[Skills['Perception']].setTrained(true); // Perception
    this.getSkills()[Skills['Sense Motive']].setTrained(true); // Sense Motive
    this.getSkills()[Skills['Sleight of Hand']].setTrained(true); // Sleight of Hand
    this.getSkills()[Skills['Stealth']].setTrained(true); // Stealth
  }
}
