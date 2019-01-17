import { Inject, Injectable } from '@nestjs/common';

import { DbCharacter } from '@DbModel/db_character.model';
import { DbCharacterService } from './db-character/db-character.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly dbService: DbCharacterService
  ) {}

  async getAll(): Promise<DbCharacter[]> {
    return this.dbService.queryCharacters(process.env.DUMMY_ID);
  }

  async getOne(charId: string): Promise<DbCharacter> {
    return this.dbService.queryCharacterOne(charId);
  }

  async getUserChars(userId: string): Promise<DbCharacter[]> {
    return this.dbService.queryCharacters(userId);
  }

  async newChar(inChar: DbCharacter, userId: string): Promise<DbCharacter> {
    return this.dbService.insertNewCharacter(inChar, userId);
  }

  async updateChar(inChar: DbCharacter): Promise<DbCharacter> {
    await this.dbService.updateCharacter(inChar);
    await this.dbService.updateSkills(inChar.skills, inChar.chId);
    return inChar;
  }
}
