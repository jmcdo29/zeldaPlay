import { Module } from '@nestjs/common';
import { SharedServerModule } from '@Shared/shared.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [SharedServerModule],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
