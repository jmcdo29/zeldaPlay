import { Component, Input, OnInit } from '@angular/core';

import { Character } from '#Models/character';
import { Note } from '#Models/note';
import { MessageService } from '#Shared/messages/message.service';

@Component({
  selector: 'app-character-notes',
  templateUrl: './character-notes.component.html',
  styleUrls: ['./character-notes.component.scss']
})
export class CharacterNotesComponent implements OnInit {
  @Input()
  character: Character;

  note: Note;
  notes: Note[] = [];
  newMsg: string;
  important: boolean;

  showNotes = [true, true];

  newNote = false;

  constructor(public message: MessageService) {}

  ngOnInit() {
    this.notes = this.character.getNotes();
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
