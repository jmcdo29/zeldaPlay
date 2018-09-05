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

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('make Fortitude save with positive value', () => {
    component.character.getAttributes()[2].setValue(12);
    component.makeSave('Fortitude');
    expect(component.characterDetailComponent.roll).toBeTruthy();
  });
  test('make Fortitude save with negative value', () => {
    component.character.getSavingThrows()[0].setRacial(-11);
    component.character.getAttributes()[2].setValue(10);
    component.makeSave('Fortitude');
    expect(component.characterDetailComponent.roll).toBe('1');
  });
  test('change character', () => {
    component.character = new Character();
    component.ngOnChanges();
    expect(component.characterDetailComponent.roll).toBe('');
  });
});
