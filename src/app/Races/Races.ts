import { Character } from '../Character/character';
import { Skills } from '../Character/Enums/skills.enum';
import { Magics } from '../Character/Enums/magic-skills.enum';
import { Weapons } from '../Character/Enums/weapon-skills.enum';
import { Attributes } from '../Character/Enums/attributes.enum';

export class Fairy extends Character {

  constructor(subRace?: string) {
    super();

    this.race = 'Fairy';
    this.subRace = subRace;

    this.attributes[Attributes['Strength']].value -= 2;
    this.attributes[Attributes['Intelligence']].value += 2;
    this.attributes[Attributes['Wisdom']].value += 2;

    this.skills[Skills['CraftOne']].trained = true;                   // Craft 1
    this.skills[Skills['CraftTwo']].trained = true;                   // Craft 2
    this.skills[Skills['Fly']].trained = true;                        // Fly
    this.skills[Skills['Heal']].trained = true;                       // Heal
    this.skills[Skills['Knowledge Geography']].trained = true;        // Knowledge (Geography)
    this.skills[Skills['Knowledge History']].trained = true;          // Knowledge (History)
    this.skills[Skills['Knowledge Language']].trained = true;         // Knowledge (Language)
    this.skills[Skills['Knowledge Local']].trained = true;            // Knowledge (Local)
    this.skills[Skills['Knowledge Magic']].trained = true;            // Knowledge (Magic)
    this.skills[Skills['Knowledge Monsters']].trained = true;         // Knowledge (Monster)
    this.skills[Skills['Knowledge Nature']].trained = true;           // Knowledge (Nature)
    this.skills[Skills['Knowledge Nobility']].trained = true;         // Knowledge (Nobility)
    this.skills[Skills['Knowledge Religion']].trained = true;         // Knowledge (Religion)
    this.skills[Skills['Perception']].trained = true;                 // Perception

    this.weaponSkills[Weapons['Fire Rod']].trained = true;            // Fire Rods
    this.weaponSkills[Weapons['Ice Rod']].trained = true;             // Ice Rods
    this.weaponSkills[Weapons['Lightning Rod']].trained = true;       // Lightning Rods
    this.weaponSkills[Weapons['Tornado Rod']].trained = true;         // Tornado Rods
    this.weaponSkills[Weapons['Sand Rod']].trained = true;            // Sand Rods

    switch (subRace) {
      case 'Din': {
        break;
      }
      case 'Farore': {
        break;
      }
      case 'Nayru': {
        break;
      }
    }
  }
}

export class Gerudo extends Character {

  constructor() {
    super();

    this.race = 'Gerudo';
    this.attributes[Attributes['Strength']].value += 2;       // Strength Buff
    this.attributes[Attributes['Constitution']].value += 1;   // Constitution Buff
    this.skills[Skills['Intimidate']].trained = true;         // Intimidate
  }
}

export class Goron extends Character {

  constructor(subRace?: string) {
    super();
    this.skills[Skills['Appraise']].trained = true;                   // Appraise
    this.skills[Skills['Climb']].trained = true;                      // Climb
    this.skills[Skills['Intimidate']].trained = true;                 // Intimidate
    this.weaponSkills[Weapons['One-Handed Hammer']].trained = true;  // Hammers
    this.weaponSkills[Weapons['Two-Handed Hammer']].trained = true;  // Hammers
    this.race = 'Goron';
    this.subRace = subRace;

    switch (subRace) {
      case 'Rock Spine': {
        this.attributes[Attributes['Strength']].value += 2;           // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.attributes[Attributes['Wisdom']].value += 1;             // Wisdom Buff
        break;
      }
    }
  }
}

export class Hylian extends Character {

