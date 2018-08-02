import { Component, OnInit } from '@angular/core';
import { Character } from './characterModels/character';
import { CharacterService } from './character.service';
import { AlertService } from '../alert/alert.service';

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
    this.selectedCharacter = null;
    this.loading = true;
    this.characterService.getCharacter(character.id).subscribe(data => {
      this.selectedCharacter = data;
      this.loading = false;
    });
    this.newChar = false;
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
    if (currentUser && currentUser !== 'undefined' ) {
      this.characterService
        .getUserCharacters(currentUser)
        .subscribe(characters => {
          this.characters = characters;
          this.loading = false;
          if (this.characters.length === 0) {
            this.alertService.success('You have no characters. Create one using the button below!');
          }
        });
    } else {
      this.characterService.getCharacters().subscribe(characters => {
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
    this.characterService.saveCharDb(this.selectedCharacter).subscribe(characterRes => {
      this.selectedCharacter.id = characterRes;
    });
  }
}
