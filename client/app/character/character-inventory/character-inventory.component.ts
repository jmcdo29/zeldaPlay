import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../characterModels/character';

@Component({
  selector: 'app-character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.scss']
})
export class CharacterInventoryComponent implements OnInit {
  @Input()
  character: Character;

  constructor() {}

  ngOnInit() {}
}
