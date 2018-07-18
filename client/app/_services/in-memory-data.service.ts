import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Character } from '../_models/character';
import { methods } from '../Character/character-methods';

import { Fairy, Gerudo, Goron, Hylian, Rito } from '../_models/Races';
import { Attributes } from '../_enums/attributes.enum';
import { Magics } from '../_enums/magic-skills.enum';
import { Skills } from '../_enums/skills.enum';
import { Weapons } from '../_enums/weapon-skills.enum';
import { Spell } from '../_models/spells';
import { Weapon } from '../_models/Weapons/weapon';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const EXP = 54150;
    const STR = 'Strength';
    const DEX = 'Dexterity';
    const CON = 'Constitution';
    const INT = 'Intelligence';
    const WIS = 'Wisdom';
    const CHA = 'Charisma';

    // cspell:disable
    const Bryte = new Fairy('Nayru');
    Bryte.name = 'Bryte';
    Bryte.ac = 20;
    Bryte.flat_footed = 17;
    Bryte.touch = 20;
    Bryte.craftOne = 'Fairy Made Armor';
    Bryte.craftTwo = 'Magic Potions';
    Bryte.profession = 'Armor Smith';
    Bryte.attributes[Attributes[STR]].value = 11;
    Bryte.attributes[Attributes[DEX]].value = 14;
    Bryte.attributes[Attributes[CON]].value = 12;
    Bryte.attributes[Attributes[INT]].value = 14;
    Bryte.attributes[Attributes[WIS]].value = 25;
    Bryte.attributes[Attributes[CHA]].value = 14;
    Bryte.health = Bryte.maxHealth = 166;
    Bryte.magic = Bryte.maxMagic = 77;
    Bryte.skills[Skills['CraftOne']].ranks = 3;
    Bryte.skills[Skills['CraftOne']].misc = 5;
    Bryte.skills[Skills['CraftTwo']].ranks = 2;
    Bryte.skills[Skills['Fly']].ranks = 1;
    Bryte.skills[Skills['Knowledge Geography']].ranks = 2;
    Bryte.skills[Skills['Perception']].ranks = 1;
    Bryte.skills[Skills['Perform Music']].ranks = 2;
    Bryte.skills[Skills['Profession']].ranks = 2;
    Bryte.skills[Skills['Sense Motive']].ranks = 3;
    Bryte.weaponSkills[Weapons['Fire Rod']].ranks = 6;
    Bryte.weaponSkills[Weapons['Ice Rod']].ranks = 6;
    Bryte.weaponSkills[Weapons['Lightning Rod']].ranks = 6;
    Bryte.weaponSkills[Weapons['Tornado Rod']].ranks = 9;
    Bryte.weaponSkills[Weapons['Sand Rod']].ranks = 6;
    Bryte.magicSkills[Magics['Din']].ranks = 2;
    Bryte.magicSkills[Magics['Nayru']].ranks = 13;
    Bryte.magicSkills[Magics['Farore']].ranks = 1;
    methods.calcMod(Bryte);
    methods.gainExp(Bryte, EXP);
    // Bryte's Spells
    const fairyCure = new Spell();
    fairyCure.name = 'Fairy Cure';
    fairyCure.effect = 'Heals target.';
    fairyCure.mpUse = 5;
    fairyCure.damage = 8;
    fairyCure.multiplier = 2;
    fairyCure.diety = 'Nayru';
    fairyCure.modifier = WIS;

    const curse = new Spell();
    curse.name = 'Fairy Curse';
    curse.damage = 8;
    curse.mpUse = 5;
    curse.multiplier = 1;
    curse.modifier = WIS;
    curse.diety = 'Nayru';
    curse.effect = 'Damages target.';

    const shield = new Spell();
    shield.diety = 'Nayru';
    shield.name = 'Shield of Faith';
    shield.effect = '+2 AC for 1d4 turns.';
    shield.damage = 4;
    shield.multiplier = 1;
    shield.mpUse = 6;

    const esuna = new Spell();
    esuna.name = 'Esuna';
    esuna.effect = 'Remove status effect.';
    esuna.damage = 4;
    esuna.mpUse = 5;
    esuna.multiplier = 1;
    esuna.diety = 'Nayru';

    const favor = new Spell();
    favor.name = 'Divine Favor';
    favor.effect =  '+1 to Attack and Damage rolls.';
    favor.diety = 'Nayru';
    favor.mpUse = 8;
    favor.damage = 4;
    favor.multiplier = 1;

    const endure = new Spell();
    endure.name = 'Endure Elemetns';
    endure.mpUse = 5;
    endure.diety = 'Farore';
    endure.effect = 'Grants Hot & Cold resistance.';
    endure.damage = 4;
    endure.multiplier = 1;

    const glitter = new Spell();
    glitter.name = 'Glitter Dust';
    glitter.effect = 'Blinds & shows enemies.';
    glitter.damage = 4;
    glitter.multiplier = 1;
    glitter.mpUse = 8;
    glitter.diety = 'Din';

    const eCure = new Spell();
    eCure.name = 'Fairy Cure Enhanced';
    eCure.effect = 'Heal 1/2 level people.';
    eCure.damage = 8;
    eCure.multiplier = 2;
    eCure.diety = 'Nayru';
    eCure.modifier = WIS;
    eCure.mpUse = 15;

    const shadow = new Spell();
    shadow.name = 'Shadow Sneak';
    shadow.damage = 6;
    shadow.multiplier = 2;
    shadow.diety = 'Nayru';
    shadow.mpUse = 10;
    shadow.effect = 'Attacks targets with 10 ft. range.';
    shadow.useDiety = true;

    // tslint:disable-next-line:max-line-length
    Bryte.spells = [fairyCure, curse, shield, esuna, favor, glitter, eCure, shadow, endure].sort((a: Spell, b: Spell) => a.diety > b.diety ? 1 : 0 );
    // End Bryte's spells

    // Bryte's Weapons
    const tornadoRod = new Weapon();
    tornadoRod.name = 'Tornado Rod';
    tornadoRod.attack = 8;
    tornadoRod.numberOfAttacks = 1;
    tornadoRod.range = 30;
    tornadoRod.type = 'Tornado Rod';
    tornadoRod.modifier = WIS;
    tornadoRod.critRange = [20];
    tornadoRod.critDamage = 3;
    tornadoRod.ammo = 0;

    const fireRod = new Weapon();
    fireRod.name = 'Fire Rod';
    fireRod.attack = 10;
    fireRod.numberOfAttacks = 1;
    fireRod.range = 30;
    fireRod.type = 'Fire Rod';
    fireRod.modifier = WIS;
    fireRod.critDamage = 3;
    fireRod.critRange = [20];
    fireRod.ammo = 0;
    fireRod.element = {
      attack: 8,
      numberOfAttacks: 1,
      type: 'Fire'
    };

    Bryte.weapons = [tornadoRod, fireRod];

    const Rya = new Gerudo();
    Rya.name = 'Rya';
    Rya.ac = 19;
    Rya.flat_footed = 10;
    Rya.touch = 17;
    Rya.health = Rya.maxHealth = 154;
    Rya.magic = Rya.maxMagic = 30;
    Rya.attributes[Attributes[STR]].value = 24;
    Rya.attributes[Attributes[DEX]].value = 24;
    Rya.attributes[Attributes[CON]].value = 10;
    Rya.attributes[Attributes[INT]].value = 16;
    Rya.attributes[Attributes[WIS]].value = 10;
    Rya.attributes[Attributes[CHA]].value = 8;
    Rya.skills[Skills['Acrobatics']].ranks = 2;
    Rya.skills[Skills['Perception']].ranks = 5;
    Rya.weaponSkills[Weapons['Short Sword']].ranks = 10;
    Rya.weaponSkills[Weapons['Long Sword']].ranks = 10;
    Rya.weaponSkills[Weapons['Dual Sword']].ranks = 13;
    Rya.weaponSkills[Weapons['Halberd']].ranks = 4;
    Rya.weaponSkills[Weapons['Sling']].ranks = 5;
    Rya.weaponSkills[Weapons['Unarmed']].ranks = 4;
    methods.calcMod(Rya);
    methods.gainExp(Rya, EXP);

    // Rya's Weapons
    const tiari = new Weapon();
    tiari.name = 'Tiari';
    tiari.critDamage = 2;
    tiari.critRange = [19, 20];
    tiari.attack = 8;
    tiari.numberOfAttacks = 1;
    tiari.type = 'Long Sword';
    tiari.modifier = STR;
    tiari.element = {
      attack: 4,
      numberOfAttacks: 1,
      type: 'Fire'
    };

    const sling = new Weapon();
    sling.name = 'Sling';
    sling.type = 'Sling';
    sling.attack = 4;
    sling.numberOfAttacks = 1;
    sling.range = 30;
    sling.ammo = 30;
    sling.critRange = [20];
    sling.critDamage = 2;
    sling.modifier = DEX;

    const blitz = new Weapon();
    blitz.name = 'Blitz';
    blitz.attack = 8;
    blitz.numberOfAttacks = 1;
    blitz.type = 'Short Sword';
    blitz.critDamage = 3;
    blitz.critRange = [18, 19, 20];
    blitz.modifier = STR;
    blitz.element = {
      attack: 8,
      numberOfAttacks: 1,
      type: 'Lightning'
    };

    Rya.weapons = [tiari, sling, blitz];

    const Greyson = new Goron('Rock Spine');
    Greyson.name = 'Greyson';
    Greyson.craftOne = 'Elemental Bomb';
    Greyson.health = Greyson.maxHealth = 140;
    Greyson.magic = Greyson.maxMagic = 19;
    Greyson.attributes[Attributes[STR]].value = 25;
    Greyson.attributes[Attributes[DEX]].value = 14;
    Greyson.attributes[Attributes[CON]].value = 24;
    Greyson.attributes[Attributes[INT]].value = 12;
    Greyson.attributes[Attributes[WIS]].value = 12;
    Greyson.attributes[Attributes[CHA]].value = 11;
    Greyson.magicSkills[Magics['Din']].ranks = 2;
    Greyson.magicSkills[Magics['Nayru']].ranks = 2;
    Greyson.magicSkills[Magics['Farore']].ranks = 2;
    Greyson.ac = 17;
    Greyson.flat_footed = 10;
    Greyson.touch = 17;
    Greyson.skills[Skills['Acrobatics']].ranks = 5;
    Greyson.skills[Skills['Climb']].ranks = 2;
    Greyson.skills[Skills['Handle Animal']].ranks = 3;
    Greyson.skills[Skills['CraftOne']].misc = 3;
    Greyson.skills[Skills['Stealth']].ranks = 2;
    Greyson.weaponSkills[Weapons['Tower Shield']].ranks = 5;
    Greyson.weaponSkills[Weapons['One-Handed Hammer']].ranks = 10;
    Greyson.weaponSkills[Weapons['Two-Handed Hammer']].ranks = 2;
    Greyson.weaponSkills[Weapons['Small Bomb']].ranks = 4;
    Greyson.weaponSkills[Weapons['Medium Bomb']].ranks = 4;
    Greyson.weaponSkills[Weapons['Large Bomb']].ranks = 3;
    Greyson.weaponSkills[Weapons['Bombs Other']].ranks = 3;
    Greyson.weaponSkills[Weapons['Unarmed']].ranks = 13;
    methods.calcMod(Greyson);
    methods.gainExp(Greyson, EXP);

    const Golo = new Hylian('Farmer');
    Golo.name = 'Golo';
    Golo.health = Golo.maxHealth = 76;
    Golo.magic = Golo.maxMagic = 19;
    Golo.attributes[0].value = 23;
    Golo.attributes[1].value = 12;
    Golo.attributes[2].value = 22;
    Golo.attributes[3].value = 6;
    Golo.attributes[4].value = 6;
    Golo.attributes[5].value = 18;
    Golo.ac = 14;
    Golo.flat_footed = 13;
    Golo.touch = 11;
    Golo.weaponSkills[0].ranks = 5;
    Golo.skills[5].ranks = 3;
    Golo.skills[9].ranks = 1;
    Golo.skills[22].ranks = 4;
    Golo.skills[29].ranks = 2;
    methods.calcMod(Golo);
    methods.gainExp(Golo, EXP);

    const characters: Character[] = [Bryte, Rya, Greyson, Golo];
    // cspell:enable
    return { characters };
  }
}
