import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSavesComponent } from './character-saves.component';

describe('CharacterSavesComponent', () => {
  let component: CharacterSavesComponent;
  let fixture: ComponentFixture<CharacterSavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSavesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
