import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Character } from './Character/character';
import { methods } from './Character/character-methods';

import { Fairy, Gerudo, Goron, Hylian, Rito } from './Races/Races';
import { Attributes } from './Character/Enums/attributes.enum';
import { Magics } from './Character/Enums/magic-skills.enum';
import { Skills } from './Character/Enums/skills.enum';
import { Weapons } from './Character/Enums/weapon-skills.enum';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const EXP = 25740;

    const Bryte = new Fairy('Nayru');
    Bryte.name = 'Bryte';
    Bryte.ac = 17;
    Bryte.flat_footed = 10;
    Bryte.touch = 17;
    Bryte.craftOne = 'Fairy Made Armor';
    Bryte.craftTwo = 'Magic Potions';
    Bryte.profession = 'Armor Smith';
    Bryte.attributes[Attributes['Strength']].value = 10;
    Bryte.attributes[Attributes['Dexterity']].value = 14;
    Bryte.attributes[Attributes['Constitution']].value = 12;
    Bryte.attributes[Attributes['Intelligence']].value = 14;
    Bryte.attributes[Attributes['Wisdom']].value = 24;
    Bryte.attributes[Attributes['Charisma']].value = 16;
    Bryte.health = Bryte.maxHealth = 149;
    Bryte.magic = Bryte.maxMagic = 67;
    Bryte.skills[Skills['CraftOne']].ranks = 3;
    Bryte.skills[Skills['CraftOne']].misc = 5;
    Bryte.skills[Skills['CraftTwo']].ranks = 2;
    Bryte.skills[Skills['Fly']].ranks = 1;
    Bryte.skills[Skills['Knowledge Geography']].ranks = 2;
    Bryte.skills[Skills['Perception']].ranks = 1;
    Bryte.skills[Skills['Perform Music']].ranks = 2;
    Bryte.skills[Skills['Profession']].ranks = 2;
    Bryte.skills[Skills['Sense Motive']].ranks = 3;
    Bryte.weaponSkills[Weapons['Fire Rod']].ranks = 3;
    Bryte.weaponSkills[Weapons['Ice Rod']].ranks = 3;
    Bryte.weaponSkills[Weapons['Lightning Rod']].ranks = 3;
    Bryte.weaponSkills[Weapons['Tornado Rod']].ranks = 9;
    Bryte.weaponSkills[Weapons['Sand Rod']].ranks = 2;
    Bryte.magicSkills[Magics['Din']].ranks = 2;
    Bryte.magicSkills[Magics['Nayru']].ranks = 8;
    Bryte.magicSkills[Magics['Farore']].ranks = 1;
    methods.calcMod(Bryte);
    methods.gainExp(Bryte, EXP);

    const Rya = new Gerudo();
    Rya.name = 'Rya';
    Rya.ac = 19;
    Rya.flat_footed = 10;
    Rya.touch = 17;
    Rya.health = Rya.maxHealth = 130;
    Rya.magic = Rya.maxMagic = 27;
    Rya.attributes[Attributes['Strength']].value = 24;
    Rya.attributes[Attributes['Dexterity']].value = 24;
    Rya.attributes[Attributes['Constitution']].value = 9;
    Rya.attributes[Attributes['Intelligence']].value = 16;
    Rya.attributes[Attributes['Wisdom']].value = 10;
    Rya.attributes[Attributes['Charisma']].value = 8;
    Rya.skills[Skills['Acrobatics']].ranks = 2;
    Rya.skills[Skills['Perception']].ranks = 5;
    Rya.weaponSkills[Weapons['Long Sword']].ranks = 4;
    Rya.weaponSkills[Weapons['Halberd']].ranks = 4;
    Rya.weaponSkills[Weapons['Sling']].ranks = 5;
    Rya.weaponSkills[Weapons['Unarmed']].ranks = 4;
    methods.calcMod(Rya);
    methods.gainExp(Rya, EXP);

    const Greyson = new Goron('Rock Spine');
    Greyson.name = 'Greyson';
    Greyson.craftOne = 'Elemental Bomb';
    Greyson.health = Greyson.maxHealth = 140;
    Greyson.magic = Greyson.maxMagic = 19;
    Greyson.attributes[Attributes['Strength']].value = 25;
    Greyson.attributes[Attributes['Dexterity']].value = 14;
    Greyson.attributes[Attributes['Constitution']].value = 24;
    Greyson.attributes[Attributes['Intelligence']].value = 12;
    Greyson.attributes[Attributes['Wisdom']].value = 12;
    Greyson.attributes[Attributes['Charisma']].value = 11;
    Greyson.magicSkills[0].ranks = 2;
    Greyson.magicSkills[1].ranks = 2;
    Greyson.magicSkills[2].ranks = 2;
    Greyson.ac = 17;
    Greyson.flat_footed = 10;
    Greyson.touch = 17;
    Greyson.skills[0].ranks = 5;
    Greyson.skills[3].ranks = 2;
    Greyson.skills[9].ranks = 3;
    Greyson.skills[4].misc = 3;
    Greyson.skills[28].ranks = 2;
    Greyson.weaponSkills[6].ranks = 5;
    Greyson.weaponSkills[7].ranks = 10;
    Greyson.weaponSkills[8].ranks = 2;
    Greyson.weaponSkills[15].ranks = 4;
    Greyson.weaponSkills[16].ranks = 4;
    Greyson.weaponSkills[17].ranks = 3;
    Greyson.weaponSkills[18].ranks = 3;
    Greyson.weaponSkills[26].ranks = 13;
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
    return {characters};
  }
}
