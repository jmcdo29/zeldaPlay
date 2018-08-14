import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../../shared/messages/message.service';
import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { CharacterWeaponComponent } from './character-weapon.component';

let messageServiceStub: Partial<MessageService>;

messageServiceStub = {};

describe('CharacterWeaponComponent', () => {
  let component: CharacterWeaponComponent;
  let fixture: ComponentFixture<CharacterWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterWeaponComponent],
      providers: [{ provide: MessageService, useValue: messageServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterWeaponComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
