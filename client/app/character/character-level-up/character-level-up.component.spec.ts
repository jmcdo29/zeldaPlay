import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLevelUpComponent } from './character-level-up.component';

describe('CharacterLevelUpComponent', () => {
  let component: CharacterLevelUpComponent;
  let fixture: ComponentFixture<CharacterLevelUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterLevelUpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLevelUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
