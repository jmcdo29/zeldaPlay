import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { Note } from '#Models/note';
import { INoteDb } from '#Models/note.db';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private readonly http: HttpClient) {}

  getNotes(
    charId: string
  ): Observable<{ notes: Note[]; importantNotes: Note[] }> {
    return this.http
      .get<INoteDb[]>(environment.apiUrl + '/character/note/' + charId)
      .pipe(
        map((inNote) => {
          const notes = { notes: [], importantNotes: [] };
          inNote.forEach((noteIn) => {
            if (noteIn.important) {
              notes.importantNotes.push(
                new Note(
                  noteIn.id,
                  noteIn.message,
                  noteIn.time,
                  noteIn.important
                )
              );
            } else {
              notes.notes.push(
                new Note(
                  noteIn.id,
                  noteIn.message,
                  noteIn.time,
                  noteIn.important
                )
              );
            }
          });
          return notes;
        })
      );
  }
}
