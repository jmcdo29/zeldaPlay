import { Character } from '../Character/character';

export class Fairy extends Character {

  constructor(subRace?: string) {
    super();

    this.race = 'Fairy';
    this.subRace = subRace;

    this.attributes[0].value -= 2;
    this.attributes[3].value += 2;
    this.attributes[4].value += 2;

    this.skills[4].trained = true;          // Craft 1
    this.skills[5].trained = true;          // Craft 2
    this.skills[8].trained = true;          // Fly
    this.skills[10].trained = true;         // Heal
    this.skills[12].trained = true;         // Knowledge (Geography)
    this.skills[13].trained = true;         // Knowledge (History)
    this.skills[14].trained = true;         // Knowledge (Language)
    this.skills[15].trained = true;         // Knowledge (Local)
    this.skills[16].trained = true;         // Knowledge (Magic)
    this.skills[17].trained = true;         // Knowledge (Monster)
    this.skills[18].trained = true;         // Knowledge (Nature)
    this.skills[19].trained = true;         // Knowledge (Nobility)
    this.skills[20].trained = true;         // Knowledge (Religion)
    this.skills[21].trained = true;         // perception

    this.weaponSkills[19].trained = true;   // Fire Rods
    this.weaponSkills[20].trained = true;   // Ice Rods
    this.weaponSkills[21].trained = true;   // Lightning Rods
    this.weaponSkills[22].trained = true;   // Tornado Rods
    this.weaponSkills[23].trained = true;   // Sand Rods

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
    this.attributes[0].value += 2;  // Strength Buff
    this.attributes[2].value += 1;  // Constitution Buff
    this.skills[11].trained = true; // Intimidate
  }
}

export class Goron extends Character {

  constructor(subRace?: string) {
    super();
    this.skills[1].trained = true;        // Appraise
    this.skills[3].trained = true;        // Climb
    this.skills[11].trained = true;       // Intimidate
    this.weaponSkills[7].trained = true;  // Hammers
    this.weaponSkills[8].trained = true;  // Hammers
    this.race = 'Goron';
    this.subRace = subRace;

    switch (subRace) {
      case 'Rock Spine': {
        this.attributes[0].value += 2;    // Strength Buff
        break;
      }
      case 'Soft Belly': {
        this.attributes[4].value += 1;    // Wisdom Buff
        break;
      }
    }
  }
}

export class Hylian extends Character {

