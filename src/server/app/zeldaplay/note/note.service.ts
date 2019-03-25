import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DbService } from '@Db/db.service';
import { DbNote } from '@DbModel/index';
import { map } from 'rxjs/operators';

@Injectable()
export class NoteService {
  constructor(private readonly dbService: DbService) {}

  getNotes(characterId: string): Observable<DbNote[]> {
    return this.dbService.query<DbNote>(
      `SELECT
        important as nImportant
        ,message as nMessage
        ,note_time as nNoteTime
      FROM zeldaplay.notes
      WHERE character_id = $1`,
      [characterId]
    );
  }

  saveNote(note: DbNote, charId: string): Observable<DbNote> {
    return this.dbService
      .query<DbNote>(
        `INSERT INTO zeldaplay.notes
      (important, message, note_time, character_id)
      RETURNING id as nId`,
        [note.nImportant, note.nMessage, note.nNoteTime, charId]
      )
      .pipe(map((notes) => notes[0]));
  }
}
