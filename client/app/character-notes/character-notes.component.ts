import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../_models/character';
import { Note } from '../_models/note';
import { MessageService } from '../_services/message.service';
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
  newMsg: string;
  important: boolean;

  showNotes = [true, true];

  newNote = false;

  constructor(public message: MessageService) { }

  ngOnInit() {
    this.notes = this.character.notes;
  }

  addNote(): void {
    this.note = new Note();
    this.note.time = methods.getDateString().split(' ')[0];
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
    console.log(index, this.showNotes[index]);
  }

}
