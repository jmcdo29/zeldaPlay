import { Attribute } from './attribute';
import { Skill } from './skill';
import { Weapon } from './Weapons/weapon';
import { Spell } from './spells';
import { Attributes } from './Enums/attributes.enum';
import { Weapons } from './Enums/weapon-skills.enum';
import { Skills } from './Enums/skills.enum';
import { Magics } from './Enums/magic-skills.enum';
import { Saves } from './Enums/saves.enum';
import { Save } from './save';
import { Item } from '../Item/item';
import { Note } from './note';

const BASE = 8;
export class Character {
  _id?: number;
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

  constructor() {
    for (const key in Attributes) {
      if (isNaN(Number(key))) {
        const attr = {
          name: key,
          value: BASE,
          modifier: -1
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
          modifier: key === 'Din' ? 'Intelligence' : key === 'Nayru' ? 'Wisdom' : 'Charisma'
        };
        this.magicSkills.push(magic);
      }
    }

    for (const key in Saves) {
      if (isNaN(Number(key))) {
        const save = {
          name: key,
          modifier: key === 'Fortitude' ? 'Constitution' : key === 'Reflex' ? 'Dexterity' : 'Wisdom',
          racial: 0
        };
        this.savingThrows.push(save);
      }
    }

    const strArray = [3, 11, 31];
    const dexArray = [0, 7, 8, 26, 28, 29];
    const conArray = [];
    const intArray = [1, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const wisArray = [10, 22, 25, 27, 30];
    const chaArray = [2, 6, 9, 23, 24];
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
  }
}
