import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../Character/character';
import { Note } from '../Character/note';
import { MessageService } from '../message.service';
import { httpInMemBackendServiceFactory } from 'angular-in-memory-web-api';
import { methods } from '../Character/character-methods';

@Component({
  selector: 'app-character-notes',
  templateUrl: './character-notes.component.html',
  styleUrls: ['./character-notes.component.css']
})
export class CharacterNotesComponent implements OnInit {

  @Input() character: Character;

  note: Note;
  notes: Note[] = [];
  newMsg: String;
  important: Boolean;
  show = false;

  newNote = false;

  constructor(public message: MessageService) { }

  ngOnInit() {
    this.notes = this.character.notes;
  }

  addNote(): void {
    this.note = new Note();
    this.note.time = methods.getDateString();
    this.note.msg = this.newMsg;
    this.note.important = this.important;
    if (this.important) {
      this.character.importantNotes.push(this.note);
    } else {
      this.character.notes.push(this.note);
    }
  }

  expandNotes(): void {
    this.show = !this.notes;
  }

  makeNewNote(): void {
    this.newNote = !this.newNote;
  }

}
