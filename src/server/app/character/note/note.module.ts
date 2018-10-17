import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NoteController } from '@Character/note/note.controller';
import { NoteService } from '@Character/note/note.service';
import { Note } from '@Entity/note.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Note])
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
