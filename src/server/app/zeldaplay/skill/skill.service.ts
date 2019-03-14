import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbSkill } from '@DbModel/index';
import { DbSkillService } from './db-skill/db-skill.service';

@Injectable()
export class SkillService {
  constructor(private readonly dbService: DbSkillService) {}

  getCharacterSkills(charId: string): Observable<DbSkill[]> {
    return this.dbService.getSkills(charId);
  }
}
