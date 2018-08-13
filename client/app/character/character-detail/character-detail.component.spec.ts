import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CharacterInventoryComponent } from '../character-inventory/character-inventory.component';
import { CharacterNotesComponent } from '../character-notes/character-notes.component';
import { CharacterSavesComponent } from '../character-saves/character-saves.component';
import { CharacterSkillsComponent } from '../character-skills/character-skills.component';
import { CharacterSpellComponent } from '../character-spell/character-spell.component';
import { CharacterWeaponComponent } from '../character-weapon/character-weapon.component';
import { DieComponent } from '../die/die.component';
import { CharacterDetailComponent } from './character-detail.component';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CharacterDetailComponent,
        DieComponent,
        CharacterNotesComponent,
        CharacterSavesComponent,
        CharacterSkillsComponent,
        CharacterSpellComponent,
        CharacterWeaponComponent,
        CharacterInventoryComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
