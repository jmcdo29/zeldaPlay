import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@Auth/auth.module';
import { NoteController } from '@Character/note/note.controller';
import { NoteService } from '@Character/note/note.service';
import { Note } from '@Entity/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthModule],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
