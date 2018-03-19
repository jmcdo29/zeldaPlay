import { Character } from "../character";

export class Zora extends Character {
  constructor(subRace?: string) {
    super();

    this.race = "Zora";
    this.subRace = subRace;

    this.skills[30].racial = 4;

    this.attributes[1].value += 2;  //Dexterity

    this.skills[0].trained = true;  //Acrobatics
    this.skills[4].trained = true   //Craft 1
    this.skills[5].trained = true   //Craft 2
    this.skills[21].trained = true; //Percetption
    this.skills[30].trained = true; //Swim

    this.weaponSkills[9].trained = true;  //Spears

    switch (subRace) {
      case "River": {

        this.attributes[2].value -= 2;  //Con Neg
        this.attributes[3].value += 2;  //Int Buff

        this.skills[6].trained = true;  //Diplomacy
        this.skills[10].trained = true; //Heal;
        this.skills[13].trained = true; //Knowledge (History)
        this.skills[18].trained = true; //Knowledge(Nature)
        this.skills[23].trained = true; //Perform (Other)

        break;
      }
      case "Ocean": {

        this.attributes[0].value += 2;
        this.attributes[4].value -= 2;

        this.skills[6].trained = true;  //Diplomacy
        this.skills[7].trained = true;  //Escape Artist
        this.skills[11].trained = true; //Intimidate
        this.skills[18].trained = true; //Knowledge (Nature)

        break;
      }
      case "Swamp": {

        this.attributes[0].value -= 2;
        this.attributes[2].value += 2;

        this.skills[2].trained = true;  //Bluff
        this.skills[7].trained = true;  //Escape Artist
        this.skills[11].trained = true; //Intimidate
        this.skills[26].trained = true; //Sense Motive
        this.skills[28].trained = true; //Stealth

        break;
      }
    }
  }
}
