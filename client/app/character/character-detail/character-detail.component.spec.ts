import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Character } from '../characterModels/character';
import { CharacterDetailComponent } from './character-detail.component';

@Component({ selector: 'app-character-skills', template: '' })
class CharacterSkillsStubComponent {
  @Input()
  character;
}

// tslint:disable:max-classes-per-file
@Component({ selector: 'app-character-weapon', template: '' })
class CharacterWeaponsStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-character-spell', template: '' })
class CharacterSpellsStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-character-inventory', template: '' })
class CharacterInventoryStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-character-notes', template: '' })
class CharacterNotesStubComponent {
  @Input()
  character;
}

@Component({ selector: 'app-character-saves', template: '' })
class CharacterSavesStubComponent {
  @Input()
  character;
  @Input()
  characterDetailComponent;
}

@Component({ selector: 'app-die', template: '' })
class DieStubComponent {
  @Input()
  sides;
  @Input()
  character;
  @Input()
  mod;
}

@Component({ selector: 'app-character-level-up', template: '' })
class CharacterLevelUpStubComponent {
  @Input()
  currChar;
}

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CharacterDetailComponent,
        CharacterInventoryStubComponent,
        CharacterNotesStubComponent,
        CharacterSkillsStubComponent,
        CharacterSpellsStubComponent,
        CharacterWeaponsStubComponent,
        DieStubComponent,
        CharacterSavesStubComponent,
        CharacterLevelUpStubComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    component.character = new Character();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
