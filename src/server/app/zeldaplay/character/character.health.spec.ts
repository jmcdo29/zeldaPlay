import { Test } from '@nestjs/testing';

import { DbCharacter } from '@Db/models';
import { of } from 'rxjs';
import { CharacterHealthIndicator } from './character.health';
import { CharacterService } from './character.service';

const mockService = {
  getAll: jest.fn()
};

describe('CharacterHealth', () => {
  let healthService: CharacterHealthIndicator;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CharacterHealthIndicator,
        {
          provide: CharacterService,
          useValue: mockService
        }
      ]
    }).compile();
    healthService = module.get<CharacterHealthIndicator>(
      CharacterHealthIndicator
    );
  });

  it('should create', () => {
    expect(healthService).toBeTruthy();
  });
  it('should have a isHealthy function', () => {
    const liveCharter = new DbCharacter();
    liveCharter.chHealth = 100;
    const liveCharter2 = new DbCharacter();
    liveCharter2.chHealth = 100;
    const deadChar = new DbCharacter();
    deadChar.chHealth = 0;
    mockService.getAll.mockReturnValue(
      of([liveCharter, liveCharter2, deadChar])
    );
    healthService.isHealthy('character').subscribe((data) => {
      expect(data).toEqual({
        character: {
          status: 'up',
          dead: 1
        }
      });
    });
  });
});
