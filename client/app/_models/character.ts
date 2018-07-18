import { Attribute } from './attribute';
import { Skill } from './skill';
import { Weapon } from './Weapons/weapon';
import { Spell } from './spells';
import { Attributes } from '../_enums/attributes.enum';
import { Weapons } from '../_enums/weapon-skills.enum';
import { Skills } from '../_enums/skills.enum';
import { Magics } from '../_enums/magic-skills.enum';
import { Saves } from '../_enums/saves.enum';
import { Save } from './save';
import { Item } from './item';
import { Note } from './note';

const BASE = 8;

interface ICharacterJSON {
  id?: string;
  level: number;
  name: string;
  race: string;
  subRace?: string;
  ac: number;
  flat_footed: number;
  touch: number;
  size: string;
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
  weapons: Weapon[];
  spells: Spell[];
  notes: Note[];
  importantNotes: Note[];
  inventory: Item[];
  savingThrows: Save[];
}

interface ICharacterQuery {
  ac: number;
  charisma: number;
  constitution: number;
  craft_one: string;
  craft_two: string;
  dexterity: number;
  experience: number;
  flat_footed: number;
  health: number;
  id: string;
  intelligence: number;
  level: number;
  magic: number;
  max_health: number;
  max_magic: number;
  name: string;
  performance: string;
  profession: string;
  race: string;
  size: string;
  strength: number;
  subrace: string;
  touch: number;
  wisdom: number;
}
export class Character {
  id?: string;
  level: number;
  name: string;
  race: string;
  subRace?: string;
  ac: number;
  flat_footed: number;
  touch: number;
  size: string;
  attributes: Attribute[] = [];
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  exp: number;
  craftOne?: string;
  craftTwo?: string;
  performCust?: string;
  profession?: string;
  skills: Skill[] = [];
  weaponSkills: Skill[] = [];
  magicSkills: Skill[] = [];
  weapons: Weapon[] = [];
  spells: Spell[] = [];
  notes: Note[] = [];
  importantNotes: Note[] = [];
  inventory: Item[] = [];
  savingThrows: Save[] = [];

