import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '../characterModels/character';
import { CharacterLevelUpComponent } from './character-level-up.component';

describe('CharacterLevelUpComponent', () => {
  let component: CharacterLevelUpComponent;
  let fixture: ComponentFixture<CharacterLevelUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CharacterLevelUpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLevelUpComponent);
    component = fixture.componentInstance;
    component.currChar = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
