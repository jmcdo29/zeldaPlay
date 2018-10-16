import { Component, OnInit } from '@angular/core';

import { AlertService } from '#Alert/alert.service';
import { Magics } from '#Enums/magic-skills.enum';
import { Skills } from '#Enums/skills.enum';
import { Weapons } from '#Enums/weapon-skills.enum';
import { Character } from '#Models/character';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  selectedCharacter: Character;
  newChar: boolean;
  loggedIn = false;
  loading = false;

  onSelect(character: Character): void {
    if (character.getId()) {
      this.selectedCharacter = null;
      this.loading = true;
      this.characterService
        .getCharacter(character.getId())
        .subscribe((data) => {
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
    console.log(this.loggedIn);
    this.loading = true;
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser && currentUser !== 'undefined') {
      this.characterService
        .getUserCharacters(currentUser)
        .subscribe((characters) => {
          this.characters = characters;
          this.loading = false;
          if (characters.length === 0) {
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
    this.loggedIn = sessionStorage.getItem('currentUser') ? true : false;
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
        this.selectedCharacter.setId(characterRes.id);
        for (const skill of characterRes.skills) {
          if (skill.skill_type === 'skill') {
            this.selectedCharacter
              .getSkills()
              [Skills[skill.name]].setId(skill.id);
          } else if (skill.skill_type === 'weapon') {
            this.selectedCharacter
              .getWeaponSkills()
              [Weapons[skill.name]].setId(skill.id);
          } else {
            this.selectedCharacter
              .getMagicSkills()
              [Magics[skill.name]].setId(skill.id);
          }
        }
        for (const weapon of characterRes.weapons) {
          this.selectedCharacter
            .getWeapons()
            [
              findObjectPartial(
                this.selectedCharacter.getWeapons(),
                'name',
                weapon.name
              )
            ].setId(weapon.id);
        }
        for (const spell of characterRes.spells) {
          this.selectedCharacter
            .getSpells()
            [
              findObjectPartial(
                this.selectedCharacter.getSpells(),
                'name',
                spell.name
              )
            ].setId(spell.id);
        }
        for (const save of characterRes.saves) {
          this.selectedCharacter
            .getSavingThrows()
            [
              findObjectPartial(
                this.selectedCharacter.getSavingThrows(),
                'name',
                save.name
              )
            ].setId(save.id);
        }
        for (const note of characterRes.notes) {
          if (note.important) {
            this.selectedCharacter
              .getImportantNotes()
              [
                findObjectPartial(
                  this.selectedCharacter.getImportantNotes(),
                  'msg',
                  note.message
                )
              ].setId(note.id);
          } else {
            this.selectedCharacter
              .getNotes()
              [
                findObjectPartial(
                  this.selectedCharacter.getNotes(),
                  'msg',
                  note.message
                )
              ].setId(note.id);
          }
        }
      });
    this.alertService.clear();
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
