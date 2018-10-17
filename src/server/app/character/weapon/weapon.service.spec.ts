import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { WeaponService } from '@Character/weapon/weapon.service';
import { Weapon } from '@Entity/weapon.entity';

const mockRepo = {};

describe('WeaponService', () => {
  let service: WeaponService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: getRepositoryToken(Weapon),
          useValue: mockRepo
        }
      ]
    }).compile();
    service = module.get<WeaponService>(WeaponService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
