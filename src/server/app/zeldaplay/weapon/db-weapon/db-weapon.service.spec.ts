import { Test, TestingModule } from '@nestjs/testing';

import { DbService } from '@Db/db.service';
import { DbWeaponService } from './db-weapon.service';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { Modifier } from '@DbModel/enums/modifiers.enum';
import { WeaponType } from '@DbModel/enums/weapons.enum';

const mockDb = {
  query: jest.fn()
};

const charId = '00Ctest12345';

describe('DbWeaponService', () => {
  let service: DbWeaponService;
  let newWeapon: DbWeapon;
  let queryCalls = 0;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DbWeaponService,
        {
          provide: DbService,
          useValue: mockDb
        }
      ]
    }).compile();
    service = module.get<DbWeaponService>(DbWeaponService);
  });
  beforeEach(() => {
    newWeapon = new DbWeapon();
    newWeapon.wAmmo = 30;
    newWeapon.wCritDamage = 3;
    newWeapon.wCritRange = '20';
    newWeapon.wDamage = 6;
    (newWeapon.wId = '00Wtest12345'),
      (newWeapon.wModifier = Modifier['Strenght']);
    newWeapon.wName = 'Short Sword';
    newWeapon.wNumberOfHits = 2;
    newWeapon.wRange = 0;
    newWeapon.wType = WeaponType['Short Sword'];
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should run the getWeapons function', async () => {
    mockDb.query.mockReturnValueOnce([
      new DbWeapon(),
      new DbWeapon(),
      new DbWeapon()
    ]);
    const getRes = await service.getWeapons(charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(getRes).toEqual([new DbWeapon(), new DbWeapon(), new DbWeapon()]);
  });
  it('should run the insertWeapon function', async () => {
    mockDb.query.mockReturnValueOnce([new DbWeapon()]);
    const insertRes = await service.newWeapon(new DbWeapon(), charId);
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(insertRes).toEqual(new DbWeapon());
  });
  it('should run the updateWeapon function', async () => {
    mockDb.query.mockReturnValueOnce([new DbWeapon()]);
    const updateRes = await service.updateWeapon(new DbWeapon());
    expect(mockDb.query).toBeCalledTimes(++queryCalls);
    expect(updateRes).toEqual(new DbWeapon());
  });
});
