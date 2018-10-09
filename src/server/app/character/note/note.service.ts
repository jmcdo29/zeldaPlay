import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from '../../entities/note.entity';
import { NoteDTO } from './interfaces/note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepo: Repository<Note>
  ) {}

  async getNotes(characterId: string): Promise<Note[]> {
    return this.noteRepo.find({
      where: {
        character: { id: characterId }
      }
    });
  }

  async saveNote(inNote: NoteDTO, charId: string): Promise<Note> {
    const note = await this.noteRepo.create(inNote);
    note.character.id = charId;
    return this.noteRepo.save(note);
  }
}
