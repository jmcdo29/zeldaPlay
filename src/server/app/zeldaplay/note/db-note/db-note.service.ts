import { Injectable } from '@nestjs/common';

import { DbService } from '@Db/db.service';
import { DbNote } from '@DbModel/index';

@Injectable()
export class DbNoteService {
  private schema: string;

  constructor(private readonly dbService: DbService) {
    this.schema = 'zeldaplay';
  }

  async getNotes(charId: string): Promise<DbNote[]> {
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

  async saveNote(note: DbNote, charId: string): Promise<DbNote> {
    const notes = await this.dbService.query<DbNote>(
      `INSERT INTO ${this.schema}.notes
      (important, message, note_time, character_id)
      RETURNING id as nId`,
      [note.nImportant, note.nMessage, note.nNoteTime, charId]
    );
    return notes[0];
  }
}
