import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [WeaponService]
    })
  );

  it('should be created', () => {
    const service: WeaponService = TestBed.get(WeaponService);
    expect(service).toBeTruthy();
  });
});
