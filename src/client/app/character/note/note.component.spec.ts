import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { NoteComponent } from './note.component';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NoteComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle functions', () => {
    test('expand notes', () => {
      const originals = [];
      for (const show of component.showNotes) {
        originals.push(show);
      }
      for (let i = 0; i < component.showNotes.length; i++) {
        component.expandNotes(i);
        expect(component.showNotes[i]).not.toBe(originals[i]);
      }
    });
    test('makeNewNote', () => {
      const newNote = component.newNote;
      component.makeNewNote();
      expect(component.newNote).not.toBe(newNote);
      component.makeNewNote();
      expect(component.newNote).toBe(newNote);
    });
  });

  describe('adding notes', () => {
    test('make new regular note', () => {
      component.newMsg = 'my message';
      component.important = false;
      component.addNote();
      expect(component.character.getNotes()).toHaveLength(1);
      component.character.getNotes().pop();
    });
    test('make new important note', () => {
      component.newMsg = 'my important message';
      component.important = true;
      component.addNote();
      expect(component.character.getImportantNotes()).toHaveLength(1);
      component.notes.pop();
    });
  });
});
