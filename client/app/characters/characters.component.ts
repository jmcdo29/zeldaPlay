import { Component, OnInit } from '@angular/core';
import { Character } from '../_models/character';
import { CharacterService } from '../_services/character.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';

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
    console.log('loading:', this.loading);
    this.characterService.getCharacter(character.id).subscribe(data => {
      console.log(data);
      this.selectedCharacter = data;
      this.loading = false;
      console.log('loading:', this.loading);
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
    private router: Router,
    private characterService: CharacterService,
    private alertService: AlertService
  ) {}

  getCharacters(): void {
    this.loading = true;
    console.log('loading:', this.loading);
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
          console.log('loading:', this.loading);
        });
    } else {
      this.characterService.getCharacters().subscribe(characters => {
        this.characters = characters;
        this.loading = false;
        console.log('loading:', this.loading);
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
    this.characterService.saveCharDb(this.selectedCharacter).subscribe();
  }
}
