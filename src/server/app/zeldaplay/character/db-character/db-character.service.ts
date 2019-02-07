import { BadRequestException, Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbCharacter } from '@DbModel/db_character.model';
import { DbSave } from '@DbModel/db_save.model';
import { DbSkill } from '@DbModel/db_skill.model';

@Injectable()
export class DbCharacterService {
  private schema: string;
  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  async queryCharacters(playerId: string): Promise<DbCharacter[]> {
    return this.dbService.query<DbCharacter>(
      `SELECT
        id as "chId"
      ,name as "chName"
      ,race as "chRace"
      FROM ${this.schema}.characters
      WHERE player_id = $1`,
      [playerId]
    );
  }

  async queryCharacterOne(charId: string): Promise<DbCharacter> {
    const character = await this.dbService.query<DbCharacter>(
      `SELECT
        id as "chId"
        ,name as "chName"
        ,race as "chRace"
        ,subrace as "chSubrace"
        ,level as "chLevel"
        ,strength as "chStrength"
        ,dexterity as "chDexterity"
        ,constitution as "chConstitution"
        ,intelligence as "chIntelligence"
        ,wisdom as "chWisdom"
        ,charisma as "chCharisma"
        ,health as "chHealth"
        ,health_max as "chHealthMax"
        ,magic as "chMagic"
        ,magic_max as "chMagicMax"
        ,experience as "chExperience"
        ,performance as "chPerformance"
        ,profession as "chProfession"
        ,craft_one as "chCraftOne"
        ,craft_two as "chCraftTwo"
      FROM ${this.schema}."characters"
      WHERE id = $1`,
      [charId]
    );
    if (!character[0]) {
      throw new BadRequestException('No character found');
    }
    const skills = await this.dbService.query<DbSkill>(
      `SELECT
        id as "skId"
        ,name as "skName"
        ,modifier as "skModifier"
        ,type as "skType"
        ,ranks as "skRanks"
        ,item_modifier as "skItemModifier"
        ,racial_modifier as "skRacialModifier"
        ,misc_modifier as "skMiscModifier"
      FROM ${this.schema}.skills
      WHERE character_id = $1`,
      [charId]
    );
    const saves = await this.dbService.query<DbSave>(
      `SELECT
        id as "saId"
        ,name as "saName"
        ,modifier as "saModifier"
        ,racial_bonus as "saRacialBonus"
      FROM ${this.schema}.saving_throws
      WHERE character_id = $1`,
      [charId]
    );
    character[0].skills = skills;
    character[0].saves = saves;
    return character[0];
  }

  async insertNewCharacter(
    character: DbCharacter,
    userId: string
  ): Promise<DbCharacter> {
    const char = await this.dbService.query<DbCharacter>(
      `INSERT INTO ${this.schema}.characters
      ( name
        ,race
        ,subrace
        ,strength
        ,dexterity
        ,constitution
        ,intelligence
        ,wisdom
        ,charisma
        ,health
        ,health_max
        ,magic
        ,magic_max
        ,experience
        ,level
        ,performance
        ,profession
        ,craft_one
        ,craft_two
        ,player_id
      ) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING id as "chId"`,
      [
        character.chName,
        character.chRace,
        character.chSubrace,
        character.chStrength,
        character.chDexterity,
        character.chConstitution,
        character.chIntelligence,
        character.chWisdom,
        character.chCharisma,
        character.chHealth,
        character.chHealthMax,
        character.chMagic,
        character.chMagicMax,
        character.chExperience,
        character.chLevel,
        character.chPerformance,
        character.chProfession,
        character.chCraftOne,
        character.chCraftTwo,
        userId
      ]
    );
    this.insertSkills(character, char[0].chId);
    this.insertSaves(character, char[0].chId);
    return char[0];
  }

  async insertSkills(character: DbCharacter, charId: string): Promise<void> {
    const insert = `INSERT INTO ${this.schema}.skills
    ( name
      ,modifier
      ,ranks
      ,trained
      ,type
      ,character_id
    ) VALUES `;
    const values = [];
    let insertString = '';
    let counter = 1;
    for (const skill of character.skills) {
      insertString += '(';
      for (let i = 0; i < 6; i++) {
        insertString += `$${counter++},`;
      }
      insertString = insertString.slice(0, insertString.length - 1) + '),';
      values.push(
        skill.skName,
        skill.skModifier,
        skill.skRanks,
        skill.skTrained,
        skill.skType,
        charId
      );
    }
    insertString = insertString.slice(0, insertString.length - 1);
    this.dbService.query(insert + insertString, values);
  }

  async insertSaves(character: DbCharacter, charId: string): Promise<void> {
    const insert = `INSERT INTO ${this.schema}.saving_throws
    ( name
      ,modifier
      ,racial_bonus
      ,character_id
    ) VALUES `;
    const values = [];
    let insertString = '';
    let counter = 1;
    for (const save of character.saves) {
      insertString += '(';
      for (let i = 0; i < 4; i++) {
        insertString += `$${counter++},`;
      }
      insertString = insertString.slice(0, insertString.length - 1) + '),';
      values.push(save.saName, save.saModifier, save.saRacialBonus, charId);
    }
    insertString = insertString.slice(0, insertString.length - 1);
    this.dbService.query(insert + insertString, values);
  }

  async updateCharacter(character: DbCharacter): Promise<DbCharacter> {
    const char = await this.dbService.query<DbCharacter>(
      `UPDATE ${this.schema}.characters as chars
        SET strength = uChar.str
        ,dexterity = uChar.dex
        ,constitution = uChar.con
        ,intelligence = uChar.int
        ,wisdom = uChar.wis
        ,charisma = uChar.cha
        ,health = uChar.h
        ,health_max = uChar.hm
        ,magic = uChar.m
        ,magic_max = $uChar.mm
        ,experience = uChar.exp
        ,level = uChar.l
        ,craft_one = uChar.co
        ,craft_two = uChar.ct
        ,performance = uChar.per
        ,profession = uChar.pro
      FROM (VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17))
        as uChar(str, dex, con, int, wis, cha, h, hm, m, mm, exp, l, co, ct, per, pro, id)
      WHERE chars.id = uChar.id
      `,
      [
        character.chStrength,
        character.chDexterity,
        character.chConstitution,
        character.chIntelligence,
        character.chWisdom,
        character.chCharisma,
        character.chHealth,
        character.chHealthMax,
        character.chMagic,
        character.chMagicMax,
        character.chExperience,
        character.chLevel,
        character.chCraftOne,
        character.chCraftTwo,
        character.chPerformance,
        character.chProfession,
        character.chId
      ]
    );
    return char[0];
  }

  async updateSkills(skills: DbSkill[], charId: string): Promise<DbSkill[]> {
    let paramString: string;
    const paramValues: number[] = [];
    let index = 2;
    for (const skill of skills) {
      paramString += `$${index}, `;
      paramValues.push(skill.skRanks);
      index++;
    }
    paramString = paramString
      ? paramString.substring(0, paramString.length - 2)
      : '';
    return this.dbService.query<DbSkill>(
      `UPDATE ${this.schema}.skills AS skills
        SET ranks = inSkill.r
      FROM( VALUES
        ($*)
      ) AS inSkill(r)
        WHERE skills.character_id = $1
      `.replace('$*', paramString),
      ([charId] as any).concat(paramValues)
    );
  }
}
