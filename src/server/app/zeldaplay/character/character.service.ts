import { BadRequestException, Injectable } from '@nestjs/common';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { DbService } from '@Db/db.service';
import { DbCharacter, DbSave, DbSkill } from '@DbModel/index';

@Injectable()
export class CharacterService {
  constructor(private readonly db: DbService) {}

  getAll(): Observable<DbCharacter[]> {
    return this.db.query<DbCharacter>(
      `SELECT
        id as "chId"
      ,name as "chName"
      ,race as "chRace"
      FROM zeldaplay.characters
      WHERE player_id = $1`,
      [process.env.DUMMY_ID]
    );
  }

  getOne(charId: string): Observable<DbCharacter> {
    return zip(
      this.db.query<DbCharacter>(
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
      FROM zeldaplay.characters
      WHERE id = $1`,
        [charId]
      ),
      this.db.query<DbSkill>(
        `SELECT
        id as "skId"
        ,name as "skName"
        ,modifier as "skModifier"
        ,type as "skType"
        ,ranks as "skRanks"
        ,item_modifier as "skItemModifier"
        ,racial_modifier as "skRacialModifier"
        ,misc_modifier as "skMiscModifier"
      FROM zeldaplay.skills
      WHERE character_id = $1`,
        [charId]
      ),
      this.db.query<DbSave>(
        `SELECT
        id as "saId"
        ,name as "saName"
        ,modifier as "saModifier"
        ,racial_bonus as "saRacialBonus"
      FROM zeldaplay.saving_throws
      WHERE character_id = $1`,
        [charId]
      )
    ).pipe(
      map((results) => {
        if (results[0].length === 0) {
          throw new BadRequestException('No character found');
        }
        const char = results[0][0];
        char.skills = results[1];
        char.saves = results[2];
        return char;
      })
    );
  }

  getUserChars(userId: string): Observable<DbCharacter[]> {
    return this.db.query<DbCharacter>(
      `SELECT
        id as "chId"
      ,name as "chName"
      ,race as "chRace"
      FROM zeldaplay.characters
      WHERE player_id = $1`,
      [userId]
    );
  }

  newChar(character: DbCharacter, userId: string): Observable<DbCharacter> {
    return this.db
      .query<DbCharacter>(
        `INSERT INTO zeldaplay.characters
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
      )
      .pipe(
        map((char) => {
          this.insertSkills(character, char[0].chId);
          this.insertSaves(character, char[0].chId);
          return char[0];
        })
      );
  }

  private insertSkills(
    character: DbCharacter,
    charId: string
  ): Observable<DbSkill[]> {
    const insert = `INSERT INTO zeldaplay.skills
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
    return this.db.query(insert + insertString, values);
  }

  private insertSaves(
    character: DbCharacter,
    charId: string
  ): Observable<DbSave[]> {
    const insert = `INSERT INTO zeldaplay.saving_throws
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
    return this.db.query(insert + insertString, values);
  }

  updateChar(character: DbCharacter): Observable<DbCharacter> {
    return zip(
      this.db
        .query<DbCharacter>(
          `UPDATE zeldaplay.characters as chars
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
        )
        .pipe(map((char) => char[0])),
      this.updateSkills(character.skills, character.chId)
    ).pipe(
      map((result) => {
        return result[0];
      })
    );
  }

  private updateSkills(
    skills: DbSkill[],
    charId: string
  ): Observable<DbSkill[]> {
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
    return this.db.query<DbSkill>(
      `UPDATE zeldaplay.skills AS skills
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
