import { Test, TestingModule } from '@nestjs/testing';
import { DbWeaponService } from './db-weapon.service';

describe('DbWeaponService', () => {
  let service: DbWeaponService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbWeaponService],
    }).compile();
    service = module.get<DbWeaponService>(DbWeaponService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
