import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { Character } from '../characterModels/character';
import { CharacterSkillsComponent } from './character-skills.component';

describe('CharacterSkillsComponent', () => {
  let component: CharacterSkillsComponent;
  let fixture: ComponentFixture<CharacterSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [CharacterSkillsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillsComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
