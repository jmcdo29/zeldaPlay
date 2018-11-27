import { Attributes } from '#Enums/attributes.enum';
import { Level } from '#Enums/levels.enum';
import { Magics } from '#Enums/magic-skills.enum';
import { Saves } from '#Enums/saves.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Attribute } from '#Models/attribute';
import { ICharacterQuery } from '#Models/character.db';
import { Item } from '#Models/item';
import { Note } from '#Models/note';
import { Save } from '#Models/save';
import { Skill } from '#Models/skill';
import { Spell } from '#Models/spells';
import { Elemental } from '#Models/weapons/elemental';
import { Weapon } from '#Models/weapons/weapon';

const BASE = 8;

export interface ICharacterJSON {
  id?: string;
  level: number;
  name: string;
  race: string;
  subRace?: string;
  ac: number;
  flat_footed: number;
  touch: number;
  size: string;
  attributes: Array<{ name: string; value: number }>;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  exp: number;
  craftOne?: string;
  craftTwo?: string;
  performCust?: string;
  profession?: string;
  skills: Array<{
    skillName: string;
    ranks: number;
    trained: boolean;
    modifier?: string;
    item?: number;
    racial?: number;
    misc?: number;
    id?: string;
  }>;
  weaponSkills: Array<{
    skillName: string;
    ranks: number;
    trained: boolean;
    racial?: number;
    id?: string;
  }>;
  magicSkills: Array<{
    skillName: string;
    ranks: number;
    modifier?: string;
    id?: string;
  }>;
  weapons: Array<{
    id?: string;
    name: string;
    attack: number;
    numberOfAttacks: number;
    range: number;
    modifier: string;
    type: string;
    ammo?: number;
    element?: {
      type: string;
      attack: number;
      numberOfAttacks: number;
      id?: string;
    };
    critRange: number[];
    critDamage: number;
  }>;
  spells: Array<{
    id?: string;
    name: string;
    effect: string;
    damage: number;
    multiplier: number;
    mpUse: number;
    diety: string;
    useDiety: boolean;
    modifier?: string;
  }>;
  notes: Array<{ msg: string; time: string; important: boolean; id?: string }>;
  importantNotes: Array<{
    msg: string;
    time: string;
    important: boolean;
    id?: string;
  }>;
  inventory: Array<{ name: string; description: string; id?: string }>;
  savingThrows: Array<{
    id?: string;
    name: string;
    modifier: string;
    racial: number;
  }>;
}

export class Character {
  private _id?: string;
  private _level: number;
  private _name: string;
  private _race: string;
  private _subRace?: string;
  private _ac: number;
  private _flatFooted: number;
  private _touch: number;
  private _size: string;
  private _attributes: Attribute[] = [];
  private _health: number;
  private _maxHealth: number;
  private _magic: number;
  private _maxMagic: number;
  private _exp: number;
  private _craftOne?: string;
  private _craftTwo?: string;
  private _performCust?: string;
  private _profession?: string;
  private _skills: Skill[] = [];
  private _weaponSkills: Skill[] = [];
  private _magicSkills: Skill[] = [];
  private _weapons: Weapon[] = [];
  private _spells: Spell[] = [];
  private _notes: Note[] = [];
  private _importantNotes: Note[] = [];
  private _inventory: Item[] = [];
  private _savingThrows: Save[] = [];

  get id(): string {
    return this._id ? this._id : '';
  }

  set id(id: string) {
    this._id = id;
  }

  get level(): number {
    return this._level ? this._level : 1;
  }

  set level(level: number) {
    this._level = level;
  }

  get name(): string {
    return this._name ? this._name : '';
  }

  set name(name: string) {
    this._name = name;
  }

  get race(): string {
    return this._race ? this._race : '';
  }

  set race(race: string) {
    this._race = race;
  }

  get subRace(): string {
    return this._subRace ? this._subRace : '';
  }

  set subRace(subRace: string) {
    this._subRace = subRace;
  }

  get ac(): number {
    return this._ac || this._ac === 0 ? this._ac : null;
  }

  set ac(ac: number) {
    this._ac = ac;
  }

