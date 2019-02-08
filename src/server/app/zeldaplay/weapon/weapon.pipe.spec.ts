import { WeaponPipe } from './weapon.pipe';

import { DbWeapon } from '@DbModel/db_weapon.model';
import { WeaponDTO } from './interfaces/weapon.dto';

describe('#WeaponPipe Tranform', () => {
  let inWeapon: WeaponDTO;
  let pipe: WeaponPipe;
  const meta: any = {
    type: 'Body'
  };
  beforeAll(() => {
    pipe = new WeaponPipe();
  });
  beforeEach(() => {
    inWeapon = {
      name: 'Short Sword',
      type: 'Short Sword',
      numberOfAttacks: 1,
      attack: 6,
      id: '00Wa8nM2du6b',
      modifier: 'Strength',
      ammo: null,
      range: 0,
      critDamage: 2,
      critRange: '[18, 19, 20]'
    };
  });
  it('should transform a weapon with a multi-range critRange', () => {
    const transformed = pipe.transform(inWeapon, meta);
    expect(transformed.wCritRange).toBe('18 - 20');
    expect(transformed.wType).toBe('Short Sword');
  });
  it('should transform a weapon with a single-range critRange', () => {
    const singleResponse: any = inWeapon;
    singleResponse.critRange = '[20]';
    const transformed = pipe.transform(singleResponse, meta);
    expect(transformed.wCritRange).toBe('20');
    expect(transformed.wModifier).toBe('Strength');
  });
});
