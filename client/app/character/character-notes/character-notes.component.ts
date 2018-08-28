import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from '../../shared/messages/message.service';
import { Character } from '../characterModels/character';
import { Note } from '../characterModels/note';

@Component({
  selector: 'app-character-notes',
  templateUrl: './character-notes.component.html',
  styleUrls: ['./character-notes.component.css']
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
    this.notes = this.character.notes;
  }

  addNote(): void {
    this.note = new Note();
    this.note.time = new Date(Date.now()).toLocaleString().split(' ')[1];
    this.note.msg = this.newMsg;
    this.note.important = this.important;
    if (this.important) {
      this.character.importantNotes.unshift(this.note);
    } else {
      this.character.notes.unshift(this.note);
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
