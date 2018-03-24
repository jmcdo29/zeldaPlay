import { Attribute } from './attribute';
import { Skill } from './skill';
import { Weapon } from '../Weapons/weapon';
import { RangedWeapon } from '../Weapons/rangeWeapon';

const BASE = 8;
export class Character {
  _id?: number;
  name: string;
  race: string;
  subRace?: string;
  attributes: Attribute[];
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  exp: number;
  craftOne?: string;
  craftTwo?: string;
  performCust?: string;
  profession?: string;
  skills: Skill[];
  weaponSkills: Skill[];
  magicSkills: Skill[];
  meleeWeapons?: Weapon[];
  rangedWeapons?: RangedWeapon[];

  constructor() {
    this.attributes = [
      {
        name: 'Strength',
        value: BASE,
        modifier: 0
      },
      {
        name: 'Dexterity',
        value: BASE,
        modifier: 0
      },
      {
        name: 'Constitution',
        value: BASE,
        modifier: 0
      },
      {
        name: 'Intelligence',
        value: BASE,
        modifier: 0
      },
      {
        name: 'Wisdom',
        value: BASE,
        modifier: 0
      },
      {
        name: 'Charisma',
        value: BASE,
        modifier: 0
      }
    ];
    this.skills = [
      {
      skillName: 'Acrobatics', // 0
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Appraise', // 1
        trained: false,
        ranks: 0,
        modifier: 'Intelligence',
        racial: 0,
        item: 0,
        misc: 0
      },
      {
      skillName: 'Bluff', // 2
        trained: false,
        ranks: 0,
        modifier: 'Charisma',
        racial: 0,
        item: 0,
        misc: 0
      },
      {
      skillName: 'Climb', // 3
        trained: false,
        ranks: 0,
        modifier: 'Strength',
        racial: 0,
        item: 0,
        misc: 0
      },
      {
      skillName: 'Craft 1', // 4
        trained: false,
        ranks: 0,
        modifier: 'Intelligence',
        racial: 0,
        item: 0,
        misc: 0
      },
      {
      skillName: 'Craft 2', // 5
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Diplomacy', // 6
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Charisma',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Escape Artist', // 7
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Fly', // 8
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Handle Animal', // 9
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Charisma',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Heal', // 10
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Wisdom',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Intimidate', // 11
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Strength',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Geography)', // 12
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (History)', // 13
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Language)', // 14
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Local)', // 15
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Magic)', // 16
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Monster)', // 17
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Nature)', // 18
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Nobility)', // 19
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Knowledge (Religion)', // 20
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Intelligence',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Perception', // 21
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Wisdom',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Perform (Music)', // 22
        trained: true,
        ranks: 0,
        racial: 0,
        modifier: 'Charisma',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Perform', // 23
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Charisma',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Profession', // 24
        trained: false,
        ranks: 0,
        racial: 0,
        modifier: 'Wisdom',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Ride', // 25
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Sense Motive', // 26
        ranks: 0,
        racial: 0,
        modifier: 'Wisdom',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Sleight of Hand', // 27
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Stealth', // 28
        ranks: 0,
        racial: 0,
        modifier: 'Dexterity',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Survival', // 29
        ranks: 0,
        racial: 0,
        modifier: 'Wisdom',
        item: 0,
        misc: 0
      },
      {
      skillName: 'Swim', // 30
        ranks: 0,
        racial: 0,
        modifier: 'Strength',
        item: 0,
        misc: 0
      }
    ];
    this.weaponSkills = [
      {
      skillName: 'Short Swords', // 0
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Long Swords', // 1
        ranks: 0,
        trained: false,
        racial: 0
      },
      {
      skillName: 'Dual Swords', // 2
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Great Swords', // 3
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Light Shields', // 4
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Heavy Shields', // 5
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Tower Shields', // 6
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'One-Handed Hammers', // 7
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Two-Handed Hammers', // 8
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Spears', // 9
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Halberds', // 10
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Naginatas', // 11
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Boomerangs', // 12
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Slings', // 13
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Bows', // 14
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Small Bombs', // 15
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Medium Bombs', // 16
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Large Bombs', // 17
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Bombs (Other)', // 18
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Fire Rods', // 19
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Ice Rods', // 20
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Lightning Rods', // 21
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Tornado Rods', // 22
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Sand Rods', // 23
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Whips', // 24
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Ball & Chains', // 25
        trained: false,
        ranks: 0,
        racial: 0
      },
      {
      skillName: 'Unarmed', // 26
        trained: false,
        ranks: 0,
        racial: 0
      }
    ];
    this.magicSkills = [
      {
      skillName: 'Din',
        modifier: 'Intelligence',
        ranks: 0
      },
      {
      skillName: 'Nayru',
        modifier: 'Wisdom',
        ranks: 0
      },
      {
      skillName: 'Farore',
        modifier: 'Charisma',
        ranks: 0
      }
    ];
    this.exp = 0;
  }


}
