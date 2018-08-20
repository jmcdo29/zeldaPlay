import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { Character } from '../characterModels/character';
import { CharacterSavesComponent } from './character-saves.component';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('CharacterSavesComponent', () => {
  let component: CharacterSavesComponent;
  let fixture: ComponentFixture<CharacterSavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterSavesComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSavesComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    component.characterDetailComponent = new CharacterDetailComponent(
      messageServiceStub as MessageService
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('make Will save with positive value', () => {
    component.character.savingThrows[2] = {
      name: 'Will',
      modifier: 'Wisdom',
      racial: 0
    };
    component.character.attributes[4] = {
      name: 'Wisdom',
      value: 10,
      modifier: 0
    };
    component.makeSave('Will');
    expect(component.characterDetailComponent.roll).toBeTruthy();
  });
  test('make Will save with negative value', () => {
    component.character.savingThrows[2] = {
      name: 'Will',
      modifier: 'Wisdom',
      racial: -11
    };
    component.character.attributes[4] = {
      name: 'Wisdom',
      value: 10,
      modifier: -11
    };
    component.makeSave('Will');
    expect(component.characterDetailComponent.roll).toBe('1');
  });
  test('change character', () => {
    component.character = new Character();
    component.ngOnChanges();
    expect(component.characterDetailComponent.roll).toBe('');
  });
});
