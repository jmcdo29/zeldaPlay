import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbQuestion } from '@Db/models';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionService {
  constructor(private readonly db: DbService) {}

  getQuestions(): Observable<DbQuestion[]> {
    return this.db.query<DbQuestion>(
      'SELECT question as "qQuestion" FROM zeldaplay.questions',
      []
    );
  }
}
