import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '#Environment/environment';
import { Note } from '#Models/note';
import { INoteDb } from '#Models/note.db';
import { AbstractService } from '#Shared/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends AbstractService {
  private noteURL = environment.apiUrl + '/character/note/';

  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * get all of the notes for a user and sort them into the
   * important and non-important note arrays
   * @param charId the character to get the notes for
   */
  getNotes(
    charId: string
  ): Observable<{ notes: Note[]; importantNotes: Note[] }> {
    return this.http.get<INoteDb[]>(this.noteURL + charId).pipe(
      map((inNote) => {
        const notes = { notes: [], importantNotes: [] };
        inNote.forEach((noteIn) => {
          if (noteIn.nImportant) {
            notes.importantNotes.push(
              new Note(
                noteIn.nId,
                noteIn.nMessage,
                noteIn.nNoteTime,
                noteIn.nImportant
              )
            );
          } else {
            notes.notes.push(
              new Note(
                noteIn.nId,
                noteIn.nMessage,
                noteIn.nNoteTime,
                noteIn.nImportant
              )
            );
          }
        });
        return notes;
      })
    );
  }

  /**
   * send a new note to the server and save the note's id to the original object
   * the note id is returned from the server
   * @param charId the character to save the note to
   * @param note the note being made
   */
  newNote(charId: string, note: Note): Observable<Note> {
    const noteReq = this.transform(note);
    return this.http
      .post<INoteDb>(
        this.noteURL + charId,
        { note: noteReq },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((retNote) => {
          note.id = retNote.nId;
          return note;
        })
      );
  }
}
