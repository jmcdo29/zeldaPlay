import { Test, TestingModule } from '@nestjs/testing';
import {
  AbilityScore,
  AbilityScoreInput,
  AbilityScoreUpdate
} from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { AbilityScoreService } from './ability-score.service';

const charId = 'CHR-TEST';
const abilityScores: AbilityScore[] = [
  {
    id: 'ABL-TEST1',
    name: 'Strength',
    value: 10,
    characterId: charId
  },
  {
    id: 'ABL-TEST2',
    name: 'Dexterity',
    value: 12,
    characterId: charId
  },
  {
    id: 'ABL-TEST3',
    name: 'Constitution',
    value: 8,
    characterId: charId
  },
  {
    id: 'ABL-TEST4',
    name: 'Intelligence',
    value: 15,
    characterId: charId
  },
  {
    id: 'ABL-TEST5',
    name: 'Wisdom',
    value: 18,
    characterId: charId
  },
  {
    id: 'ABL-TEST6',
    name: 'Charisma',
    value: 16,
    characterId: charId
  }
];
const abilityScore = {
  id: 'ABL-TEST1',
  name: 'Strength',
  value: 10,
  characterId: charId
};
const abilityInsertReturn = {
  id: 'ABL-TEST1'
};
const abilityScoreInput: AbilityScoreInput = {
  name: 'Strength',
  value: 12,
  characterId: charId
};
const abilityScoreUpdate: AbilityScoreUpdate = {
  value: 10,
  id: 'ABL-TEST1'
};
const abilityScoresUpdate: AbilityScoreUpdate[] = [
  {
    value: 10,
    id: 'ABL-TEST1'
  },
  {
    value: 12,
    id: 'ABL-TEST2'
  },
  {
    value: 16,
    id: 'ABL-TEST4'
  }
];

const abilityScoreObserver = (done: () => void) => ({
  next(value: AbilityScore) {
    expect(value).toEqual(abilityScore);
  },
  error(error: Error) {
    throw new Error(error.message);
  },
  complete() {
    done();
  }
});

const abilityScoresObserver = (done: () => void) => ({
  next(value: AbilityScore[]) {
    expect(value).toEqual(abilityScores);
  },
  error(error: Error) {
    throw new Error(error.message);
  },
  complete() {
    done();
  }
});

describe('AbilityScoreService', () => {
  let service: AbilityScoreService;
  let db: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbilityScoreService,
        {
          provide: DatabaseService,
          useValue: {
            query: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<AbilityScoreService>(AbilityScoreService);
    db = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get the ability scores for one character', (done) => {
    db.query = jest.fn().mockReturnValueOnce(of(abilityScores));
    service
      .getAbilityScoresByCharId({ id: charId })
      .subscribe(abilityScoresObserver(done));
  });
  it('should get one ability score', (done) => {
    db.query = jest.fn().mockReturnValueOnce(of([abilityScore]));
    service
      .getAbilityScoreById({ id: 'ABL-TEST1' })
      .subscribe(abilityScoreObserver(done));
  });
  it('should insert one ability score', (done) => {
    db.query = jest.fn().mockReturnValueOnce(of([abilityInsertReturn]));
    service.insertOneAbilityScore(abilityScoreInput).subscribe({
      next(abScore) {
        expect(abScore).toEqual({ id: 'ABL-TEST1', ...abilityScoreInput });
      },
      error(error) {
        throw new Error(error);
      },
      complete() {
        done();
      }
    });
  });
  it('should insert multiple ability scores', (done) => {
    db.query = jest
      .fn()
      .mockReturnValueOnce(
        of([{ id: 'ABL-TEST1' }, { id: 'ABL-TEST2' }, { id: 'ABL-TEST3' }])
      );
    service
      .insertManyAbilityScores([
        abilityScoreInput,
        abilityScoreInput,
        abilityScoreInput
      ])
      .subscribe({
        next(abScores) {
          expect(abScores.length).toBe(3);
          expect(abScores).toEqual([
            {
              id: 'ABL-TEST1',
              ...abilityScoreInput
            },
            {
              id: 'ABL-TEST2',
              ...abilityScoreInput
            },
            {
              id: 'ABL-TEST3',
              ...abilityScoreInput
            }
          ]);
        },
        error(error) {
          throw new Error(error);
        },
        complete() {
          done();
        }
      });
  });
  it('should update one ability score', (done) => {
    db.query = jest
      .fn()
      .mockReturnValueOnce(of([abilityInsertReturn]))
      .mockReturnValueOnce(of([abilityScore]));
    service
      .updateOneAbilityScore(abilityScoreUpdate)
      .subscribe(abilityScoreObserver(done));
  });
  it('should update multiple ability scores', (done) => {
    db.query = jest
      .fn()
      .mockReturnValueOnce(of(['ABL-TEST1', 'ABL-TEST2', 'ABL-TEST4']))
      .mockReturnValueOnce(
        of([
          {
            id: 'ABL-TEST1',
            value: 10,
            name: 'Strength',
            characterId: 'CHR-TEST1'
          },
          {
            id: 'ABL-TEST2',
            value: 12,
            name: 'Dexterity',
            characterId: 'CHR-TEST1'
          },
          {
            id: 'ABL-TEST4',
            name: 'Intelligence',
            value: 16,
            characterId: 'CHR-TEST1'
          }
        ])
      );
    service.updateManyAbilityScores(abilityScoresUpdate).subscribe({
      next(scores) {
        expect(scores.length).toBe(3);
        expect(scores).toContainEqual({
          id: 'ABL-TEST1',
          value: 10,
          name: 'Strength',
          characterId: 'CHR-TEST1'
        });
      },
      error(error) {
        throw new Error(error);
      },
      complete() {
        done();
      }
    });
  });
});
