import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbQuestion } from '@Db/models';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getQuestions(): Observable<DbQuestion[]> {
    return this.questionService.getQuestions();
  }
}
