import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbWeapon } from '@DbModel/index';
import { WeaponService } from '@Weapon/weapon.service';
import { DbWeaponService } from './db-weapon/db-weapon.service';

const mockRepo = {
  getWeapons: jest
    .fn()
    .mockReturnValue(of([new DbWeapon(), new DbWeapon(), new DbWeapon()])),
  newWeapon: jest.fn().mockReturnValue(of(new DbWeapon())),
  updateWeapon: jest.fn().mockReturnValue(of(new DbWeapon()))
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
  it('should run the getWeapons functionality', () => {
    service.getWeapons(charId).subscribe((queryRes) => {
      expect(mockRepo.getWeapons).toBeCalledTimes(1);
      expect(mockRepo.getWeapons).toBeCalledWith(charId);
      expect(queryRes).toEqual([
        new DbWeapon(),
        new DbWeapon(),
        new DbWeapon()
      ]);
    });
  });
  it('should run the newWeapon functionality', () => {
    service.newWeapon(new DbWeapon(), charId).subscribe((insertRes) => {
      expect(mockRepo.newWeapon).toBeCalledTimes(1);
      expect(mockRepo.newWeapon).toBeCalledWith(new DbWeapon(), charId);
      expect(insertRes).toEqual(new DbWeapon());
    });
  });
  it('should run the updateWeapons functionality', () => {
    service.updateWeapon(new DbWeapon()).subscribe((updateRes) => {
      expect(mockRepo.updateWeapon).toBeCalledTimes(1);
      expect(mockRepo.updateWeapon).toBeCalledWith(new DbWeapon());
      expect(updateRes).toEqual(new DbWeapon());
    });
  });
});
