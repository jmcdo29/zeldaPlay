import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AlertService]
    });
  });

  test('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));

  test('make a success message', inject(
    [AlertService],
    (service: AlertService) => {
      service.success('success');
      service.getMessage().subscribe((message) => {
        expect(message.text).toBe('success');
        expect(message.type).toBe('success');
      });
    }
  ));
  test('make an error message', inject(
    [AlertService],
    (service: AlertService) => {
      service.error('error');
      service.getMessage().subscribe((message) => {
        expect(message.text).toBe('error');
        expect(message.type).toBe('error');
      });
    }
  ));
});
