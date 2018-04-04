import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWeaponComponent } from './character-weapon.component';

describe('CharacterWeaponComponent', () => {
  let component: CharacterWeaponComponent;
  let fixture: ComponentFixture<CharacterWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
