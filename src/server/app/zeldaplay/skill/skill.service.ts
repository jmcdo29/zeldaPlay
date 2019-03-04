import { Injectable } from '@nestjs/common';

import { DbSkill } from '@DbModel/index';
import { DbSkillService } from './db-skill/db-skill.service';

@Injectable()
export class SkillService {
  constructor(private readonly dbService: DbSkillService) {}

  async getCharacterSkills(charId: string): Promise<DbSkill[]> {
    return this.dbService.getSkills(charId);
  }
}