  constructor(subRace?: string) {
    super();
    // All Hylian Skills
    this.skills[6].racial = 4;
    this.skills[4].trained = true;          // Craft 1
    this.skills[3].trained = true;          // Climb
    this.skills[14].trained = true;         // Knowledge (History)
    this.skills[15].trained = true;         // Knowledge (Local)
    this.skills[21].trained = true;         // Perception

    this.weaponSkills[0].trained = true;    // Short Sword
    this.weaponSkills[1].trained = true;    // Long Sword
    this.weaponSkills[4].trained = true;    // Light Shield
    this.weaponSkills[5].trained = true;    // Heavy Shield

    this.race = 'Hylian';
    this.subRace = subRace;

    if (subRace) {
      switch (subRace) {
        case 'Farmer': {
          // Farmhand Hylian Skills
          this.attributes[0].value += 2;    // Strength Buff
          this.skills[0].trained = true;    // Acrobatics
          this.skills[9].trained = true;    // Handle Animal
          this.skills[12].trained = true;   // Knowledge (Geography)
          this.skills[18].trained = true;   // Knowledge (Nature)
          this.skills[25].trained = true;   // Ride
          this.skills[29].trained = true;   // Survival
          this.skills[30].trained = true;   // Swim
          break;
        }
        case 'Sheikah': {
          // Sheikah Hylian Skills
          this.attributes[1].value += 2;    // Dexterity Buff
          this.skills[0].trained = true;    // Acronatics
          this.skills[1].trained = true;    // Appraise
          this.skills[2].trained = true;    // Bluff
          this.skills[7].trained = true;    // Escpe Artist
          this.skills[11].trained = true;   // Intimidate
          this.skills[14].trained = true;   // Knowledge (Language)
          this.skills[19].trained = true;   // Knowledge (Nobility)
          this.skills[20].trained = true;   // Knowledge (Religion)
          this.skills[26].trained = true;   // Sense Motive
          this.skills[28].trained = true;   // Stealth
          break;
        }
        case 'Guard': {
          // Guard Hylian Skills
          this.attributes[2].value += 2;    // Consitution Buff
          this.skills[2].trained = true;    // Bluff
          this.skills[4].trained = true;    // Diplomacy
          this.skills[10].trained = true;   // Heal
          this.skills[11].trained = true;   // Intimidate
          this.skills[19].trained = true;   // Knowledge (Nobility)
          this.skills[20].trained = true;   // Knowledge (Religion)
          this.skills[24].trained = true;   // Profession
          this.skills[25].trained = true;   // Ride
          this.skills[26].trained = true;   // Sense Motive
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
    this.skills[0].trained = true;          // Acrobatics
    this.skills[4].trained = true;          // Craft One
    this.skills[5].trained = true;          // Craft Two
    this.skills[15].trained = true;         // Knowledge (Local)
    this.skills[18].trained = true;         // Knowledge (Nature)
    this.skills[21].trained = true;         // Perception

    switch (subRace) {
      case 'Sharp Eye': {
        this.attributes[3].value += 1;      // Intelligence Buff
        this.skills[21].racial = 5;         // Perception Bonus
        break;
      }
      case 'Sharp Tongue': {
        this.attributes[5].value += 1;      // Charisma Buff
        this.skills[2].trained = true;      // Bluff
        this.skills[2].misc = 2;
        break;
      }
    }
  }
}

export class Sheikah extends Character {

  constructor() {
    super();

    this.attributes[1].value += 2;        // Dex Buff
    this.attributes[2].value += 2;        // Con Buff
    this.attributes[5].value -= 2;        // Cha Neg

    this.skills[28].racial = 4;           // Stealth buff

    this.weaponSkills[11].trained = true; // Naginatas

    this.skills[0].trained = true;        // Acrobatics
    this.skills[4].trained = true;        // Craft 1
    this.skills[5].trained = true;        // Craft 2
    this.skills[7].trained = true;        // Escape Artist
    this.skills[13].trained = true;       // Knowledge (History)
    this.skills[14].trained = true;       // Knowledge (Language)
    this.skills[15].trained = true;       // Knowledge (Local)
    this.skills[19].trained = true;       // Knowledge (Nobility)
    this.skills[20].trained = true;       // Knowledge (Religion)
    this.skills[21].trained = true;       // Perception
    this.skills[26].trained = true;       // Sense Motive
    this.skills[27].trained = true;       // Sleight of Hand
    this.skills[28].trained = true;       // Stealth
  }
}

export class Twili extends Character {

  constructor() {
    super();

    this.race = 'Twili';

    this.attributes[2].value += 2;        // Con Buff
    this.attributes[3].value += 2;        // Int Buff
    this.attributes[4].value -= 2;        // Wis Neg

    this.skills[22].trained = false;      // Can't perform Music

    this.weaponSkills[2].trained = true;  // Dual Swords

    this.skills[2].trained = true;        // Bluff
    this.skills[11].trained = true;       // Intimidate
    this.skills[13].trained = true;       // Knowledge (History)
    this.skills[28].trained = true;       // Stealth

  }
}

export class Zora extends Character {

  constructor(subRace?: string) {
    super();

    this.race = 'Zora';
    this.subRace = subRace;

    this.skills[30].racial = 4;

    this.attributes[1].value += 2;        // Dexterity

    this.skills[0].trained = true;        // Acrobatics
    this.skills[4].trained = true;        // Craft 1
    this.skills[5].trained = true;        // Craft 2
    this.skills[21].trained = true;       // Percetption
    this.skills[30].trained = true;       // Swim

    this.weaponSkills[9].trained = true;  // Spears

    switch (subRace) {
      case 'River': {

        this.attributes[2].value -= 2;    // Con Neg
        this.attributes[3].value += 2;    // Int Buff

        this.skills[6].trained = true;    // Diplomacy
        this.skills[10].trained = true;   // Heal;
        this.skills[13].trained = true;   // Knowledge (History)
        this.skills[18].trained = true;   // Knowledge(Nature)
        this.skills[23].trained = true;   // Perform (Other)

        break;
      }
      case 'Ocean': {

        this.attributes[0].value += 2;
        this.attributes[4].value -= 2;

        this.skills[6].trained = true;    // Diplomacy
        this.skills[7].trained = true;    // Escape Artist
        this.skills[11].trained = true;   // Intimidate
        this.skills[18].trained = true;   // Knowledge (Nature)

        break;
      }
      case 'Swamp': {

        this.attributes[0].value -= 2;
        this.attributes[2].value += 2;

        this.skills[2].trained = true;    // Bluff
        this.skills[7].trained = true;    // Escape Artist
        this.skills[11].trained = true;   // Intimidate
        this.skills[26].trained = true;   // Sense Motive
        this.skills[28].trained = true;   // Stealth

        break;
      }
    }
  }
}