  get flatFooted(): number {
    return this._flatFooted || this._flatFooted === 0 ? this._flatFooted : null;
  }

  set flatFooted(flatFooted: number) {
    this._flatFooted = flatFooted;
  }

  get touch(): number {
    return this._touch || this._touch === 0 ? this._touch : null;
  }

  set touch(touch: number) {
    this._touch = touch;
  }

  get size(): string {
    return this._size ? this._size : 'M';
  }

  set size(size: string) {
    this._size = size;
  }

  get health(): number {
    return this._health || this._health === 0 ? this._health : null;
  }

  set health(health: number) {
    this._health = health;
  }

  changeHealth(healthVal: number): void {
    this.health = this.health + healthVal;
    this.health =
      this.health > this.maxHealth
        ? this.maxHealth
        : this.health < -10
        ? -10
        : this.health;
  }

  get maxHealth(): number {
    return this._maxHealth || this._maxHealth === 0 ? this._maxHealth : null;
  }

  set maxHealth(maxHealth: number) {
    this._maxHealth = maxHealth;
  }

  get magic(): number {
    return this._magic || this._magic === 0 ? this._magic : null;
  }

  set magic(magic: number) {
    this._magic = magic;
  }

  changeMagic(magicVal: number): void {
    this.magic = this.magic + magicVal;
    this.magic =
      this.magic > this.maxMagic
        ? this.maxMagic
        : this.magic < 0
        ? 0
        : this.magic;
  }

  get maxMagic(): number {
    return this._maxMagic || this._maxMagic === 0 ? this._maxMagic : null;
  }

  set maxMagic(maxMagic: number) {
    this._maxMagic = maxMagic;
  }

  get exp(): number {
    return this._exp ? this._exp : 0;
  }

  set exp(exp: number) {
    this._exp = exp;
  }

  get craftOne(): string {
    return this._craftOne ? this._craftOne : '';
  }

  set craftOne(craftOne: string) {
    this._craftOne = craftOne;
  }

  get craftTwo(): string {
    return this._craftTwo ? this._craftTwo : '';
  }

  set craftTwo(craftTwo: string) {
    this._craftTwo = craftTwo;
  }

  get performCust(): string {
    return this._performCust ? this._performCust : '';
  }

  set performCust(performCust: string) {
    this._performCust = performCust;
  }

  get profession(): string {
    return this._profession ? this._profession : '';
  }

  set profession(profession: string) {
    this._profession = profession;
  }

  get skills(): Skill[] {
    return this._skills.length > 0 ? this._skills : [];
  }

  addSkill(skill: Skill): void {
    this._skills.push(skill);
  }

  get attributes(): Attribute[] {
    return this._attributes.length > 0 ? this._attributes : [];
  }
  /*
  setAttributes(attributes: Attribute[]): void {
    this.attributes = attributes;
  } */

  addAttribute(attribute: Attribute): void {
    this._attributes.push(attribute);
  }

  /*
  setSkills(skills: Skill[]): void {
    this.skills = skills;
  } */

  get weaponSkills(): Skill[] {
    return this._weaponSkills.length > 0 ? this._weaponSkills : [];
  }
  /*
  setWeaponSkills(weaponSkills: Skill[]): void {
    this.weaponSkills = weaponSkills;
  } */

  addWeaponSkill(weaponSkill: Skill): void {
    this._weaponSkills.push(weaponSkill);
  }

  get magicSkills(): Skill[] {
    return this._magicSkills.length > 0 ? this._magicSkills : [];
  }
  /*
  setMagicSkills(magicSkills: Skill[]): void {
    this.magicSkills = magicSkills;
  } */

  addMagicSkill(magicSkill: Skill): void {
    this._magicSkills.push(magicSkill);
  }

  get weapons(): Weapon[] {
    return this._weapons.length > 0 ? this._weapons : [];
  }
  /*
  setWeapons(weapons: Weapon[]): void {
    this.weapons = weapons;
  } */

  addWeapon(weapon: Weapon): void {
    this._weapons.push(weapon);
  }

  get spells(): Spell[] {
    return this._spells.length > 0 ? this._spells : [];
  }
  /*
  setSpells(spells: Spell[]): void {
    this.spells = spells;
  } */

