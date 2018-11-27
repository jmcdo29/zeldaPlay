import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SkillService } from './skill.service';

describe('SkillService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SkillService]
    })
  );

  it('should be created', () => {
    const service: SkillService = TestBed.get(SkillService);
    expect(service).toBeTruthy();
  });
});
