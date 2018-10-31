import { WeaponController } from '@Character/weapon/weapon.controller';

const WeaponServiceStub = {
  getWeapons: () => {},
  newWeapon: () => {},
  updateWeapon: () => {}
};

describe('Weapon Controller', () => {
  let weaponController: WeaponController;
  beforeAll(async () => {
    weaponController = new WeaponController(WeaponServiceStub as any);
  });
  it('should be defined', () => {
    expect(weaponController).toBeDefined();
  });
});
