import { Component, OnInit } from '@angular/core';

import { AlertService } from '#Alert/alert.service';
import { Character } from '#Models/character';
import { NavBarService } from '#Shared/nav-bar.service';
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

  constructor(
    private characterService: CharacterService,
    private alertService: AlertService,
    private readonly navBarService: NavBarService
  ) {}

  ngOnInit() {
    this.navBarService.navigate({ page: 'character' });
    this.loggedIn = !!sessionStorage.getItem('currentUser');
    this.getCharacters();
    if (this.characters.length === 0) {
      this.characters = [];
    }
  }

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

  getCharacters(): void {
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

  download() {
    this.characterService.saveCharCopy(this.selectedCharacter);
  }

  save() {
    this.characterService
      .saveUpdateCharDb(this.selectedCharacter)
      .subscribe((characterRes) => {
        this.selectedCharacter = characterRes;
      });
    this.alertService.clear();
  }
}
