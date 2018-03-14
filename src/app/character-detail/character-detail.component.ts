import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';
import { Attribute } from '../attribute';

@Component({
  selector: 'character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  @Input() character: Character;

  roll: string;
  editMode: boolean = false;
  crit: boolean = false;
  critmiss: boolean = false;
  maxDmg: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setRoll(value : string): void{
    this.roll = value;
  }

  setMod(attr: Attribute): void{
    attr.modifier = attr.value % 2 === 0 ? (attr.value - 10) / 2 : (attr.value - 11) / 2;
  }

  calcMod(stat : number): number{
    return stat % 2 == 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

  setEdit(): void{
    if(this.setEdit){
      for(let i = 0; i < this.character.attributes.length; i++){
        this.character.attributes[i].modifier = this.calcMod(this.character.attributes[i].value);
      }
    }
    this.editMode = !this.editMode;
  }

  getMod(modName : string): number{
    for(let i = 0; i <  this.character.attributes.length; i++){
      if(this.character.attributes[i].name === modName){
        return this.character.attributes[i].modifier;
      }
    }
  }

}
