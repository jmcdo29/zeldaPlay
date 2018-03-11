import { Component, OnInit, Input } from '@angular/core';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {

  @Input() character: CharacterDetailComponent;
  @Input() sides : number;
  

  constructor() { }

  ngOnInit() {
  }

  roll(sides : number): void{
    this.character.setRoll(((Math.round((Math.random()*100)) % sides) + 1).toString());
  }
}
