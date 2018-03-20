import { Character } from '../character';

export class Hylian extends Character {

  constructor(subRace?: string) {
    super();
    // All Hylian Skills
    this.skills[6].racial = 4;
    this.skills[4].trained = true;          // Craft 1
    this.skills[3].trained = true;          // Climb
    this.skills[14].trained = true;         // Knowledge (History)
    this.skills[15].trained = true;         // Knowledge (Local)
    this.skills[21].trained = true;         // Perception

    this.weaponSkills[0].trained = true;    // Short Sword
    this.weaponSkills[1].trained = true;    // Long Sword
    this.weaponSkills[4].trained = true;    // Light Shield
    this.weaponSkills[5].trained = true;    // Heavy Shield

    this.race = 'Hylian';
    this.subRace = subRace;

    if (subRace) {
      switch (subRace) {
        case 'Farmer': {
          // Farmhand Hylian Skills
          this.attributes[0].value += 2;    // Strength Buff
          this.skills[0].trained = true;    // Acrobatics
          this.skills[9].trained = true;    // Handle Animal
          this.skills[12].trained = true;   // Knowledge (Geography)
          this.skills[18].trained = true;   // Knowledge (Nature)
          this.skills[25].trained = true;   // Ride
          this.skills[29].trained = true;   // Survival
          this.skills[30].trained = true;   // Swim
          break;
        }
        case 'Sheikah': {
          // Sheikah Hylian Skills
          this.attributes[1].value += 2;    // Dexterity Buff
          this.skills[0].trained = true;    // Acronatics
          this.skills[1].trained = true;    // Appraise
          this.skills[2].trained = true;    // Bluff
          this.skills[7].trained = true;    // Escpe Artist
          this.skills[11].trained = true;   // Intimidate
          this.skills[14].trained = true;   // Knowledge (Language)
          this.skills[19].trained = true;   // Knowledge (Nobility)
          this.skills[20].trained = true;   // Knowledge (Religion)
          this.skills[26].trained = true;   // Sense Motive
          this.skills[28].trained = true;   // Stealth
          break;
        }
        case 'Guard': {
          // Guard Hylian Skills
          this.attributes[2].value += 2;    // Consitution Buff
          this.skills[2].trained = true;    // Bluff
          this.skills[4].trained = true;    // Diplomacy
          this.skills[10].trained = true;   // Heal
          this.skills[11].trained = true;   // Intimidate
          this.skills[19].trained = true;   // Knowledge (Nobility)
          this.skills[20].trained = true;   // Knowledge (Religion)
          this.skills[24].trained = true;   // Profession
          this.skills[25].trained = true;   // Ride
          this.skills[26].trained = true;   // Sense Motive
          break;
        }
      }
    }
  }
}
