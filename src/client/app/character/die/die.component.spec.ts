import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Character } from '#Models/character';
import { MaterialModule } from '#Shared/material/material.module';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { DieComponent } from './die.component';

describe('DieComponent', () => {
  let component: DieComponent;
  let fixture: ComponentFixture<DieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [DieComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieComponent);
    component = fixture.componentInstance;
    component.character = new CharacterDetailComponent(new MessageService());
    component.character.character = new Character();
    component.character.character.attributes[0].value = 8;
    component.mod = 'Strength';
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should make a roll', () => {
    do {
      component.roll(20);
    } while (!component.character.crit);
  });
  test('should roll without a mod', () => {
    component.mod = 'null';
    component.roll(20);
  });
  test('should roll max for all numbers', () => {
    const dieValues = [4, 6, 8, 10, 12, 100];
    for (const val of dieValues) {
      do {
        component.roll(val);
      } while (!component.character.maxDmg);
      component.character.maxDmg = false;
    }
  });
  test('should roll a crit miss', () => {
    do {
      component.roll(20);
    } while (!component.character.critMiss);
  });
});
