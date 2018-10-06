import { TestBed } from '@angular/core/testing';

import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeaponService = TestBed.get(WeaponService);
    expect(service).toBeTruthy();
  });
});
