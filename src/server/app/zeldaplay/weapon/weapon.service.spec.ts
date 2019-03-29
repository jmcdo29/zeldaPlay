import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbWeapon } from '@DbModel/index';
import { WeaponService } from '@Weapon/weapon.service';

const mockRepo = {
  query: jest.fn(),
  getWeapons: jest
    .fn()
    .mockReturnValue(of([new DbWeapon(), new DbWeapon(), new DbWeapon()])),
  newWeapon: jest.fn().mockReturnValue(of(new DbWeapon())),
  updateWeapon: jest.fn().mockReturnValue(of(new DbWeapon()))
};

const charId = '00Ctest12345';
let queryCalls = 0;

describe('WeaponService', () => {
  let service: WeaponService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: DbService,
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
    mockRepo.query.mockReturnValue(
      of([new DbWeapon(), new DbWeapon(), new DbWeapon()])
    );
    service.getWeapons(charId).subscribe((queryRes) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(queryRes).toEqual([
        new DbWeapon(),
        new DbWeapon(),
        new DbWeapon()
      ]);
    });
  });
  it('should run the newWeapon functionality', () => {
    mockRepo.query.mockReturnValue(of([new DbWeapon()]));
    service.newWeapon(new DbWeapon(), charId).subscribe((insertRes) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(insertRes).toEqual(new DbWeapon());
    });
  });
  it('should run the updateWeapons functionality', () => {
    mockRepo.query.mockReturnValue(of([new DbWeapon()]));
    service.updateWeapon(new DbWeapon()).subscribe((updateRes) => {
      expect(mockRepo.query).toBeCalledTimes(++queryCalls);
      expect(updateRes).toEqual(new DbWeapon());
    });
  });
});