  addSpell(spell: Spell): void {
    this._spells.push(spell);
  }

  get notes(): Note[] {
    return this._notes.length > 0 ? this._notes : [];
  }
  /*
  setNotes(notes: Note[]): void {
    this.notes = notes;
  } */

  addNote(note: Note): void {
    this._notes.push(note);
  }

  get importantNotes(): Note[] {
    return this._importantNotes.length > 0 ? this._importantNotes : [];
  }
  /*
  setImportantNotes(importantNotes: Note[]): void {
    this.importantNotes = importantNotes;
  } */

  addImportantNote(importantNote: Note): void {
    this._importantNotes.push(importantNote);
  }

  get inventory(): Item[] {
    return this._inventory.length > 0 ? this._inventory : [];
  }
  /*
  setInventory(inventory: Item[]): void {
    this.inventory = inventory;
  } */

  addToInventory(item: Item): void {
    this._inventory.push(item);
  }

  get savingThrows(): Save[] {
    return this._savingThrows.length > 0 ? this._savingThrows : [];
  }
  /*
  setSavingThrows(savingThrows: Save[]): void {
    this.savingThrows = savingThrows;
  } */

  addSavingThrow(savingThrow: Save): void {
    this._savingThrows.push(savingThrow);
  }

  // tslint:disable-next-line:no-big-function cognitive-complexity
  constructor(jObj?: ICharacterJSON, qObj?: ICharacterQuery) {
    if (!jObj && !qObj) {
      for (const key in Attributes) {
        if (isNaN(Number(key))) {
          this._attributes.push(new Attribute(key, BASE));
        }
      }

      for (const key in Skills) {
        if (isNaN(Number(key))) {
          this._skills.push(new Skill(undefined, key, 0, false, '', 0, 0, 0));
        }
      }

      for (const key in Weapons) {
        if (isNaN(Number(key))) {
          this._weaponSkills.push(
            new Skill(undefined, key, 0, false, undefined, undefined, 0)
          );
        }
      }

      for (const key in Magics) {
        if (isNaN(Number(key))) {
          const mod =
            key === 'Din'
              ? 'Intelligence'
              : key === 'Nayru'
              ? 'Wisdom'
              : 'Charisma';
          this._magicSkills.push(new Skill(undefined, key, 0, undefined, mod));
        }
      }

      for (const key in Saves) {
        if (isNaN(Number(key))) {
          const modifier =
            key === 'Fortitude'
              ? 'Constitution'
              : key === 'Reflex'
              ? 'Dexterity'
              : 'Wisdom';
          this._savingThrows.push(new Save(undefined, key, modifier, 0));
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
          this._skills[skill].modifier = Attributes[i];
        }
      }
      this.exp = 0;
    } else {
      if (qObj) {
        this._name = qObj.name;
        this._ac = qObj.ac;
        this._id = qObj.id;
        this._level = qObj.level;
        this._craftOne = qObj.craft_one;
        this._craftTwo = qObj.craft_two;
        this._profession = qObj.profession;
        this._performCust = qObj.performance;
        this._maxHealth = qObj.max_health;
        this._exp = qObj.experience;
        this._health = qObj.health;
        this._magic = qObj.magic;
        this._maxMagic = qObj.max_magic;
        this._race = qObj.race;
        this._subRace = qObj.subrace;
        this._size = qObj.size;
        this._flatFooted = qObj.flat_footed;
        this._touch = qObj.touch;

        this._attributes.push(new Attribute('Strength', qObj.strength));
        this._attributes.push(new Attribute('Dexterity', qObj.dexterity));
        this._attributes.push(new Attribute('Constitution', qObj.constitution));
        this._attributes.push(new Attribute('Intelligence', qObj.intelligence));
        this._attributes.push(new Attribute('Wisdom', qObj.wisdom));
        this._attributes.push(new Attribute('Charisma', qObj.charisma));

        for (const skill of qObj.skills) {
          if (skill.skill_type === 'skill') {
            this._skills.push(
              new Skill(
                skill.id,
                skill.name,
                skill.ranks,
                skill.trained,
                skill.modifier,
                skill.item_modifier,
                skill.racial_modifier,
                skill.misc_modifier
              )
            );
          } else if (skill.skill_type === 'weapon') {
            this._weaponSkills.push(
              new Skill(
                skill.id,
                skill.name,
                skill.ranks,
                skill.trained,
                undefined,
                undefined,
                skill.racial_modifier,
                undefined
              )
            );
          } else {
            this._magicSkills.push(
              new Skill(
                skill.id,
                skill.name,
                skill.ranks,
                undefined,
                skill.modifier,
                undefined,
                undefined,
                undefined
              )
            );
          }
        }
        for (const save of qObj.saves) {
          this._savingThrows.push(
            new Save(save.id, save.name, save.modifier, save.racial_bonus)
          );
        }
      } else {
        for (const attr of jObj.attributes) {
          this._attributes.push(new Attribute(attr.name, attr.value));
        }
        for (const item of jObj.inventory) {
          this._inventory.push(new Item(item.id, item.name, item.description));
        }
        for (const skill of jObj.skills) {
          this._skills.push(
            new Skill(
              skill.id,
              skill.skillName,
              skill.ranks,
              skill.trained,
              skill.modifier,
              skill.item,
              skill.racial,
              skill.misc
            )
          );
        }
        for (const skill of jObj.weaponSkills) {
          this._weaponSkills.push(
            new Skill(
              skill.id,
              skill.skillName,
              skill.ranks,
              skill.trained,
              undefined,
              undefined,
              skill.racial,
              undefined
            )
          );
        }
        for (const skill of jObj.magicSkills) {
          this._magicSkills.push(
            new Skill(
              skill.id,
              skill.skillName,
              skill.ranks,
              undefined,
              skill.modifier,
              undefined,
              undefined,
              undefined
            )
          );
        }
        for (const note of jObj.notes) {
          this._notes.push(
            new Note(note.id, note.msg, note.time, note.important)
          );
        }
        for (const note of jObj.importantNotes) {
          this._importantNotes.push(
            new Note(note.id, note.msg, note.time, note.important)
          );
        }
        for (const spell of jObj.spells) {
          this._spells.push(
            new Spell(
              spell.id,
              spell.name,
              spell.effect,
              spell.damage,
              spell.multiplier,
              spell.mpUse,
              spell.diety,
              spell.useDiety,
              spell.modifier
            )
          );
        }
        for (const save of jObj.savingThrows) {
          this._savingThrows.push(
            new Save(save.id, save.name, save.modifier, save.racial)
          );
        }
        for (const weapon of jObj.weapons) {
          this._weapons.push(
            new Weapon(
              weapon.id,
              weapon.name,
              weapon.attack,
              weapon.numberOfAttacks,
              weapon.critRange,
              weapon.critDamage,
              weapon.type,
              weapon.modifier,
              weapon.range,
              weapon.ammo,
              weapon.element
                ? new Elemental(
                    weapon.element.id,
                    weapon.element.type,
                    weapon.element.attack,
                    weapon.element.numberOfAttacks
                  )
                : undefined
            )
          );
        }
        this._ac = jObj.ac;
        this._craftOne = jObj.craftOne;
        this._craftOne = jObj.craftTwo;
        this._exp = jObj.exp;
        this._flatFooted = jObj.flat_footed;
        this._health = jObj.health;
        this._id = jObj.id;
        this._level = jObj.level;
        this._magic = jObj.magic;
        this._maxHealth = jObj.maxHealth;
        this._maxMagic = jObj.maxMagic;
        this._name = jObj.name;
        this._performCust = jObj.performCust;
        this._profession = jObj.profession;
        this._race = jObj.race;
        this._size = jObj.size;
        this._subRace = jObj.subRace;
        this._touch = jObj.touch;
      }
    }
  }

  levelUp(): void {
    this.maxHealth = this.maxHealth + 16 + this.attributes[2].modifier;
    this.health = this.maxHealth;
    this.maxMagic = this.maxMagic + 3 + this.attributes[4].modifier;
    this.magic = this.maxMagic;
    this.level += 1;
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