  constructor(subRace?: string) {
    super();
    // All Hylian Skills
    this.skills[Skills['Diplomacy']].racial = 4;
    this.skills[Skills['CraftOne']].trained = true;               // Craft 1
    this.skills[Skills['Climb']].trained = true;                  // Climb
    this.skills[Skills['Knowledge History']].trained = true;      // Knowledge (History)
    this.skills[Skills['Knowledge Local']].trained = true;        // Knowledge (Local)
    this.skills[Skills['Perception']].trained = true;             // Perception

    this.weaponSkills[Weapons['Short Sword']].trained = true;     // Short Sword
    this.weaponSkills[Weapons['Long Sword']].trained = true;      // Long Sword
    this.weaponSkills[Weapons['Light Shield']].trained = true;    // Light Shield
    this.weaponSkills[Weapons['Heavy Shield']].trained = true;    // Heavy Shield

    this.race = 'Hylian';
    this.subRace = subRace;

    if (subRace) {
      switch (subRace) {
        case 'Farmer': {
          // Farmhand Hylian Skills
          this.attributes[Attributes['Strength']].value += 2;           // Strength Buff
          this.skills[Skills['Acrobatics']].trained = true;             // Acrobatics
          this.skills[Skills['Handle Animal']].trained = true;          // Handle Animal
          this.skills[Skills['Knowledge Geography']].trained = true;    // Knowledge (Geography)
          this.skills[Skills['Knowledge Nature']].trained = true;       // Knowledge (Nature)
          this.skills[Skills['Ride']].trained = true;                   // Ride
          this.skills[Skills['Survival']].trained = true;               // Survival
          this.skills[Skills['Swim']].trained = true;                   // Swim
          break;
        }
        case 'Sheikah': {
          // Sheikah Hylian Skills
          this.attributes[Attributes['Dexterity']].value += 2;        // Dexterity Buff
          this.skills[Skills['Acrobatics']].trained = true;           // Acronatics
          this.skills[Skills['Appraise']].trained = true;             // Appraise
          this.skills[Skills['Bluff']].trained = true;                // Bluff
          this.skills[Skills['Escape Artist']].trained = true;        // Escpe Artist
          this.skills[Skills['Intimidate']].trained = true;           // Intimidate
          this.skills[Skills['Knowledge Language']].trained = true;   // Knowledge (Language)
          this.skills[Skills['Knowledge Nobility']].trained = true;   // Knowledge (Nobility)
          this.skills[Skills['Knowledge Religion']].trained = true;   // Knowledge (Religion)
          this.skills[Skills['Sense Motive']].trained = true;         // Sense Motive
          this.skills[Skills['Stealth']].trained = true;              // Stealth
          break;
        }
        case 'Guard': {
          // Guard Hylian Skills
          this.attributes[Attributes['Constitution']].value += 2;     // Consitution Buff
          this.skills[Skills['Bluff']].trained = true;                // Bluff
          this.skills[Skills['Diplomacy']].trained = true;            // Diplomacy
          this.skills[Skills['Heal']].trained = true;                 // Heal
          this.skills[Skills['Intimidate']].trained = true;           // Intimidate
          this.skills[Skills['Knowldege Nobility']].trained = true;   // Knowledge (Nobility)
          this.skills[Skills['Knowldege Reiligion']].trained = true;  // Knowledge (Religion)
          this.skills[Skills['Profession']].trained = true;           // Profession
          this.skills[Skills['Ride']].trained = true;                 // Ride
          this.skills[Skills['Sense Motive']].trained = true;         // Sense Motive
          break;
        }
      }
    }
  }
}

export class Rito extends Character {

  constructor(subRace?: string) {
    super();

    this.race = 'Rito';
    this.subRace = subRace;

    // All Rito Skills
    this.skills[Skills['Acrobatics']].trained = true;         // Acrobatics
    this.skills[Skills['CraftOne']].trained = true;           // Craft One
    this.skills[Skills['CraftTwo']].trained = true;           // Craft Two
    this.skills[Skills['Knowledge Local']].trained = true;    // Knowledge (Local)
    this.skills[Skills['Knowledge Nature']].trained = true;   // Knowledge (Nature)
    this.skills[Skills['Perception']].trained = true;         // Perception

    switch (subRace) {
      case 'Sharp Eye': {
        this.attributes[Attributes['Intelligence']].value += 1;       // Intelligence Buff
        this.skills[Skills['Perception']].racial = 5;                 // Perception Bonus
        break;
      }
      case 'Sharp Tongue': {
        this.attributes[Attributes['Charisma']].value += 1;     // Charisma Buff
        this.skills[Skills['Bluff']].trained = true;            // Bluff
        this.skills[Skills['bluff']].misc = 2;                  // Bluff Buff
        break;
      }
    }
  }
}

export class Sheikah extends Character {

