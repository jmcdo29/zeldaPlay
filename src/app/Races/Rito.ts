import { Character } from '../character';

export class Rito extends Character{
  
  constructor(subRace? : string){
    super();

    this.race = 'Rito';
    this.subRace = subRace;

    //All Rito Skills
    this.skills[0].trained = true;          //Acrobatics
    this.skills[4].trained = true;          //Craft One
    this.skills[5].trained = true;          //Craft Two
    this.skills[15].trained = true;         //Knowledge (Local)
    this.skills[18].trained = true;         //Knowledge (Nature)
    this.skills[21].trained = true;         //Perception

    switch(subRace){
      case "Sharp Eye":{
        this.attributes[3].value += 1;      //Intelligence Buff
        this.skills[21].racial = 5;         //Perception Bonus
        break;
      }
      case "Sharp Tongue":{
        this.attributes[5].value += 1;      //Charisma Buff
        this.skills[2].trained = true;      //Bluff
        this.skills[2].misc = 2;
        break;
      }
    }
  }
}