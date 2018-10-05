import { inject, TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  test('should be created', inject(
    [MessageService],
    (service: MessageService) => {
      expect(service).toBeTruthy();
    }
  ));

  test('should be able to add messages', inject(
    [MessageService],
    (service: MessageService) => {
      service.add('This is a new message');
      expect(service.messages).toHaveLength(1);
    }
  ));
});
