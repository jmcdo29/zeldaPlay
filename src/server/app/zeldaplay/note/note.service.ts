import { Injectable } from '@nestjs/common';

import { DbNote } from '@DbModel/db_note.model';
import { DbNoteService } from './db-note/db-note.service';

@Injectable()
export class NoteService {
  constructor(private readonly dbService: DbNoteService) {}

  async getNotes(characterId: string): Promise<DbNote[]> {
    return this.dbService.getNotes(characterId);
  }

  async saveNote(inNote: DbNote, charId: string): Promise<DbNote> {
    return this.dbService.saveNote(inNote, charId);
  }
}
