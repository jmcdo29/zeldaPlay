import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpellService } from './spell.service';

describe('SpellService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SpellService]
    }));

  it('should be created', () => {
    const service: SpellService = TestBed.get(SpellService);
    expect(service).toBeTruthy();
  });
});
