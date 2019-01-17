import { Test, TestingModule } from '@nestjs/testing';
import { DbSkillService } from './db-skill.service';

describe('DbSkillService', () => {
  let service: DbSkillService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbSkillService],
    }).compile();
    service = module.get<DbSkillService>(DbSkillService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
