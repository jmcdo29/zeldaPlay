import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbCharacter } from '@DbModel/db_character.model';

@Injectable()
export class DbCharacterService {
  constructor(private readonly dbService: DbService) {}

  async queryCharacters(playerId: string): Promise<DbCharacter[]> {
    let characters: DbCharacter[];
    if (playerId !== '') {
       characters = await this.dbService.query<DbCharacter>(
        `SELECT
          id as chId
        ,name as chName
        ,race as chRace
        FROM zeldaplay.characters
        WHERE player_id = $1`,
        [playerId]
      );
    } else {
      characters = await this.dbService.query<DbCharacter>(
        `SELECT
          id as chId
        ,name as chName
        ,race as chRace
        FROM zeldaplay.characters
        WHERE player_id IS NULL`,
        []
      );
    }
    return characters;
  }

  async queryCharacterOne(charId: string): Promise<DbCharacter> {
    const character = await this.dbService.query<DbCharacter>(
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
      FROM zeldaplay.characters
      WHERE id = $1`,
      [charId]
    );
    return character[0];
  }
}
