import { Component, OnInit } from '@angular/core';
import { Character } from '../Character/character';
import { CharacterService } from '../character.service';

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
  calcMod(stat: number): number {
    return stat % 2 === 0 ? (stat - 10) / 2 : (stat - 11) / 2;
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
        console.log(this.characters);
        console.log(typeof this.characters[0]);
      });
  }

  ngOnInit() {
    this.getCharacters();
  }

}
