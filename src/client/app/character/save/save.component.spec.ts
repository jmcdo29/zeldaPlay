import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { SharedModule } from '#Shared/shared.module';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { SaveComponent } from './save.component';

const messageServiceStub: Partial<MessageService> = {
  add(message) {
    return message;
  }
};

describe('SaveComponent', () => {
  let component: SaveComponent;
  let fixture: ComponentFixture<SaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [SaveComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComponent);
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
    component.character.getSavingThrows()[0].setRacial(-30);
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