  constructor(jObj?: ICharacterJSON, qObj?: ICharacterQuery) {
    if (!jObj && !qObj) {
      for (const key in Attributes) {
        if (isNaN(Number(key))) {
          const attr = {
            name: key,
            value: BASE,
            modifier: (BASE - 10) / 2
          };
          this.attributes.push(attr);
        }
      }

      for (const key in Skills) {
        if (isNaN(Number(key))) {
          const skill = {
            skillName: key,
            ranks: 0,
            racial: 0,
            trained: false,
            item: 0,
            misc: 0,
            modifier: ''
          };
          this.skills.push(skill);
        }
      }

      for (const key in Weapons) {
        if (isNaN(Number(key))) {
          const weapon = {
            skillName: key,
            trained: false,
            ranks: 0,
            racial: 0
          };
          this.weaponSkills.push(weapon);
        }
      }

      for (const key in Magics) {
        if (isNaN(Number(key))) {
          const magic = {
            skillName: key,
            ranks: 0,
            modifier:
              key === 'Din'
                ? 'Intelligence'
                : key === 'Nayru'
                  ? 'Wisdom'
                  : 'Charisma'
          };
          this.magicSkills.push(magic);
        }
      }

      for (const key in Saves) {
        if (isNaN(Number(key))) {
          const save = {
            name: key,
            modifier:
              key === 'Fortitude'
                ? 'Constitution'
                : key === 'Reflex'
                  ? 'Dexterity'
                  : 'Wisdom',
            racial: 0
          };
          this.savingThrows.push(save);
        }
      }
      /* A T T R I B U T E   A R R A Y S */
      const strArray = [Skills['Climb'], Skills['Intimidate'], Skills['Swim']];

      const dexArray = [
        Skills['Acrobatics'],
        Skills['Escape Artist'],
        Skills['Fly'],
        Skills['Ride'],
        Skills['Sleight of Hand'],
        Skills['Stealth']
      ];

      const conArray = [];

      const intArray = [
        Skills['Appraise'],
        Skills['CraftOne'],
        Skills['CraftTwo'],
        Skills['Knowledge Geography'],
        Skills['Knowledge History'],
        Skills['Knowledge Language'],
        Skills['Knowledge Local'],
        Skills['Knowledge Magic'],
        Skills['Knowledge Monsters'],
        Skills['Knowledge Nature'],
        Skills['Knowledge Nobility'],
        Skills['Knowledge Plains'],
        Skills['Knowledge Religion']
      ];

      const wisArray = [
        Skills['Heal'],
        Skills['Perception'],
        Skills['Profession'],
        Skills['Sense Motive'],
        Skills['Survival']
      ];

      const chaArray = [
        Skills['Bluff'],
        Skills['Diplomacy'],
        Skills['Handle Animal'],
        Skills['Perform Music'],
        Skills['Perform Other']
      ];
      /*E N D   A T T R I B U T E   A R R A Y S */

      const attrArrays = [
        strArray,
        dexArray,
        conArray,
        intArray,
        wisArray,
        chaArray
      ];
      for (let i = 0; i < attrArrays.length; i++) {
        for (let j = 0; j < attrArrays[i].length; j++) {
          this.skills[attrArrays[i][j]].modifier = Attributes[i];
        }
      }
      this.exp = 0;
    } else {
      if (qObj) {
        this.name = qObj.name;
        this.ac = qObj.ac;
        this.id = qObj.id;
        this.craftOne = qObj.craft_one;
        this.craftTwo = qObj.craft_two;
        this.profession = qObj.profession;
        this.performCust = qObj.performance;
        this.maxHealth = qObj.max_health;
        this.exp = qObj.experience;
        this.health = qObj.health;
        this.magic = qObj.magic;
        this.maxMagic = qObj.max_magic;
        this.race = qObj.race;
        this.subRace = qObj.subrace;
        this.size = qObj.size;
        this.flat_footed = qObj.flat_footed;
        this.touch = qObj.touch;
        this.attributes = [
          {
            name: 'strength',
            value: qObj.strength,
            modifier: (qObj.strength - 10) / 2
          }, {
            name: 'dexterity',
            value: qObj.dexterity,
            modifier: (qObj.dexterity - 10) / 2
          }, {
            name: 'constitution',
            value: qObj.constitution,
            modifier: (qObj.constitution - 10 ) / 2
          }, {
            name: 'intelligence',
            value: qObj.intelligence,
            modifier: (qObj.intelligence - 10 ) / 2
          }, {
            name: 'wisdom',
            value: qObj.wisdom,
            modifier: (qObj.wisdom - 10 ) / 2
          }, {
            name: 'charisma',
            value: qObj.charisma,
            modifier: (qObj.charisma - 10 ) / 2
          }
        ];
      } else if (jObj) {
        this.attributes = jObj.attributes;
        this.ac = jObj.ac;
        this.craftOne = jObj.craftOne;
        this.craftOne = jObj.craftTwo;
        this.exp = jObj.exp;
        this.flat_footed = jObj.flat_footed;
        this.health = jObj.health;
        this.id = jObj.id;
        this.importantNotes = jObj.importantNotes;
        this.inventory = jObj.inventory;
        this.level = jObj.level;
        this.magic = jObj.magic;
        this.magicSkills = jObj.magicSkills;
        this.maxHealth = jObj.maxHealth;
        this.maxMagic = jObj.maxMagic;
        this.name = jObj.name;
        this.notes = jObj.notes;
        this.performCust = jObj.performCust;
        this.profession = jObj.profession;
        this.race = jObj.race;
        this.savingThrows = jObj.savingThrows;
        this.size = jObj.size;
        this.skills = jObj.skills;
        this.spells = jObj.spells;
        this.subRace = jObj.subRace;
        this.touch = jObj.touch;
        this.weapons = jObj.weapons;
        this.weaponSkills = jObj.weaponSkills;
      }
    }
  }
}
