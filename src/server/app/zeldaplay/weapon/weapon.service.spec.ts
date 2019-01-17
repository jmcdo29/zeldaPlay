import { Test, TestingModule } from '@nestjs/testing';

import { DbWeaponService } from './db-weapon/db-weapon.service';
import { WeaponService } from '@Weapon/weapon.service';

const mockRepo = {};

describe('WeaponService', () => {
  let service: WeaponService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: DbWeaponService,
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
