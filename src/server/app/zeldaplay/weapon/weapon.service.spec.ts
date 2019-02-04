import { Test, TestingModule } from '@nestjs/testing';

import { DbWeaponService } from './db-weapon/db-weapon.service';
import { WeaponService } from '@Weapon/weapon.service';
import { DbWeapon } from '@Db/models/db_weapon.model';

const mockRepo = {
  getWeapons: jest
    .fn()
    .mockReturnValue([new DbWeapon(), new DbWeapon(), new DbWeapon()]),
  newWeapon: jest.fn().mockReturnValue(new DbWeapon()),
  updateWeapon: jest.fn().mockReturnValue(new DbWeapon())
};

const charId = '00Ctest12345';

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
  it('should run the getWeapons functionality', async () => {
    const queryRes = await service.getWeapons(charId);
    expect(mockRepo.getWeapons).toBeCalledTimes(1);
    expect(mockRepo.getWeapons).toBeCalledWith(charId);
    expect(queryRes).toEqual([new DbWeapon(), new DbWeapon(), new DbWeapon()]);
  });
  it('should run the newWeapon functionality', async () => {
    const insertRes = await service.newWeapon(new DbWeapon(), charId);
    expect(mockRepo.newWeapon).toBeCalledTimes(1);
    expect(mockRepo.newWeapon).toBeCalledWith(new DbWeapon(), charId);
    expect(insertRes).toEqual(new DbWeapon());
  });
  it('should run the updateWeapons functionality', async () => {
    const updateRes = await service.updateWeapon(new DbWeapon());
    expect(mockRepo.updateWeapon).toBeCalledTimes(1);
    expect(mockRepo.updateWeapon).toBeCalledWith(new DbWeapon());
    expect(updateRes).toEqual(new DbWeapon());
  });
});
