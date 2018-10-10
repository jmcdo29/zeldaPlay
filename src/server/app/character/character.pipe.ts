import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';

import { Character } from 'entities/character.entity';
import { Save } from 'entities/save.entity';
import { Skill } from 'entities/skill.entity';
import { Spell } from 'entities/spell.entity';
import { Weapon } from 'entities/weapon.entity';

import { CharacterDTO } from './interfaces/character.dto';
import { NotePipe } from './note/note.pipe';
import { SpellPipe } from './spell/spell.pipe';
import { WeaponPipe } from './weapon/weapon.pipe';

@Pipe()
export class CharacterPipe implements PipeTransform<CharacterDTO, Character> {
  constructor(
    private readonly notePipe: NotePipe,
    private readonly spellPipe: SpellPipe,
    private readonly weaponPipe: WeaponPipe
  ) {}

  transform(value: CharacterDTO, metadata: ArgumentMetadata): Character {
    const retVal: Character = new Character();
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
    value.magicSkills.forEach((skill) => {
      const mSkill = new Skill();
      mSkill.trained = skill.trained;
      mSkill.name = skill.name;
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
      rSkill.name = skill.name;
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
      wSkill.name = skill.name;
      wSkill.item_modifier = skill.item;
      wSkill.misc_modifier = skill.misc;
      wSkill.modifier = skill.modifier;
      wSkill.racial_modifier = skill.racial;
      wSkill.ranks = skill.ranks;
      wSkill.id = skill.id;
      wSkill.skill_type = 'weapon';
      retVal.skills.push(wSkill);
    });
    value.savingThrows.forEach((inSave) => {
      const save = new Save();
      save.modifier = inSave.modifier;
      save.name = inSave.name;
      save.racial_bonus = inSave.racial;
      save.id = inSave.id;
      retVal.saves.push(save);
    });
    value.spells.forEach((inSpell) => {
      retVal.spells.push(this.spellPipe.transform(inSpell, { type: 'body' }));
    });
    value.weapons.forEach((inWeapon) => {
      retVal.weapons.push(
        this.weaponPipe.transform(inWeapon, { type: 'body' })
      );
    });
    value.notes.forEach((inNote) => {
      retVal.notes.push(this.notePipe.transform(inNote, { type: 'body' }));
    });
    value.importantNotes.forEach((inNote) => {
      retVal.notes.push(this.notePipe.transform(inNote, { type: 'body' }));
    });
    return retVal;
  }
}
