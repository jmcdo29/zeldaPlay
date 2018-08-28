import { Attribute } from './attribute';
import { Attributes } from './enums/attributes.enum';
import { Level } from './enums/levels.enum';
import { Magics } from './enums/magic-skills.enum';
import { Saves } from './enums/saves.enum';
import { Skills } from './enums/skills.enum';
import { Weapons } from './enums/weapon-skills.enum';
import { Item } from './item';
import { Note } from './note';
import { ISave } from './save';
import { ISkill } from './skill';
import { Spell } from './spells';
import { Weapon } from './Weapons/weapon';

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
  skills: ISkill[];
  weaponSkills: ISkill[];
  magicSkills: ISkill[];
  weapons: Weapon[];
  spells: Spell[];
  notes: Note[];
  importantNotes: Note[];
  inventory: Item[];
  savingThrows: ISave[];
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
  notes: any[];
  saves: any[];
  skills: any[];
  spells: any[];
  weapons: any[];
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
  skills: ISkill[] = [];
  weaponSkills: ISkill[] = [];
  magicSkills: ISkill[] = [];
  weapons: Weapon[] = [];
  spells: Spell[] = [];
  notes: Note[] = [];
  importantNotes: Note[] = [];
  inventory: Item[] = [];
  savingThrows: ISave[] = [];

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
        for (const skill of attrArrays[i]) {
          this.skills[skill].modifier = Attributes[i];
        }
        /* for (let j = 0; j < attrArrays[i].length; j++) {
          this.skills[attrArrays[i][j]].modifier = Attributes[i];
        } */
      }
      this.exp = 0;
    } else {
      if (qObj) {
        this.name = qObj.name;
        this.ac = qObj.ac;
        this.id = qObj.id;
        this.level = qObj.level;
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
            name: 'Strength',
            value: qObj.strength,
            modifier: getMod(qObj.strength)
          },
          {
            name: 'Dexterity',
            value: qObj.dexterity,
            modifier: getMod(qObj.dexterity)
          },
          {
            name: 'Constitution',
            value: qObj.constitution,
            modifier: getMod(qObj.constitution)
          },
          {
            name: 'Intelligence',
            value: qObj.intelligence,
            modifier: getMod(qObj.intelligence)
          },
          {
            name: 'Wisdom',
            value: qObj.wisdom,
            modifier: getMod(qObj.wisdom)
          },
          {
            name: 'Charisma',
            value: qObj.charisma,
            modifier: getMod(qObj.charisma)
          }
        ];
        qObj.skills.forEach((skill) => {
          if (skill.skill_type === 'skill') {
            const newSkill: ISkill = {
              skillName: skill.name,
              ranks: skill.ranks,
              racial: skill.racial_modifier,
              item: skill.item_modifier,
              misc: skill.misc_modifier,
              trained: skill.trained,
              modifier: skill.modifier,
              id: skill.id
            };
            this.skills.push(newSkill);
          } else if (skill.skill_type === 'weapon') {
            const newWeapSkill: ISkill = {
              skillName: skill.name,
              ranks: skill.ranks,
              trained: skill.trained,
              racial: skill.racial_modifier,
              id: skill.id
            };
            this.weaponSkills.push(newWeapSkill);
          } else {
            const newMagSkill: ISkill = {
              skillName: skill.name,
              ranks: skill.ranks,
              modifier: skill.modifier,
              id: skill.id
            };
            this.magicSkills.push(newMagSkill);
          }
        });
        qObj.notes.forEach((note) => {
          if (note.important) {
            this.notes.push({
              msg: note.message,
              time: note.time,
              important: note.important,
              id: note.id
            });
          } else {
            this.notes.push({
              msg: note.message,
              time: note.time,
              important: note.important,
              id: note.id
            });
          }
        });
        qObj.saves.forEach((save) => {
          this.savingThrows.push({
            racial: save.racial_bonus,
            name: save.name,
            modifier: save.modifier,
            id: save.id
          });
        });
        qObj.weapons.forEach((weapon) => {
          const newWep = new Weapon();
          newWep.attack = weapon.damage;
          newWep.ammo = weapon.ammo ? weapon.ammo : null;
          newWep.name = weapon.name;
          newWep.type = weapon.type;
          newWep.numberOfAttacks = weapon.number_of_hits;
          newWep.critDamage = weapon.crit_multiplier;
          newWep.range = weapon.range ? weapon.range : null;
          newWep.modifier = weapon.modifier;
          newWep.critRange = parseRange(weapon.crit_range);
          newWep.id = weapon.id;
          this.weapons.push(newWep);
        });
        qObj.spells.forEach((spell) => {
          this.spells.push({
            name: spell.name,
            effect: spell.effect,
            mpUse: spell.mp_use,
            damage: spell.damage,
            multiplier: spell.number_of_hit,
            modifier: spell.modifier ? spell.modifier : null,
            diety: spell.diety,
            useDiety: spell.use_diety,
            id: spell.id
          });
        });
      } else {
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

  levelUp(): void {
    this.health = this.maxHealth += 16 + this.attributes[2].modifier;
    this.magic = this.maxMagic += 3 + this.attributes[4].modifier;
    this.level++;
  }

  gainExp(expGain: number): void {
    let counter = 0;
    this.exp += expGain;
    const lvl = 'level';
    for (const key in Level) {
      if (key.includes('level')) {
        counter++;
        if (
          Level[lvl + counter] <= this.exp &&
          this.exp <= Level[lvl + (counter + 1)]
        ) {
          this.level = counter;
          break;
        }
      }
    }
  }
}

function parseRange(range: string): number[] {
  if (range.length === 2) {
    return [Number.parseInt(range, 10)];
  } else {
    const bottom: number = Number.parseInt(range.substring(0, 2), 10);
    const top: number = Number.parseInt(range.substring(range.length - 2), 10);
    const diff: number = top - bottom;
    const retArray: number[] = [];
    for (let i = 0; i <= diff; i++) {
      retArray.push(bottom + i);
    }
    return retArray;
  }
}

function getMod(value: number): number {
  return (value % 2 === 0 ? value - 10 : value - 11) / 2;
}
