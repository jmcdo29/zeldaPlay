import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Character } from './Character/character';

import { Fairy } from './Races/Fairy';
import { Gerudo } from './Races/Gerudo';
import { Goron } from './Races/Goron';
import { Hylian } from './Races/Hylian';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const EXP = 15905;

    const Bryte = new Fairy('Nayru');
    Bryte.name = 'Bryte';
    Bryte.ac = 17;
    Bryte.level = 4;
    Bryte.flat_footed = 10;
    Bryte.touch = 17;
    Bryte.craftOne = 'Fairy Made Armor';
    Bryte.craftTwo = 'Magic Potions';
    Bryte.profession = 'Armor Smith';
    Bryte.attributes[0].value = 10;
    Bryte.attributes[1].value = 14;
    Bryte.attributes[2].value = 12;
    Bryte.attributes[3].value = 13;
    Bryte.attributes[4].value = 24;
    Bryte.attributes[5].value = 16;
    Bryte.health = Bryte.maxHealth = 116;
    Bryte.magic = Bryte.maxMagic = 57;
    Bryte.exp = EXP;
    Bryte.skills[4].ranks = 3;
    Bryte.skills[4].misc = 5;
    Bryte.skills[5].ranks = 2;
    Bryte.skills[8].ranks = 1;
    Bryte.skills[10].ranks = 2;
    Bryte.skills[21].ranks = 1;
    Bryte.skills[22].ranks = 2;
    Bryte.skills[24].ranks = 2;
    Bryte.skills[26].ranks = 3;
    Bryte.weaponSkills[19].ranks = 3;
    Bryte.weaponSkills[20].ranks = 3;
    Bryte.weaponSkills[21].ranks = 3;
    Bryte.weaponSkills[22].ranks = 9;
    Bryte.weaponSkills[23].ranks = 3;
    Bryte.magicSkills[1].ranks = 8;
    Bryte.magicSkills[2].ranks = 1;
    Bryte.calcMods();

    const Rya = new Gerudo();
    Rya.level = 4;
    Rya.name = 'Rya';
    Rya.exp = EXP;
    Rya.ac = 19;
    Rya.flat_footed = 10;
    Rya.touch = 17;
    Rya.health = Rya.maxHealth = 108;
    Rya.magic = Rya.maxMagic = 25;
    Rya.attributes[0].value = 24;
    Rya.attributes[1].value = 24;
    Rya.attributes[2].value = 8;
    Rya.attributes[3].value = 16;
    Rya.attributes[4].value = 10;
    Rya.attributes[5].value = 8;
    Rya.skills[0].ranks = 2;
    Rya.skills[21].ranks = 5;
    Rya.weaponSkills[1].ranks = 4;
    Rya.weaponSkills[10].ranks = 4;
    Rya.weaponSkills[13].ranks = 5;
    Rya.weaponSkills[26].ranks = 4;
    Rya.calcMods();

    const Greyson = new Goron('Rock Spine');
    Greyson.name = 'Greyson';
    Greyson.level = 4;
    Greyson.exp = EXP;
    Greyson.craftOne = 'Elemental Bomb';
    Greyson.health = Greyson.maxHealth = 140;
    Greyson.magic = Greyson.maxMagic = 19;
    Greyson.attributes[0].value = 25;
    Greyson.attributes[1].value = 14;
    Greyson.attributes[2].value = 24;
    Greyson.attributes[3].value = 12;
    Greyson.attributes[4].value = 12;
    Greyson.attributes[5].value = 11;
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
    Greyson.calcMods();

    const Golo = new Hylian('Farmer');
    Golo.name = 'Golo';
    Golo.level = 4;
    Golo.exp = EXP;
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
    Golo.calcMods();

    const characters = [Bryte, Rya, Greyson, Golo];
    return {characters};
  }
}
