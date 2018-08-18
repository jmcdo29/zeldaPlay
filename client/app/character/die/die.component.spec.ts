import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageService } from '../../shared/messages/message.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { Character } from '../characterModels/character';
import { DieComponent } from './die.component';

describe('DieComponent', () => {
  let component: DieComponent;
  let fixture: ComponentFixture<DieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DieComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieComponent);
    component = fixture.componentInstance;
    component.character = new CharacterDetailComponent(new MessageService());
    component.character.character = new Character();
    component.character.character.attributes[0].modifier = -1;
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
  test('should roll with a mod', () => {
    component.roll(20);
  });
  test('should roll max for 4', () => {
    do {
      component.roll(4);
    } while (!component.character.maxDmg);
  });
  test('should roll max for 6', () => {
    do {
      component.roll(6);
    } while (!component.character.maxDmg);
  });
  test('should roll max for 8', () => {
    do {
      component.roll(8);
    } while (!component.character.maxDmg);
  });
  test('should roll max for 12', () => {
    component.mod = '';
    do {
      component.roll(12);
    } while (!component.character.maxDmg);
  });
  test('should roll a crit miss', () => {
    do {
      component.roll(20);
    } while (!component.character.critMiss);
  });
});
