import { Component, OnInit } from '@angular/core';
import { Character } from '../_models/character';
import { CharacterService } from '../_services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[];

  selectedCharacter: Character;
  newChar: boolean;

  onSelect(character: Character): void {
    this.selectedCharacter = character;
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

  constructor(private characterService: CharacterService) {}

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
    this.characterService.saveChar(this.selectedCharacter);
  }

}
