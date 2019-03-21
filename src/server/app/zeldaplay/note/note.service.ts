import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbNote } from '@DbModel/index';
import { DbNoteService } from './db-note/db-note.service';

@Injectable()
export class NoteService {
  constructor(private readonly dbService: DbNoteService) {}

  getNotes(characterId: string): Observable<DbNote[]> {
    return this.dbService.getNotes(characterId);
  }

  saveNote(inNote: DbNote, charId: string): Observable<DbNote> {
    return this.dbService.saveNote(inNote, charId);
  }
}
