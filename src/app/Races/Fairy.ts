import { Character } from '../Character/character';

export class Fairy extends Character {


  constructor(subRace?: string) {
    super();

    this.race = 'Fairy';
    this.subRace = subRace;

    this.attributes[0].value -= 2;
    this.attributes[3].value += 2;
    this.attributes[4].value += 2;

    this.skills[4].trained = true;          // Craft 1
    this.skills[5].trained = true;          // Craft 2
    this.skills[8].trained = true;          // Fly
    this.skills[10].trained = true;         // Heal
    this.skills[12].trained = true;         // Knowledge (Geography)
    this.skills[13].trained = true;         // Knowledge (History)
    this.skills[14].trained = true;         // Knowledge (Language)
    this.skills[15].trained = true;         // Knowledge (Local)
    this.skills[16].trained = true;         // Knowledge (Magic)
    this.skills[17].trained = true;         // Knowledge (Monster)
    this.skills[18].trained = true;         // Knowledge (Nature)
    this.skills[19].trained = true;         // Knowledge (Nobility)
    this.skills[20].trained = true;         // Knowledge (Religion)
    this.skills[21].trained = true;         // perception

    this.weaponSkills[19].trained = true;   // Fire Rods
    this.weaponSkills[20].trained = true;   // Ice Rods
    this.weaponSkills[21].trained = true;   // Lightning Rods
    this.weaponSkills[22].trained = true;   // Tornado Rods
    this.weaponSkills[23].trained = true;   // Sand Rods

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
