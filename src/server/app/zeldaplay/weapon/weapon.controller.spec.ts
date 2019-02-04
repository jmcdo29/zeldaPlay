import { WeaponController } from '@Weapon/weapon.controller';
import { DbWeapon } from '@DbModel/db_weapon.model';

const WeaponServiceStub = {
  getWeapons: jest.fn(),
  newWeapon: jest.fn(),
  updateWeapon: jest.fn()
};

describe('Weapon Controller', () => {
  let weaponController: WeaponController;
  beforeAll(async () => {
    weaponController = new WeaponController(WeaponServiceStub as any);
  });
  it('should be defined', () => {
    expect(weaponController).toBeDefined();
  });
  it('should call getWeapons', async () => {
    WeaponServiceStub.getWeapons.mockReturnValue([
      new DbWeapon(),
      new DbWeapon(),
      new DbWeapon()
    ]);
    const weapons = await weaponController.getWeapons('00Ckie34m8c');
    expect(weapons).toBeTruthy();
    expect(weapons.length).toBe(3);
  });
  it('should call newWeapon', async () => {
    WeaponServiceStub.newWeapon.mockReturnValue(new DbWeapon());
    const newWeapon = await weaponController.newWeapon(
      new DbWeapon(),
      '00Ckie34m8c'
    );
    expect(newWeapon).toBeTruthy();
    expect(newWeapon).toEqual(new DbWeapon());
    expect(WeaponServiceStub.newWeapon).toBeCalledWith(
      new DbWeapon(),
      '00Ckie34m8c'
    );
    expect(WeaponServiceStub.newWeapon).toBeCalledTimes(1);
  });
  it('should call updateWeapon', async () => {
    WeaponServiceStub.updateWeapon.mockReturnValue(new DbWeapon());
    const updatedWeapon = await weaponController.updateWeapon(new DbWeapon());
    expect(updatedWeapon).toEqual(new DbWeapon());
    expect(WeaponServiceStub.updateWeapon).toBeCalledWith(new DbWeapon());
    expect(WeaponServiceStub.updateWeapon).toBeCalledTimes(1);
  });
});
