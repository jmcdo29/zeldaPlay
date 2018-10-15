import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note } from '@Entity/note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
