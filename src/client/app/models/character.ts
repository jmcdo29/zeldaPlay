import { Attribute } from './attribute';
import { Attributes } from './enums/attributes.enum';
import { Level } from './enums/levels.enum';
import { Magics } from './enums/magic-skills.enum';
import { Saves } from './enums/saves.enum';
import { Skills } from './enums/skills.enum';
import { Weapons } from './enums/weapon-skills.enum';
import { Item } from './item';
import { Note } from './note';
import { Save } from './save';
import { Skill } from './skill';
import { Spell } from './spells';
import { Elemental } from './weapons/elemental';
import { Weapon } from './weapons/weapon';

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

export interface ICharacterQuery {
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
  notes: Array<{
    message: string;
    time: string;
    important: boolean;
    id?: string;
  }>;
  saves: Array<{
    id?: string;
    name: string;
    modifier: string;
    racial_bonus: number;
  }>;
  skills: Array<{
    name: string;
    ranks: number;
    trained: boolean;
    modifier?: string;
    item_modifier?: number;
    racial_modifier?: number;
    misc_modifier?: number;
    id?: string;
    skill_type: string;
  }>;
  spells: Array<{
    id?: string;
    name: string;
    effect: string;
    damage: number;
    number_of_hit: number;
    mp_use: number;
    diety: string;
    use_diety: boolean;
    modifier?: string;
  }>;
  weapons: Array<{
    id?: string;
    name: string;
    damage: number;
    number_of_hits: number;
    crit_range: string;
    crit_multiplier: number;
    range: number;
    ammo?: number;
    type: string;
    modifier: string;
    element?: any;
  }>;
}
export class Character {
  private id?: string;
  private level: number;
  private name: string;
  private race: string;
  private subRace?: string;
  private ac: number;
  private flat_footed: number;
  private touch: number;
  private size: string;
  private attributes: Attribute[] = [];
  private health: number;
  private maxHealth: number;
  private magic: number;
  private maxMagic: number;
  private exp: number;
  private craftOne?: string;
  private craftTwo?: string;
  private performCust?: string;
  private profession?: string;
  private skills: Skill[] = [];
  private weaponSkills: Skill[] = [];
  private magicSkills: Skill[] = [];
  private weapons: Weapon[] = [];
  private spells: Spell[] = [];
  private notes: Note[] = [];
  private importantNotes: Note[] = [];
  private inventory: Item[] = [];
  private savingThrows: Save[] = [];

  getId(): string {
    return this.id ? this.id : '';
  }

  setId(id: string): void {
    this.id = id;
  }

