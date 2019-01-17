import { Test, TestingModule } from '@nestjs/testing';
import { DbWeaponService } from './db-weapon.service';
import { DbService } from '@Db/db.service';

describe('DbWeaponService', () => {
  let service: DbWeaponService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbWeaponService, {
        provide: DbService,
        useValue: {}
      }],
    }).compile();
    service = module.get<DbWeaponService>(DbWeaponService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
