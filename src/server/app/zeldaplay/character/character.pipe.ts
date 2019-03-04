import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Modifier, Race } from '@DbModel/enums/index';
import { DbCharacter, DbSave, DbSkill } from '@DbModel/index';
import { CharacterDTO } from '@Models/bodies/character/character.dto';

@Injectable()
export class CharacterPipe implements PipeTransform<CharacterDTO, DbCharacter> {
  transform(inValue: CharacterDTO, metadata: ArgumentMetadata): DbCharacter {
    const value = inValue;
    const retVal = new DbCharacter();
    retVal.chCharisma = value.attributes[5].value;
    retVal.chConstitution = value.attributes[2].value;
    retVal.chCraftOne = value.craftOne;
    retVal.chCraftTwo = value.craftTwo;
    retVal.chDexterity = value.attributes[1].value;
    retVal.chExperience = value.exp;
    retVal.chHealth = value.health;
    retVal.chId = value.id;
    retVal.chIntelligence = value.attributes[3].value;
    retVal.chLevel = value.level;
    retVal.chMagic = value.magic;
    retVal.chHealthMax = value.maxHealth;
    retVal.chMagicMax = value.maxMagic;
    retVal.chName = value.name;
    retVal.chPerformance = value.performCust;
    retVal.chProfession = value.profession;
    retVal.chRace = value.race as Race;
    retVal.chStrength = value.attributes[0].value;
    retVal.chSubrace = value.subRace;
    retVal.chWisdom = value.attributes[4].value;
    retVal.skills = [];
    value.magicSkills.forEach((skill) => {
      const mSkill = new DbSkill();
      mSkill.skTrained = skill.trained ? skill.trained : false;
      mSkill.skName = skill.skillName;
      mSkill.skItemModifier = skill.item;
      mSkill.skMiscModifier = skill.misc;
      mSkill.skModifier = skill.modifier as Modifier;
      mSkill.skRacialModifier = skill.racial;
      mSkill.skRanks = skill.ranks;
      mSkill.skId = skill.id;
      mSkill.skType = 'magic';
      retVal.skills.push(mSkill);
    });
    value.skills.forEach((skill) => {
      const rSkill = new DbSkill();
      rSkill.skTrained = skill.trained;
      rSkill.skName = skill.skillName;
      rSkill.skItemModifier = skill.item;
      rSkill.skMiscModifier = skill.misc;
      rSkill.skModifier = skill.modifier as Modifier;
      rSkill.skRacialModifier = skill.racial;
      rSkill.skRanks = skill.ranks;
      rSkill.skId = skill.id;
      rSkill.skType = 'skill';
      retVal.skills.push(rSkill);
    });
    value.weaponSkills.forEach((skill) => {
      const wSkill = new DbSkill();
      wSkill.skTrained = skill.trained;
      wSkill.skName = skill.skillName;
      wSkill.skItemModifier = skill.item;
      wSkill.skMiscModifier = skill.misc;
      wSkill.skModifier = skill.modifier as Modifier;
      wSkill.skRacialModifier = skill.racial;
      wSkill.skRanks = skill.ranks;
      wSkill.skId = skill.id;
      wSkill.skType = 'weapon';
      retVal.skills.push(wSkill);
    });
    retVal.saves = [];
    value.savingThrows.forEach((inSave) => {
      const save = new DbSave();
      save.saModifier = inSave.modifier as Modifier;
      save.saName = inSave.name;
      save.saRacialBonus = inSave.racial;
      save.saId = inSave.id;
      retVal.saves.push(save);
    });
    return retVal;
  }
}
