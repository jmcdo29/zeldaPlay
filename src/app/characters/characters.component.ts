import { Component, OnInit } from "@angular/core";
import { Character } from "../character";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"]
})
export class CharactersComponent implements OnInit {

  selectedCharacter: Character;

  onSelect(character : Character): void {
    this.selectedCharacter = character;
  }
  hide():void{
    this.selectedCharacter = null;
  }
  
  characters: Character[] = [
    {
      name: "Bryte",
      strength: 10,
      dexterity: 14,
      constitution: 12,
      intelligence: 12,
      wisdom: 24,
      charisma: 14,
      health: 83,
      magic: 47,
      exp: 6510
    },
    {
      name: "Shyne",
      strength: 16,
      dexterity: 20,
      constitution: 16,
      intelligence: 28,
      wisdom: 36,
      charisma: 20,
      health: 106,
      magic: 106,
      exp: 109735
    }
  ];

  constructor() {}

  ngOnInit() {}
}
