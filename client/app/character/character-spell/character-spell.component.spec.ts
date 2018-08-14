import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AlertService } from '../../alert/alert.service';
import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { CharacterSpellComponent } from './character-spell.component';

const alertServiceStub: Partial<AlertService> = {};
const messageServiceStub: Partial<MessageService> = {};


describe('CharacterSpellComponent', () => {
  let component: CharacterSpellComponent;
  let fixture: ComponentFixture<CharacterSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, HttpClientModule],
      declarations: [CharacterSpellComponent],
      providers: [
        {provide: AlertService, useValue: alertServiceStub},
        {provide: MessageService, useValue: messageServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
