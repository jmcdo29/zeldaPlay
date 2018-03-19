import { Component, Input, OnInit } from "@angular/core";
import { CharactersComponent } from "../characters/characters.component";
import { Character } from "../character";
import { Attribute } from "../attribute";
import { Hylian } from "../Races/Hylian";
import { Goron } from "../Races/Goron";
import { Zora } from "../Races/Zora";
import { Gerudo } from "../Races/Gerudo";
import { Sheikah } from "../Races/Sheikah";
import { Rito } from "../Races/Rito";
import { Twili } from "../Races/Twili";
import { Fairy } from "../Races/Fairy";

@Component({
  selector: "character-create",
  templateUrl: "./character-create.component.html",
  styleUrls: ["./character-create.component.css"]
})
export class CharacterCreateComponent implements OnInit {
  @Input() CharacterParent: CharactersComponent;

  showRaceModal: boolean = false;

  showRace: boolean[] = [
    false,    //Hylian 0
    false,    //Goron 1
    false,    //Zora 2
    false,    //Gerudo 3
    false,    //Sheikah 4
    false,    //Rito 5
    false,    //Twili 6
    false     //Fairy 7
  ];

  newCharacter: Character;

  constructor() {}

  ngOnInit() {
    this.newCharacter = new Character();
  }

  aboutRace(): void {
    this.showRaceModal = !this.showRaceModal;
  }

  show(race: string): void {
    for (let i = 0; i < this.showRace.length; i++) {
      this.showRace[i] = false;
    }
    console.log(race);
    switch (race) {
      case "Hylian": {
        this.showRace[0] = true;
        break;
      }
      case "Goron": {
        this.showRace[1] = true;
        break;
      }
      case "Zora": {
        this.showRace[2] = true;
        break;
      }
      case "Gerudo": {
        this.showRace[3] = true;
        break;
      }
      case "Sheikah": {
        this.showRace[4] = true;
        break;
      }
      case "Rito": {
        this.showRace[5] = true;
        break;
      }
      case "Twili": {
        this.showRace[6] = true;
        break;
      }
      case "Fairy": {
        this.showRace[7] = true;
        break;
      }
    }
  }

  save(): void {
    this.newCharacter.health =
      48 + this.calcModtemp(this.newCharacter.attributes[2].value);
    this.newCharacter.magic =
      20 + this.calcModtemp(this.newCharacter.attributes[4].value);
    this.CharacterParent.newChar = false;
    this.CharacterParent.characters.push(this.newCharacter);
    this.CharacterParent.selectedCharacter = this.newCharacter;
  }

  cancel(): void {
    this.CharacterParent.newChar = false;
    this.newCharacter = null;
  }

  raceChange(): void {
    switch (this.newCharacter.race) {
      case "Hylian": {
        this.newCharacter = new Hylian(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case "Goron": {
        this.newCharacter = new Goron(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case "Zora": {
        this.newCharacter = new Zora(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case "Gerudo": {
        this.newCharacter = new Gerudo();
        break;
      }
      case "Sheikah": {
        this.newCharacter = new Sheikah();
        break;
      }
      case "Rito": {
        this.newCharacter = new Rito(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
      case "Twili": {
        this.newCharacter = new Twili();
        break;
      }
      case "Fairy": {
        this.newCharacter = new Fairy(this.newCharacter.subRace ? this.newCharacter.subRace : null);
        break;
      }
    }
    // let raceName = this.newCharacter.race;
    // let subRace = this.newCharacter.subRace;
    // let name = this.newCharacter.name;
    // this.newCharacter = new Character();
    // this.newCharacter.race = raceName;
    // this.newCharacter.subRace = subRace;
    // this.newCharacter.name = name;
    // this.newCharacter.changeRace(raceName,subRace);
  }

  calcMod(stat: Attribute): void {
    stat.modifier =
      stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
  }

  calcModtemp(stat: number): number {
    return stat % 2 === 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.newCharacter.attributes.length; i++) {
      if (this.newCharacter.attributes[i].name === modName) {
        return this.newCharacter.attributes[i].modifier;
      }
    }
  }

  /* finalizeMod(stat: string): void{
     for(let i = 0; i < this.newCharacter.attributes.length; i++){
      if(this.newCharacter.attributes[i].name === stat){
        this.newCharacter.attributes[i].modifier = this.calcMod(this.newCharacter.attributes[i].value)
      }
    }
  } */
}
