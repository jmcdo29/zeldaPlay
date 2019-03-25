import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

const mockQuestionService = {
  getQuestions: jest.fn().mockReturnValue(of([]))
};

describe('Question Controller', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: mockQuestionService
        }
      ]
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should work for getAll', () => {
    controller.getQuestions().subscribe((questions) => {
      expect(questions).toEqual([]);
    });
  });
});
