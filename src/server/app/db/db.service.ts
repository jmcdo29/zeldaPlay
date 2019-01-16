import { Injectable } from '@nestjs/common';
import { consoleLogger as scribe } from 'mc-scribe';
import { Pool } from 'pg';

import { DbCharacter } from './models/db_character.model';
import { DbNote } from './models/db_note.model';
import { DbSpell } from './models/db_spell.table';
import { DbWeapon } from './models/db_weapon.model';

@Injectable()
export class DbService {
  private pool: Pool;
  private schema: string;

  constructor(schema: string) {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_url
    });
    this.schema = schema;
  }

  private async query<T>(text: string, params: any[]): Promise<T[]> {
    const qStart = Date.now();
    try {
      const queryRes = await this.pool.query(text.replace(/\n\s*,/g, ', ').replace(/\n\s*/g, ' '), params);
      scribe('DEBUG', `Retrieved ${queryRes.rowCount} records in ${Date.now() - qStart} ms.`);
      return queryRes.rows;
    } catch (err) {
      scribe('ERROR', err.message);
      scribe('FINE', err.stack);
      return [];
    }
  }

  async queryCharacters(playerId: string): Promise<DbCharacter[]> {
    const characters = await this.query<DbCharacter>(
      `SELECT
        id as chId
       ,name as chName
       ,race as chRace
      FROM ${this.schema}.characters
      WHERE player_id = $1`,
      [playerId]
    );
    return characters;
  }

  async queryCharacterOne(charId: string): Promise<DbCharacter> {
    const character = await this.query<DbCharacter>(
      `SELECT
        id as chId
        ,name as chName
        ,race as chRace
        ,subrace as chSubrace
        ,level as chLevel
        ,strength as chStrength
        ,dexterity as chDexterity
        ,constitution as chConstitution
        ,intelligence as chIntelligence
        ,wisdom as chWisdom
        ,charisma as chCharisma
        ,health as chHealth
        ,health_max as chHealthMax
        ,magic as chMagic
        ,magic_max as chMagicMax
        ,experience as chExperience
        ,performance as chPerformance
        ,profession as chProfession
        ,craft_one as chCraftOne
        ,craft_two as chCraftTwo
      FROM ${this.schema}.characters
      WHERE id = $1`,
      [charId]
    );
    return character[0];
  }

  async queryCharacterNotes(charId: string): Promise<DbNote[]> {
    const notes = await this.query<DbNote>(
      `SELECT
        id as nId
        ,message as nMessage
        ,note_time as nNoteTime
        ,important as nImportant
      FROM ${this.schema}.notes
      WHERE character_id = $1`,
      [charId]
    );
    return notes;
  }

  async queryCharacterSpells(charId: string): Promise<DbSpell[]> {
    const spells = await this.query<DbSpell>(
      `SELECT
        id as spId
        ,name as spName
        ,diety as spDiety
        ,effect as spEffect
        ,mp_use as spMpUse
        ,use_diety as spUseDiety
        ,modifier as spModifier
        ,damage as spDamage
      FROM ${this.schema}.spells
      WHERE character_id = $1`,
      [charId]
    );
    return spells;
  }

  async queryCharacterWeapons(charId: string): Promise<DbWeapon[]> {
    const weapons = await this.query<DbWeapon>(
      `SELECT
        id as wId
        ,name as wName
        ,modifier as wModifier
        ,ammo as wAmmo
        ,range as wRange
        ,crit_damage as wCritDamage
        ,crit_range as wCritRange
        ,number_of_hits as wNumberOfHits
        ,type as wType
        ,damage as wDamage
      FROM ${this.schema}.weapons
      WHERE character_id = $1`,
      [charId]
    );
    return weapons;
  }
}
