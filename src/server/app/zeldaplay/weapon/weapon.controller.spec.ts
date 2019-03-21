import { Test } from '@nestjs/testing';

import { AuthService } from '@Auth/auth.service';
import { DbWeapon } from '@DbModel/index';
import { WeaponController } from '@Weapon/weapon.controller';
import { of } from 'rxjs';
import { WeaponService } from './weapon.service';

const WeaponServiceStub = {
  getWeapons: jest.fn(),
  newWeapon: jest.fn(),
  updateWeapon: jest.fn()
};

describe('Weapon Controller', () => {
  let weaponController: WeaponController;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [
        { useValue: WeaponServiceStub, provide: WeaponService },
        { provide: AuthService, useValue: {} }
      ]
    }).compile();
    weaponController = module.get<WeaponController>(WeaponController);
  });
  it('should be defined', () => {
    expect(weaponController).toBeDefined();
  });
  it('should call getWeapons', async () => {
    WeaponServiceStub.getWeapons.mockReturnValue(
      of([new DbWeapon(), new DbWeapon(), new DbWeapon()])
    );
    weaponController
      .getWeapons({
        charId: '00Ckie34m8c'
      })
      .subscribe((weapons) => {
        expect(weapons).toBeTruthy();
        expect(weapons.length).toBe(3);
      });
  });
  it('should call newWeapon', () => {
    WeaponServiceStub.newWeapon.mockReturnValue(of(new DbWeapon()));
    weaponController
      .newWeapon(new DbWeapon(), {
        charId: '00Ckie34m8c'
      })
      .subscribe((newWeapon) => {
        expect(newWeapon).toBeTruthy();
        expect(newWeapon).toEqual(new DbWeapon());
        expect(WeaponServiceStub.newWeapon).toBeCalledWith(
          new DbWeapon(),
          '00Ckie34m8c'
        );
        expect(WeaponServiceStub.newWeapon).toBeCalledTimes(1);
      });
  });
  it('should call updateWeapon', () => {
    WeaponServiceStub.updateWeapon.mockReturnValue(of(new DbWeapon()));
    weaponController
      .updateWeapon(new DbWeapon(), {
        wepaonId: '00Wij7Mni0sa'
      })
      .subscribe((updatedWeapon) => {
        expect(updatedWeapon).toEqual(new DbWeapon());
        expect(WeaponServiceStub.updateWeapon).toBeCalledWith(new DbWeapon());
        expect(WeaponServiceStub.updateWeapon).toBeCalledTimes(1);
      });
  });
});
