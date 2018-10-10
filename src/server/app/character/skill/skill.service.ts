import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Skill } from 'entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>
  ) {}

  async getCharacterSkills(charId: string): Promise<Skill[]> {
    return this.skillRepo.find({
      where: {
        characterId: charId
      }
    });
  }
}