  getLevel(): number {
    return this.level ? this.level : 1;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  getName(): string {
    return this.name ? this.name : '';
  }

  setName(name: string): void {
    this.name = name;
  }

  getRace(): string {
    return this.race ? this.race : '';
  }

  setRace(race: string): void {
    this.race = race;
  }

  getSubRace(): string {
    return this.subRace ? this.subRace : '';
  }

  setSubRace(subRace: string): void {
    this.subRace = subRace;
  }

  getAC(): number {
    return this.ac || this.ac === 0 ? this.ac : null;
  }

  setAC(ac: number): void {
    this.ac = ac;
  }

  getFlatFooted(): number {
    return this.flat_footed || this.flat_footed === 0 ? this.flat_footed : null;
  }

  setFlatFooted(flatFooted: number): void {
    this.flat_footed = flatFooted;
  }

  getTouch(): number {
    return this.touch || this.touch === 0 ? this.touch : null;
  }

  setTouch(touch: number): void {
    this.touch = touch;
  }

  getSize(): string {
    return this.size ? this.size : 'M';
  }

  setSize(size: string): void {
    this.size = size;
  }

  getHealth(): number {
    return this.health || this.health === 0 ? this.health : null;
  }

  setHealth(health: number): void {
    this.health = health;
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

  getMaxHealth(): number {
    return this.maxHealth || this.maxHealth === 0 ? this.maxHealth : null;
  }

  setMaxHealth(maxHealth: number): void {
    this.maxHealth = maxHealth;
  }

  getMagic(): number {
    return this.magic || this.magic === 0 ? this.magic : null;
  }

  setMagic(magic: number): void {
    this.magic = magic;
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

  getMaxMagic(): number {
    return this.maxMagic || this.maxMagic === 0 ? this.maxMagic : null;
  }

  setMaxMagic(maxMagic: number): void {
    this.maxMagic = maxMagic;
  }

  getExp(): number {
    return this.exp ? this.exp : 0;
  }

  setExp(exp: number): void {
    this.exp = exp;
  }

  getCraftOne(): string {
    return this.craftOne ? this.craftOne : '';
  }

  setCraftOne(craftOne: string): void {
    this.craftOne = craftOne;
  }

  getCraftTwo(): string {
    return this.craftTwo ? this.craftTwo : '';
  }

  setCraftTwo(craftTwo: string): void {
    this.craftTwo = craftTwo;
  }

  getPerformCust(): string {
    return this.performCust ? this.performCust : '';
  }

  setPerformCust(performCust: string): void {
    this.performCust = performCust;
  }

  getProfession(): string {
    return this.profession ? this.profession : '';
  }

  setProfession(profession: string): void {
    this.profession = profession;
  }

  getSkills(): Skill[] {
    return this.skills.length > 0 ? this.skills : [];
  }

  addSkill(skill: Skill): void {
    this.skills.push(skill);
  }

  getAttributes(): Attribute[] {
    return this.attributes.length > 0 ? this.attributes : [];
  }
  /*
  setAttributes(attributes: Attribute[]): void {
    this.attributes = attributes;
  } */

  addAttribute(attribute: Attribute): void {
    this.attributes.push(attribute);
  }

  /*
  setSkills(skills: Skill[]): void {
    this.skills = skills;
  } */

  getWeaponSkills(): Skill[] {
    return this.weaponSkills.length > 0 ? this.weaponSkills : [];
  }
  /*
  setWeaponSkills(weaponSkills: Skill[]): void {
    this.weaponSkills = weaponSkills;
  } */

  addWeaponSkill(weaponSkill: Skill): void {
    this.weaponSkills.push(weaponSkill);
  }

  getMagicSkills(): Skill[] {
    return this.magicSkills.length > 0 ? this.magicSkills : [];
  }
  /*
  setMagicSkills(magicSkills: Skill[]): void {
    this.magicSkills = magicSkills;
  } */

  addMagicSkill(magicSkill: Skill): void {
    this.magicSkills.push(magicSkill);
  }

  getWeapons(): Weapon[] {
    return this.weapons.length > 0 ? this.weapons : [];
  }
  /*
  setWeapons(weapons: Weapon[]): void {
    this.weapons = weapons;
  } */

  addWeapon(weapon: Weapon): void {
    this.weapons.push(weapon);
  }

  getSpells(): Spell[] {
    return this.spells.length > 0 ? this.spells : [];
  }
  /*
  setSpells(spells: Spell[]): void {
    this.spells = spells;
  } */

  addSpell(spell: Spell): void {
    this.spells.push(spell);
  }

  getNotes(): Note[] {
    return this.notes.length > 0 ? this.notes : [];
  }
  /*
  setNotes(notes: Note[]): void {
    this.notes = notes;
  } */

  addNote(note: Note): void {
    this.notes.push(note);
  }

  getImportantNotes(): Note[] {
    return this.importantNotes.length > 0 ? this.importantNotes : [];
  }
  /*
  setImportantNotes(importantNotes: Note[]): void {
    this.importantNotes = importantNotes;
  } */

  addImportantNote(importantNote: Note): void {
    this.importantNotes.push(importantNote);
  }

  getInventory(): Item[] {
    return this.inventory.length > 0 ? this.inventory : [];
  }
  /*
  setInventory(inventory: Item[]): void {
    this.inventory = inventory;
  } */

  addToInventory(item: Item): void {
    this.inventory.push(item);
  }

  getSavingThrows(): Save[] {
    return this.savingThrows.length > 0 ? this.savingThrows : [];
  }
  /*
  setSavingThrows(savingThrows: Save[]): void {
    this.savingThrows = savingThrows;
  } */

  addSavingThrow(savingThrow: Save): void {
    this.savingThrows.push(savingThrow);
  }

  constructor(jObj?: ICharacterJSON, qObj?: ICharacterQuery) {
    if (!jObj && !qObj) {
      for (const key in Attributes) {
        if (isNaN(Number(key))) {
          this.attributes.push(new Attribute(key, BASE));
        }
      }

      for (const key in Skills) {
        if (isNaN(Number(key))) {
          this.skills.push(new Skill(undefined, key, 0, false, '', 0, 0, 0));
        }
      }

      for (const key in Weapons) {
        if (isNaN(Number(key))) {
          this.weaponSkills.push(
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
          this.magicSkills.push(new Skill(undefined, key, 0, undefined, mod));
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
          this.addSavingThrow(new Save(undefined, key, modifier, 0));
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
          this.skills[skill].setModifier(Attributes[i]);
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
          new Attribute('Strength', qObj.strength),
          new Attribute('Dexterity', qObj.dexterity),
          new Attribute('Constitution', qObj.constitution),
          new Attribute('Intelligence', qObj.intelligence),
          new Attribute('Wisdom', qObj.wisdom),
          new Attribute('Charisma', qObj.charisma)
        ];
        for (const skill of qObj.skills) {
          if (skill.skill_type === 'skill') {
            this.addSkill(
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
            this.addWeaponSkill(
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
            this.addMagicSkill(
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
        for (const note of qObj.notes) {
          if (note.important) {
            this.addNote(
              new Note(note.id, note.message, note.time, note.important)
            );
          } else {
            this.addImportantNote(
              new Note(note.id, note.message, note.time, note.important)
            );
          }
        }
        for (const save of qObj.saves) {
          this.addSavingThrow(
            new Save(save.id, save.name, save.modifier, save.racial_bonus)
          );
        }
        for (const weapon of qObj.weapons) {
          this.weapons.push(
            new Weapon(
              weapon.id,
              weapon.name,
              weapon.damage,
              weapon.number_of_hits,
              parseRange(weapon.crit_range),
              weapon.crit_multiplier,
              weapon.type,
              weapon.modifier,
              weapon.range,
              weapon.ammo,
              undefined
            )
          );
        }
        for (const spell of qObj.spells) {
          this.addSpell(
            new Spell(
              spell.id,
              spell.name,
              spell.effect,
              spell.damage,
              spell.number_of_hit,
              spell.mp_use,
              spell.diety,
              spell.use_diety,
              spell.modifier
            )
          );
        }
      } else {
        for (const attr of jObj.attributes) {
          this.addAttribute(new Attribute(attr.name, attr.value));
        }
        for (const item of jObj.inventory) {
          this.addToInventory(new Item(item.id, item.name, item.description));
        }
        for (const skill of jObj.skills) {
          this.addSkill(
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
          this.addWeaponSkill(
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
          this.addMagicSkill(
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
          this.addNote(new Note(note.id, note.msg, note.time, note.important));
        }
        for (const note of jObj.importantNotes) {
          this.addImportantNote(
            new Note(note.id, note.msg, note.time, note.important)
          );
        }
        for (const spell of jObj.spells) {
          this.addSpell(
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
          this.addSavingThrow(
            new Save(save.id, save.name, save.modifier, save.racial)
          );
        }
        for (const weapon of jObj.weapons) {
          this.weapons.push(
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
        this.ac = jObj.ac;
        this.craftOne = jObj.craftOne;
        this.craftOne = jObj.craftTwo;
        this.exp = jObj.exp;
        this.flat_footed = jObj.flat_footed;
        this.health = jObj.health;
        this.id = jObj.id;
        this.level = jObj.level;
        this.magic = jObj.magic;
        this.maxHealth = jObj.maxHealth;
        this.maxMagic = jObj.maxMagic;
        this.name = jObj.name;
        this.performCust = jObj.performCust;
        this.profession = jObj.profession;
        this.race = jObj.race;
        this.size = jObj.size;
        this.subRace = jObj.subRace;
        this.touch = jObj.touch;
      }
    }
  }

  levelUp(): void {
    this.setMaxHealth(
      this.getMaxHealth() + 16 + this.getAttributes()[2].getModifier()
    );
    this.setHealth(this.getMaxHealth());
    this.setMaxMagic(
      this.getMaxMagic() + 3 + this.getAttributes()[4].getModifier()
    );
    this.setMagic(this.getMaxMagic());
    this.setLevel(this.getLevel() + 1);
  }

  gainExp(expGain: number): void {
    let counter = 0;
    this.setExp(this.getExp() + expGain);
    const lvl = 'level';
    for (const key in Level) {
      if (key.includes('level')) {
        counter++;
        if (
          Level[lvl + counter] <= this.getExp() &&
          this.getExp() <= Level[lvl + (counter + 1)]
        ) {
          this.setLevel(counter);
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
