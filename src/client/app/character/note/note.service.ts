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
  private noteURL = environment.apiUrl + '/character/note/';

  constructor(private readonly http: HttpClient) {}

  // get all of the notes for a user and sort them into the
  // important and non-important note arrays
  getNotes(
    charId: string
  ): Observable<{ notes: Note[]; importantNotes: Note[] }> {
    return this.http.get<INoteDb[]>(this.noteURL + charId).pipe(
      map((inNote) => {
        const notes = { notes: [], importantNotes: [] };
        inNote.forEach((noteIn) => {
          if (noteIn.important) {
            notes.importantNotes.push(
              new Note(noteIn.id, noteIn.message, noteIn.time, noteIn.important)
            );
          } else {
            notes.notes.push(
              new Note(noteIn.id, noteIn.message, noteIn.time, noteIn.important)
            );
          }
        });
        return notes;
      })
    );
  }

  // send a new note to the server and save the note's id to the original object
  // the note id is returned from the server
  newNote(charId: string, note: Note): Observable<Note> {
    return this.http
      .post<INoteDb>(
        this.noteURL + charId,
        { note },
        {
          headers: {
            authorization: 'Bearer ' + sessionStorage.getItem('userToken')
          }
        }
      )
      .pipe(
        map((retNote) => {
          note.setId(retNote.id);
          return note;
        })
      );
  }
}