  constructor() {
    super();

    this.attributes[Attributes['Dexterity']].value += 2;            // Dex Buff
    this.attributes[Attributes['Constitution']].value += 2;         // Con Buff
    this.attributes[Attributes['Charisma']].value -= 2;             // Cha Neg

    this.skills[Skills['Stealth']].racial = 4;                      // Stealth buff

    this.weaponSkills[Weapons['Naginata']].trained = true;          // Naginatas

    this.skills[Skills['Acrobatics']].trained = true;               // Acrobatics
    this.skills[Skills['CraftOne']].trained = true;                 // Craft 1
    this.skills[Skills['CraftTwo']].trained = true;                 // Craft 2
    this.skills[Skills['Escape Artist']].trained = true;            // Escape Artist
    this.skills[Skills['Knowledge History']].trained = true;        // Knowledge (History)
    this.skills[Skills['Knowledge Language']].trained = true;       // Knowledge (Language)
    this.skills[Skills['Knowledge Local']].trained = true;          // Knowledge (Local)
    this.skills[Skills['Knowledge Nobility']].trained = true;       // Knowledge (Nobility)
    this.skills[Skills['Knowledge Religion']].trained = true;       // Knowledge (Religion)
    this.skills[Skills['Perception']].trained = true;               // Perception
    this.skills[Skills['Sense Motive']].trained = true;             // Sense Motive
    this.skills[Skills['Sleight of Hand']].trained = true;          // Sleight of Hand
    this.skills[Skills['Stealth']].trained = true;                  // Stealth
  }
}

export class Twili extends Character {

  constructor() {
    super();

    this.race = 'Twili';

    this.attributes[Attributes['Intelligence']].value += 2;     // Int Buff
    this.attributes[Attributes['Constitution']].value += 2;     // Con Buff
    this.attributes[Attributes['Wisdom']].value -= 2;           // Wis Neg

    this.skills[Skills['Perform Music']].trained = false;       // Can't perform Music

    this.weaponSkills[Weapons['Dual Sword']].trained = true;    // Dual Swords

    this.skills[Skills['Bluff']].trained = true;                // Bluff
    this.skills[Skills['Intimidate']].trained = true;           // Intimidate
    this.skills[Skills['Knowledge History']].trained = true;    // Knowledge (History)
    this.skills[Skills['Stealth']].trained = true;              // Stealth

  }
}

export class Zora extends Character {

  constructor(subRace?: string) {
    super();

    this.race = 'Zora';
    this.subRace = subRace;

    this.skills[Skills['Swim']].racial = 4;

    this.attributes[Attributes['Dexterity']].value += 2;            // Dexterity

    this.skills[Attributes['Acrobatics']].trained = true;           // Acrobatics
    this.skills[Attributes['CraftOne']].trained = true;             // Craft 1
    this.skills[Attributes['CraftTwo']].trained = true;             // Craft 2
    this.skills[Attributes['Perception']].trained = true;           // Percetption
    this.skills[Attributes['Swim']].trained = true;                 // Swim

    this.weaponSkills[Weapons['Spear']].trained = true;             // Spears

    switch (subRace) {
      case 'River': {

        this.attributes[Attributes['Constitution']].value -= 2;     // Con Neg
        this.attributes[Attributes['Intelligence']].value += 2;     // Int Buff

        this.skills[Skills['Diplomacy']].trained = true;            // Diplomacy
        this.skills[Skills['Heal']].trained = true;                 // Heal;
        this.skills[Skills['Knowledge History']].trained = true;    // Knowledge (History)
        this.skills[Skills['Knowledge Nature']].trained = true;     // Knowledge(Nature)
        this.skills[Skills['Perform Other']].trained = true;        // Perform (Other)

        break;
      }
      case 'Ocean': {

        this.attributes[Attributes['Strength']].value += 2;
        this.attributes[Attributes['Wisdom']].value -= 2;

        this.skills[Skills['Diplomacy']].trained = true;          // Diplomacy
        this.skills[Skills['Escape Artist']].trained = true;      // Escape Artist
        this.skills[Skills['Intimidate']].trained = true;         // Intimidate
        this.skills[Skills['Knowledge Nature']].trained = true;   // Knowledge (Nature)

        break;
      }
      case 'Swamp': {

        this.attributes[Attributes['Strength']].value -= 2;
        this.attributes[Attributes['Constitution']].value += 2;

        this.skills[Skills['Bluff']].trained = true;              // Bluff
        this.skills[Skills['Escape Artist']].trained = true;      // Escape Artist
        this.skills[Skills['Intimidate']].trained = true;         // Intimidate
        this.skills[Skills['Sense Motive']].trained = true;       // Sense Motive
        this.skills[Skills['Stealth']].trained = true;            // Stealth

        break;
      }
    }
  }
}
