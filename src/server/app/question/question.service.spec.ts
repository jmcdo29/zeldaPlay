import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { DbService } from '@Db/db.service';
import { QuestionService } from './question.service';

const mockRepo = {
  query: jest.fn().mockReturnValue(of([]))
};

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: DbService,
          useValue: mockRepo
        }
      ]
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should work for getAllQuestions', () => {
    service.getQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
    });
  });
});
