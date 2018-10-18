import { Component, Input, OnInit } from '@angular/core';

import { Character } from '#Models/character';
import { Note } from '#Models/note';
import { MessageService } from '#Shared/messages/message.service';
import { NoteService } from './note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input()
  character: Character;

  note: Note;
  notes: Note[] = [];
  newMsg: string;
  important: boolean;

  showNotes = [true, true];

  newNote = false;

  constructor(
    private readonly message: MessageService,
    private readonly noteService: NoteService
  ) {}

  ngOnInit() {
    if (
      this.character.getNotes().length === 0 &&
      this.character.getImportantNotes().length === 0
    ) {
      this.noteService
        .getNotes(this.character.getId())
        .subscribe((allNotes) => {
          allNotes.notes.forEach((regNote) => {
            this.character.addNote(regNote);
          });
          allNotes.importantNotes.forEach((impNote) => {
            this.character.addImportantNote(impNote);
          });
        });
    }
  }

  addNote(): void {
    this.note = new Note(
      undefined,
      this.newMsg,
      new Date(Date.now())
        .toLocaleString()
        .split(' ')[1]
        .toString(),
      this.important
    );
    if (sessionStorage.getItem('currentUser')) {
      this.noteService
        .newNote(this.character.getId(), this.note)
        .subscribe((retNote) => {
          this.note = retNote;
        });
    }
    console.log(this.note);
    if (this.important) {
      this.character.addImportantNote(this.note);
    } else {
      this.character.addNote(this.note);
    }
    this.newMsg = '';
    this.important = false;
  }

  makeNewNote(): void {
    this.newNote = !this.newNote;
  }

  expandNotes(index: number): void {
    this.showNotes[index] = !this.showNotes[index];
  }
}
