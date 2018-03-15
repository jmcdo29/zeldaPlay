import { Attribute } from "./attribute";
import { Skill } from "./skill";
export class Character {
  _id?: number;
  name: string;
  race: string;
  attributes: Attribute[];
  health: number;
  magic: number;
  exp: number;
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
        skillName: "Acrobatics",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Appraise",
        trained: false,
        ranks: 0,
        modifier: "Intelligence",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Bluff",
        trained: false,
        ranks: 0,
        modifier: "Charisma",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Climb",
        trained: false,
        ranks: 0,
        modifier: "Strength",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Craft (Fairy Made Armor)",
        trained: false,
        ranks: 0,
        modifier: "Intelligence",
        racial: 0,
        item: 0,
        misc: 0
      },
      {
        skillName: "Craft (Magic Potions)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Diplomacy",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Escape Artist",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Fly",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Handle Animal",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Heal",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Intimidate",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Strength",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Geography)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (History)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Language)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Local)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Magic)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Monster)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Nature)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Nobility)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Knowledge (Religion)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Intelligence",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perception",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perform (Music)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Perform (Other)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Charisma",
        item: 0,
        misc: 0
      },
      {
        skillName: "Profession (Armor Smith)",
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Ride",
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Sense Motive",
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Sleight of Hand",
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Stealth",
        ranks: 0,
        racial: 0,
        modifier: "Dexterity",
        item: 0,
        misc: 0
      },
      {
        skillName: "Survival",
        ranks: 0,
        racial: 0,
        modifier: "Wisdom",
        item: 0,
        misc: 0
      },
      {
        skillName: "Swim",
        ranks: 0,
        racial: 0,
        modifier: "Strength",
        item: 0,
        misc: 0
      }
    ];
    this.weaponSkills = [
      {
        skillName: "Short Swords",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Long Swords",
        ranks: 0,
        trained: false,
        racial: 0
      },
      {
        skillName: "Dual Swords",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Great Swords",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Light Shields",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Heavy Shields",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Tower Shields",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "One-Handed Hammers",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Two-Handed Hammers",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Spears",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Halberds",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Naginatas",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Boomerangs",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Slings",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Bows",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Small Bombs",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Medium Bombs",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Large Bombs",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Bombs (Other)",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Fire Rods",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Ice Rods",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Lightning Rods",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Tornado Rods",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Sand Rods",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Whips",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Ball & Chains",
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
        skillName: "Unarmed",
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
}
