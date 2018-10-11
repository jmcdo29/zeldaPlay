import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { Character } from '../entities/character.entity';
import { Note } from '../entities/note.entity';
import { Save } from '../entities/save.entity';
import { Skill } from '../entities/skill.entity';
import { Spell } from '../entities/spell.entity';
import { Weapon } from '../entities/weapon.entity';

import { CharacterDTO } from './interfaces/character.dto';

@Injectable()
export class CharacterPipe
  implements PipeTransform<{ character: CharacterDTO }, Character> {
  transform(
    inValue: { character: CharacterDTO },
    metadata: ArgumentMetadata
  ): Character {
    const value = inValue.character;
    const retVal = new Character();
    retVal.ac = value.ac;
    retVal.charisma = value.attributes[5].value;
    retVal.constitution = value.attributes[2].value;
    retVal.craft_one = value.craftOne;
    retVal.craft_two = value.craftTwo;
    retVal.dexterity = value.attributes[1].value;
    retVal.experience = value.exp;
    retVal.flat_footed = value.flat_footed;
    retVal.health = value.health;
    retVal.id = value.id;
    retVal.intelligence = value.attributes[3].value;
    retVal.level = value.level;
    retVal.magic = value.magic;
    retVal.max_health = value.maxHealth;
    retVal.max_magic = value.maxMagic;
    retVal.name = value.name;
    retVal.performance = value.performCust;
    retVal.profession = value.profession;
    retVal.race = value.race;
    retVal.size = value.size;
    retVal.strength = value.attributes[0].value;
    retVal.subrace = value.subRace;
    retVal.touch = value.touch;
    retVal.wisdom = value.attributes[4].value;
    retVal.skills = [];
    value.magicSkills.forEach((skill) => {
      const mSkill = new Skill();
      mSkill.trained = skill.trained ? skill.trained : false;
      mSkill.name = skill.skillName;
      mSkill.item_modifier = skill.item;
      mSkill.misc_modifier = skill.misc;
      mSkill.modifier = skill.modifier;
      mSkill.racial_modifier = skill.racial;
      mSkill.ranks = skill.ranks;
      mSkill.id = skill.id;
      mSkill.skill_type = 'magic';
      retVal.skills.push(mSkill);
    });
    value.skills.forEach((skill) => {
      const rSkill = new Skill();
      rSkill.trained = skill.trained;
      rSkill.name = skill.skillName;
      rSkill.item_modifier = skill.item;
      rSkill.misc_modifier = skill.misc;
      rSkill.modifier = skill.modifier;
      rSkill.racial_modifier = skill.racial;
      rSkill.ranks = skill.ranks;
      rSkill.id = skill.id;
      rSkill.skill_type = 'skill';
      retVal.skills.push(rSkill);
    });
    value.weaponSkills.forEach((skill) => {
      const wSkill = new Skill();
      wSkill.trained = skill.trained;
      wSkill.name = skill.skillName;
      wSkill.item_modifier = skill.item;
      wSkill.misc_modifier = skill.misc;
      wSkill.modifier = skill.modifier;
      wSkill.racial_modifier = skill.racial;
      wSkill.ranks = skill.ranks;
      wSkill.id = skill.id;
      wSkill.skill_type = 'weapon';
      retVal.skills.push(wSkill);
    });
    retVal.saves = [];
    value.savingThrows.forEach((inSave) => {
      const save = new Save();
      save.modifier = inSave.modifier;
      save.name = inSave.name;
      save.racial_bonus = inSave.racial;
      save.id = inSave.id;
      retVal.saves.push(save);
    });
    retVal.spells = [];
    value.spells.forEach((inSpell) => {
      const spell = new Spell();
      spell.id = inSpell.id;
      spell.name = inSpell.name;
      spell.modifier = inSpell.modifier;
      spell.damage = inSpell.damage;
      spell.diety = inSpell.diety;
      spell.effect = inSpell.effect;
      spell.mp_use = inSpell.mpUse;
      spell.number_of_hit = inSpell.multiplier;
      spell.use_diety = inSpell.useDiety;
      retVal.spells.push(spell);
    });
    retVal.weapons = [];
    value.weapons.forEach((inWeapon) => {
      const weapon = new Weapon();
      weapon.ammo = inWeapon.ammo;
      weapon.modifier = inWeapon.modifier;
      weapon.name = inWeapon.name;
      weapon.type = inWeapon.type;
      weapon.id = inWeapon.id;
      weapon.range = inWeapon.range;
      weapon.damage = inWeapon.attack;
      weapon.number_of_hits = inWeapon.numberOfAttacks;
      weapon.crit_range = parseRange(inWeapon.critRange);
      weapon.crit_multiplier = inWeapon.critDamage;
      retVal.weapons.push(weapon);
    });
    retVal.notes = [];
    value.notes.forEach((inNote) => {
      const note = new Note();
      note.message = inNote.msg;
      note.time = inNote.time;
      note.id = inNote.id;
      note.important = inNote.important;
      retVal.notes.push(note);
    });
    value.importantNotes.forEach((inNote) => {
      const note = new Note();
      note.message = inNote.msg;
      note.time = inNote.time;
      note.id = inNote.id;
      note.important = inNote.important;
      retVal.notes.push(note);
    });
    return retVal;
  }
}

function parseRange(range: number[]): string {
  return range.length === 1
    ? range[0].toString()
    : range[0].toString() + ' - ' + range[range.length - 1].toString();
}
