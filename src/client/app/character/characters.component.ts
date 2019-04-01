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

  /**
   * Function that will call to the server to get the requested character.
   * Request retrieves saves, general stats, and skills
   * @param character Character that is selected
   */
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
  /**
   * Function to hide all character stats
   */
  hide(): void {
    this.selectedCharacter = null;
    this.newChar = false;
  }

  /**
   * Function to start new character creation process
   */
  newCharacter(): void {
    this.hide();
    this.newChar = true;
  }

  /**
   * Function to make request to server to retrieve all characters that belong to the specified user.
   * If no user is logged in, then get all the demo characters.
   */
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

  /**
   * Function to download the current character as a JSON file
   */
  download() {
    this.characterService.saveCharCopy(this.selectedCharacter);
  }

  /**
   * Function to call save to database for current character
   */
  save() {
    this.characterService
      .saveUpdateCharDb(this.selectedCharacter)
      .subscribe((characterRes) => {
        this.selectedCharacter = characterRes;
      });
    this.alertService.clear();
  }
}
