import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { CharacterSavesComponent } from './character-saves.component';

describe('CharacterSavesComponent', () => {
  let component: CharacterSavesComponent;
  let fixture: ComponentFixture<CharacterSavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterSavesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSavesComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
