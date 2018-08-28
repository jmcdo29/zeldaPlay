import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../shared/messages/message.service';
import { Character } from '../characterModels/character';
import { CharacterNotesComponent } from './character-notes.component';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('CharacterNotesComponent', () => {
  let component: CharacterNotesComponent;
  let fixture: ComponentFixture<CharacterNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CharacterNotesComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterNotesComponent);
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
      expect(component.notes).toHaveLength(1);
      component.character.notes.pop();
    });
    test('make new important note', () => {
      component.newMsg = 'my important message';
      component.important = true;
      component.addNote();
      expect(component.character.importantNotes).toHaveLength(1);
      component.notes.pop();
    });
  });
});
