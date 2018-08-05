import { Component, OnInit } from '@angular/core';
import { Character } from './characterModels/character';
import { CharacterService } from './character.service';
import { AlertService } from '../alert/alert.service';
import { Skills } from './characterModels/enums/skills.enum';
import { Weapons } from './characterModels/enums/weapon-skills.enum';
import { Magics } from './characterModels/enums/magic-skills.enum';

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
        console.log(characterRes);
        this.selectedCharacter.id = characterRes.id;
        if (characterRes.skills) {
          characterRes.skills.forEach((skill) => {
            if (skill.skill_type === 'skill') {
              this.selectedCharacter.skills[Skills[skill.name]].id = skill.id;
            } else if (skill.skill_type === 'weapon') {
              this.selectedCharacter.weaponSkills[Weapons[skill.name]].id =
                skill.id;
            } else {
              this.selectedCharacter.magicSkills[Magics[skill.name]].id =
                skill.id;
            }
          });
        }
        if (characterRes.weapons) {
          characterRes.weapons.forEach((weapon) => {
            this.selectedCharacter.weapons[
              findObjectPartial(
                this.selectedCharacter.weapons,
                'name',
                weapon.name
              )
            ].id =
              weapon.id;
          });
        }
        if (characterRes.spells) {
          characterRes.spells.forEach((spell) => {
            this.selectedCharacter.spells[
              findObjectPartial(
                this.selectedCharacter.spells,
                'name',
                spell.name
              )
            ].id =
              spell.id;
          });
        }
        if (characterRes.saves) {
          characterRes.saves.forEach((save) => {
            this.selectedCharacter.savingThrows[
              findObjectPartial(
                this.selectedCharacter.savingThrows,
                'name',
                save.name
              )
            ].id =
              save.id;
          });
        }
        if (characterRes.notes) {
          characterRes.notes.forEach((note) => {
            if (note.important) {
              this.selectedCharacter.importantNotes[
                findObjectPartial(
                  this.selectedCharacter.importantNotes,
                  'msg',
                  note.message
                )
              ].id =
                note.id;
            } else {
              this.selectedCharacter.notes[
                findObjectPartial(
                  this.selectedCharacter.notes,
                  'msg',
                  note.message
                )
              ].id =
                note.id;
            }
          });
        }
      });
  }
}

function findObjectPartial(array, key, value): number {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      index = i;
      break;
    }
  }
  return index;
}
