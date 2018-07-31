import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSpellComponent } from './character-spell.component';

describe('CharacterSpellComponent', () => {
  let component: CharacterSpellComponent;
  let fixture: ComponentFixture<CharacterSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
