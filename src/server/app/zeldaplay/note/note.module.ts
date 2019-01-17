import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note } from '@Entity/note.entity';
import { NoteController } from '@Note/note.controller';
import { NoteService } from '@Note/note.service';
import { SharedModule } from '@Shared/shared.module';
import { DbNoteService } from './db-note/db-note.service';


@Module({
  imports: [TypeOrmModule.forFeature([Note]), SharedModule],
  controllers: [NoteController],
  providers: [NoteService, DbNoteService]
})
export class NoteModule {}
