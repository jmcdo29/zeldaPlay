import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { CharacterService } from './character.service';
import { Character } from './characterModels/character';
import { Magics } from './characterModels/enums/magic-skills.enum';
import { Skills } from './characterModels/enums/skills.enum';
import { Weapons } from './characterModels/enums/weapon-skills.enum';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  selectedCharacter: Character;
  newChar: boolean;
  loggedIn = false;
  loading = false;

  onSelect(character: Character): void {
    if (character.id) {
      this.selectedCharacter = null;
      this.loading = true;
      this.characterService.getCharacter(character.id).subscribe((data) => {
        this.selectedCharacter = data;
        this.loading = false;
      });
      this.newChar = false;
    }
  }
  hide(): void {
    this.selectedCharacter = null;
    this.newChar = false;
  }

  newCharacter(): void {
    this.hide();
    this.newChar = true;
  }

  constructor(
    private characterService: CharacterService,
    private alertService: AlertService
  ) {}

  getCharacters(): void {
    this.loading = true;
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && currentUser !== 'undefined') {
      this.characterService
        .getUserCharacters(currentUser)
        .subscribe((characters) => {
          this.characters = characters;
          this.loading = false;
          if (this.characters.length === 0) {
            this.alertService.success(
              'You have no characters. Create one using the button below!'
            );
          }
        });
    } else {
      this.characterService.getCharacters().subscribe((characters) => {
        this.characters = characters;
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('currentUser') ? true : false;
    this.getCharacters();
    if (this.characters.length === 0) {
      this.characters = [];
    }
  }

  download() {
    this.characterService.saveCharCopy(this.selectedCharacter);
  }

  save() {
    this.characterService
      .saveCharDb(this.selectedCharacter)
      .subscribe((characterRes) => {
        this.selectedCharacter.id = characterRes.id;
        for (const skill of characterRes.skills) {
          if (skill.skill_type === 'skill') {
            this.selectedCharacter.skills[Skills[skill.name]].id = skill.id;
          } else if (skill.skill_type === 'weapon') {
            this.selectedCharacter.weaponSkills[Weapons[skill.name]].id =
              skill.id;
          } else {
            this.selectedCharacter.magicSkills[Magics[skill.name]].id =
              skill.id;
          }
        }
        for (const weapon of characterRes.weapons) {
          this.selectedCharacter.weapons[
            findObjectPartial(
              this.selectedCharacter.weapons,
              'name',
              weapon.name
            )
          ].id = weapon.id;
        }
        for (const spell of characterRes.spells) {
          this.selectedCharacter.spells[
            findObjectPartial(this.selectedCharacter.spells, 'name', spell.name)
          ].id = spell.id;
        }
        for (const save of characterRes.saves) {
          this.selectedCharacter.savingThrows[
            findObjectPartial(
              this.selectedCharacter.savingThrows,
              'name',
              save.name
            )
          ].id = save.id;
        }
        for (const note of characterRes.notes) {
          if (note.important) {
            this.selectedCharacter.importantNotes[
              findObjectPartial(
                this.selectedCharacter.importantNotes,
                'msg',
                note.message
              )
            ].id = note.id;
          } else {
            this.selectedCharacter.notes[
              findObjectPartial(
                this.selectedCharacter.notes,
                'msg',
                note.message
              )
            ].id = note.id;
          }
        }
      });
  }
}

function findObjectPartial(array: any[], key: string, value: string): number {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
}
