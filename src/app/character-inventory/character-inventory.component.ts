import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../Character/character';

@Component({
  selector: 'app-character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.css']
})
export class CharacterInventoryComponent implements OnInit {

  @Input() character: Character;

  constructor() { }

  ngOnInit() {
  }

}
