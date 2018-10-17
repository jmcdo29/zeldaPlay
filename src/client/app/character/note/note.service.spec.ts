import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';

describe('NoteService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [NoteService]
    }));

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });
});
