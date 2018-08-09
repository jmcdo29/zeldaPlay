import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSkillsComponent } from './character-skills.component';

describe('CharacterSkillsComponent', () => {
  let component: CharacterSkillsComponent;
  let fixture: ComponentFixture<CharacterSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSkillsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
