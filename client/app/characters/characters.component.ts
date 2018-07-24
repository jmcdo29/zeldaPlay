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

  onSelect(character: Character): void {
    this.characterService.getCharacter(character.id).subscribe(data => {
      console.log(data);
      this.selectedCharacter = data;
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

  constructor(private router: Router, private characterService: CharacterService) {}

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => {
        this.characters = characters;
      });
  }

  ngOnInit() {
    this.getCharacters();
    if (this.characters.length === 0) {
      this.characters = [];
    }
  }

  save() {
    this.characterService.saveCharCopy(this.selectedCharacter);
  }

}
