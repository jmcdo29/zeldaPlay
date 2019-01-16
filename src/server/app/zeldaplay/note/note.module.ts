import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@Auth/auth.module';
import { Note } from '@Entity/note.entity';
import { NoteController } from '@Note/note.controller';
import { NoteService } from '@Note/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthModule],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
