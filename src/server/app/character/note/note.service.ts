import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from '@Entity/note.entity';

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

  async saveNote(inNote: Note, charId: string): Promise<Note> {
    inNote.character.id = charId;
    return this.noteRepo.save(inNote);
  }
}
