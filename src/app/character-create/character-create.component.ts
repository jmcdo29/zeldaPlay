import { Component, Input, OnInit, } from '@angular/core';
import { CharactersComponent } from '../characters/characters.component';
import { Character } from '../character';
import { Attribute } from '../attribute';

@Component({
  selector: 'character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.css']
})
export class CharacterCreateComponent implements OnInit {

  @Input() CharacterParent: CharactersComponent;

  newCharacter : Character;

  constructor() { }

  ngOnInit() {
    this.newCharacter = new Character();
  }

  save(): void{
    this.newCharacter.health = 48 + this.calcModtemp(this.newCharacter.attributes[2].value)
    this.newCharacter.magic = 20 + this.calcModtemp(this.newCharacter.attributes[4].value)
    this.CharacterParent.newChar = false;
    this.CharacterParent.characters.push(this.newCharacter);
    this.CharacterParent.selectedCharacter = this.newCharacter;
  }

  cancel(): void{
    this.CharacterParent.newChar = false;
    this.newCharacter = null;
  }

  
  calcMod(stat : Attribute): void{
    stat.modifier = stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
  }

  calcModtemp(stat : number): number{
    return stat % 2 === 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

  getMod(modName : string): number{
    for(let i = 0; i < this.newCharacter.attributes.length; i++){
      if(this.newCharacter.attributes[i].name === modName){
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
