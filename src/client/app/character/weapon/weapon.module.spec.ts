import { WeaponModule } from './weapon.module';

describe('WeaponModule', () => {
  let weaponModule: WeaponModule;

  beforeEach(() => {
    weaponModule = new WeaponModule();
  });

  it('should create an instance', () => {
    expect(weaponModule).toBeTruthy();
  });
});
