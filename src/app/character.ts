import { Attribute } from "./attribute";
import { Skill } from "./skill";

export class Character {
  _id?: number;
  name: string;
  race: string;
  subRace?: string;
  attributes: Attribute[];
  health: number;
  magic: number;
  exp: number;
  craftOne?: string;
  craftTwo?: string;
  performCust?: string;
  profession?: string;
  skills: Skill[];
  weaponSkills: Skill[];
  magicSkills: Skill[];

  constructor() {
    this.attributes = [
      {
        name: "Strength",
        value: 10,
        modifier: 0
      },
      {
        name: "Dexterity",
        value: 10,
        modifier: 0
      },
      {
        name: "Constitution",
        value: 10,
        modifier: 0
      },
      {
        name: "Intelligence",
        value: 10,
        modifier: 0
      },
      {
        name: "Wisdom",
        value: 10,
        modifier: 0
      },
      {
        name: "Charisma",
        value: 10,
        modifier: 0
      }
    ];
    this.skills = [
      {
        skillName: "Acrobatics", //0
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Appraise", //1
        trained: false,
        ranks: 0,
        modifier: "Intelligence",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Bluff", //2
        trained: false,
        ranks: 0,
        modifier: "Charisma",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Climb", //3
        trained: false,
        ranks: 0,
        modifier: "Strength",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Craft 1", //4
        trained: false,
        ranks: 0,
        modifier: "Intelligence",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Craft 2", //5
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Diplomacy", //6
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Escape Artist", //7
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Fly", //8
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Handle Animal", //9
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Heal", //10
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Intimidate", //11
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Strength",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Geography)", //12
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (History)", //13
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Language)", //14
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Local)", //15
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Magic)", //16
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Monster)", //17
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Nature)", //18
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Nobility)", //19
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Religion)", //20
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perception", //21
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perform (Music)", //22
        trained: true,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perform", //23
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Profession", //24
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Ride", //25
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Sense Motive", //26
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Sleight of Hand", //27
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Stealth", //28
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Survival", //29
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Swim", //30
        ranks: 0,
        racial: 0,
        modifier: "Strength",
        item: 0,
        misc: 0
      }
    ];
    this.weaponSkills = [
      {
        skillName: "Short Swords", //0
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Long Swords", //1
        ranks: 0,
        trained: false,
        racial: 0
      },
      {
        skillName: "Dual Swords", //2
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Great Swords", //3
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Light Shields", //4
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Heavy Shields", //5
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Tower Shields", //6
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "One-Handed Hammers", //7
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Two-Handed Hammers", //8
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Spears", //9
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Halberds", //10
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Naginatas", //11
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Boomerangs", //12
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Slings", //13
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Bows", //14
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Small Bombs", //15
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Medium Bombs", //16
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Large Bombs", //17
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Bombs (Other)", //18
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Fire Rods", //19
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Ice Rods", //20
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Lightning Rods", //21
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Tornado Rods", //22
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Sand Rods", //23
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Whips", //24
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Ball & Chains", //25
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Unarmed", //26
        trained: false,
        ranks: 0,
        racial: 0
      }
    ];
    this.magicSkills = [
      {
        skillName: "Din",
        modifier: "Intelligence",
        ranks: 0
      },
      {
        skillName: "Nayru",
        modifier: "Wisdom",
        ranks: 0
      },
      {
        skillName: "Farore",
        modifier: "Charisma",
        ranks: 0
      }
    ];
    this.exp = 0;
  }

  changeRace?(raceName: string, subRaceName?: string): void {
    console.log("Race chagned to", raceName);
    subRaceName ? console.log('Sub Race',subRaceName) : null;
    switch (raceName) {
      case "Hylian": {
        //All Hylian Skills
        this.skills[6].racial = 4;
        this.skills[3].trained = true; //Climb
        this.skills[4].trained = true; //Craft 1
        this.skills[14].trained = true; //Knowledge (History)
        this.skills[15].trained = true; //Knowledge (Local)
        this.skills[21].trained = true; //Perception
        switch (subRaceName) {
          case "Farmer": {
            //Farmhand Hylian Skills
            this.attributes[0].value += 2; //Strength Buff
            this.skills[0].trained = true; //Acrobatics
            this.skills[9].trained = true; //Handle Animal
            this.skills[12].trained = true; //Knowledge (Geography)
            this.skills[18].trained = true; //Knowledge (Nature)
            this.skills[25].trained = true; //Ride
            this.skills[29].trained = true; //Survival
            this.skills[30].trained = true; //Swim
            break;
          }
          case "Sheikah": {
            //Sheikah Hylian Skills
            this.attributes[1].value += 2; //Dexterity Buff
            this.skills[0].trained = true; //Acronatics
            this.skills[1].trained = true; //Appraise
            this.skills[2].trained = true; //Bluff
            this.skills[7].trained = true; //Escpe Artist
            this.skills[11].trained = true; //Intimidate
            this.skills[14].trained = true; //Knowledge (Language)
            this.skills[19].trained = true; //Knowledge (Nobility)
            this.skills[20].trained = true; //Knowledge (Religion)
            this.skills[26].trained = true; //Sense Motive
            this.skills[28].trained = true; //Stealth
            break;
          }
          case "Guard": {
            //Guard Hylian Skills
            this.attributes[2].value += 2; //Consitution Buff
            this.skills[2].trained = true; //Bluff
            this.skills[4].trained = true; //Diplomacy
            this.skills[10].trained = true; //Heal
            this.skills[11].trained = true; //Intimidate
            this.skills[19].trained = true; //Knowledge (Nobility)
            this.skills[20].trained = true; //Knowledge (Religion)
            this.skills[24].trained = true; //Profession
            this.skills[25].trained = true; //Ride
            this.skills[26].trained = true; //Sense Motive
            break;
          }
        }

        break;
      }
      case "Goron": {
        
        this.skills[1].trained = true; //Appraise
        this.skills[3].trained = true; //Climb
        this.skills[11].trained = true; //Intimidate
        this.weaponSkills[7].trained = true; //Hammers
        this.weaponSkills[8].trained = true; //Hammers

        switch(subRaceName){
          case "Rock Spine":{
            this.attributes[0].value += 2; //Strength Buff
        
            break;
          }
          case "Soft Belly":{
            this.attributes[4].value += 1; //Wisdom Buff
            break;
          }
        }
        break;
      }
      case "Zora": {
        switch(subRaceName){
          case "River":{
            break;
          }
          case "Ocean":{
            break;
          }
          case "Swamp":{
            break;
          }
        }
        break;
      }
      case "Gerudo": {
        this.attributes[0].value += 2; //Strength Buff
        this.attributes[2].value += 1; //Constitution Buff
        this.skills[11].trained = true; //Intimidate
        break;
      }
      case "Sheikah": {
        break;
      }
      case "Twili": {
        break;
      }
      case "Rito": {
        //All Rito Skills
        this.skills[0].trained = true; //Acrobatics
        this.skills[4].trained = true; //Craft One
        this.skills[5].trained = true; //Craft Two
        this.skills[15].trained = true; //Knowledge (Local)
        this.skills[18].trained = true; //Knowledge (Nature)
        this.skills[21].trained = true; //Perception

        switch(subRaceName){
          case "Sharp Eye":{
            this.attributes[3].value += 1;
            break;
          }
          case "Telescopic Sight":{
            //All Rito already have Perception
            break;
          }
          case "Sharp Tongue":{
            this.attributes[5].value += 1;
            break;
          }
          case "Skilled Mimicry":{
            //Maybe Bluff?
            break;
          }
        }

        break;
      }
      case "Fairy": {
        switch(subRaceName){
          case "Din":{
            break;
          }
          case "Farore":{
            break;
          }
          case "Nayru":{
            break;
          }
        }
        break;
      }
    }
  }
}
