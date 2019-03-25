import { Module } from '@nestjs/common';

import { NoteController } from '@Note/note.controller';
import { NoteService } from '@Note/note.service';
import { SharedServerModule } from '@Shared/shared.module';

@Module({
  imports: [SharedServerModule],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteServerModule {}
