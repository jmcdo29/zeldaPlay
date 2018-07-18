import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterChartsComponent } from './character-charts.component';

describe('CharacterChartsComponent', () => {
  let component: CharacterChartsComponent;
  let fixture: ComponentFixture<CharacterChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
