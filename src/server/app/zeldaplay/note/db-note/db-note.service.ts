import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbNote } from '@DbModel/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DbNoteService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  getNotes(charId: string): Observable<DbNote[]> {
    return this.dbService.query<DbNote>(
      `SELECT
        important as nImportant
        ,message as nMessage
        ,note_time as nNoteTime
      FROM ${this.schema}.notes
      WHERE character_id = $1`,
      [charId]
    );
  }

  saveNote(note: DbNote, charId: string): Observable<DbNote> {
    return this.dbService
      .query<DbNote>(
        `INSERT INTO ${this.schema}.notes
      (important, message, note_time, character_id)
      RETURNING id as nId`,
        [note.nImportant, note.nMessage, note.nNoteTime, charId]
      )
      .pipe(map((notes) => notes[0]));
  }
}
