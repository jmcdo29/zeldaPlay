import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { Modifier, WeaponType } from '@DbModel/enums/index';
import { DbWeapon } from '@DbModel/index';
import { DbWeaponService } from './db-weapon.service';

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
  it('should run the getWeapons function', () => {
    mockDb.query.mockReturnValueOnce(
      of([new DbWeapon(), new DbWeapon(), new DbWeapon()])
    );
    service.getWeapons(charId).subscribe((getRes) => {
      expect(mockDb.query).toBeCalledTimes(++queryCalls);
      expect(getRes).toEqual([new DbWeapon(), new DbWeapon(), new DbWeapon()]);
    });
  });
  it('should run the insertWeapon function', () => {
    mockDb.query.mockReturnValueOnce(of([new DbWeapon()]));
    service.newWeapon(new DbWeapon(), charId).subscribe((insertRes) => {
      expect(mockDb.query).toBeCalledTimes(++queryCalls);
      expect(insertRes).toEqual(new DbWeapon());
    });
  });
  it('should run the updateWeapon function', () => {
    mockDb.query.mockReturnValueOnce(of([new DbWeapon()]));
    service.updateWeapon(new DbWeapon()).subscribe((updateRes) => {
      expect(mockDb.query).toBeCalledTimes(++queryCalls);
      expect(updateRes).toEqual(new DbWeapon());
    });
  });
});
