import { Test, TestingModule } from '@nestjs/testing';
import {
  AbilityScore,
  AbilityScoreInput,
  AbilityScoreUpdate
} from '@tabletop-companion/api-interface';
import { of } from 'rxjs';
import { AbilityScoreResolver } from './ability-score.resolver';
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
const abilityScoreInput: AbilityScoreInput = {
  name: 'Strength',
  value: 12,
  characterId: charId
};
const abilityScoreUpdate: AbilityScoreUpdate = {
  value: 10,
  id: 'ABL-TEST1'
};

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

describe('AbilityScoreResolver', () => {
  let resolver: AbilityScoreResolver;
  let service: AbilityScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbilityScoreResolver,
        {
          provide: AbilityScoreService,
          useValue: {
            getAbilityScoresByCharId: jest
              .fn()
              .mockReturnValueOnce(of(abilityScores)),
            getAbilityScoreById: jest
              .fn()
              .mockReturnValueOnce(of(abilityScore)),
            insertManyAbilityScores: jest
              .fn()
              .mockReturnValueOnce(of(abilityScores)),
            insertOneAbilityScore: jest
              .fn()
              .mockReturnValueOnce(of(abilityScore)),
            updateOneAbilityScore: jest
              .fn()
              .mockReturnValueOnce(of(abilityScore)),
            updateManyAbilityScores: jest
              .fn()
              .mockReturnValueOnce(of(abilityScores))
          }
        }
      ]
    }).compile();

    resolver = module.get<AbilityScoreResolver>(AbilityScoreResolver);
    service = module.get<AbilityScoreService>(AbilityScoreService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should get the ability scores for one character', (done) => {
    resolver
      .getAbilityScoresByCharacterId({ id: charId })
      .subscribe(abilityScoresObserver(done));
  });
  it('should get one ability score', (done) => {
    resolver
      .getAbilityScoreById({ id: 'ABL-TEST1' })
      .subscribe(abilityScoreObserver(done));
  });
  it('should insert multiple ability scores', (done) => {
    resolver
      .insertManyAbilityScores([
        abilityScoreInput,
        abilityScoreInput,
        abilityScoreInput
      ])
      .subscribe(abilityScoresObserver(done));
  });
  it('should insert one ability score', (done) => {
    resolver
      .insertOneAbilityScore(abilityScoreInput)
      .subscribe(abilityScoreObserver(done));
  });
  it('should update one ability score', (done) => {
    resolver
      .updateOneAbilityScore(abilityScoreUpdate)
      .subscribe(abilityScoreObserver(done));
  });
  it('should update many ability scores', (done) => {
    resolver
      .updateManyAbilityScores([
        abilityScoreUpdate,
        abilityScoreUpdate,
        abilityScoreUpdate
      ])
      .subscribe(abilityScoresObserver(done));
  });
});
