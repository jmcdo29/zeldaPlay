import { Character } from '../character';

export class Twili extends Character{
  
  
  constructor(){
    super();

    this.race = 'Twili';

    this.attributes[2].value += 2;  //Con Buff
    this.attributes[3].value += 2;  //Int Buff
    this.attributes[4].value -= 2;  //Wis Neg

    this.skills[22].trained = false;  //Can't perform Music

    this.weaponSkills[2].trained = true;  //Dual Swords

    this.skills[2].trained = true;  //Bluff
    this.skills[11].trained = true; //Intimidate
    this.skills[13].trained = true; //Knowledge (History)
    this.skills[28].trained = true; //Stealth

  }
}