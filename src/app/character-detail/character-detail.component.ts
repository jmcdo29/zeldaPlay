import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  @Input() character: Character;

  roll: string;
  editMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  setRoll(value : string): void{
    this.roll = value;
  }

  setEdit(): void{
    this.editMode = !this.editMode;
  }

  calcMod(stat : number): number{
    return stat % 2 == 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

}
