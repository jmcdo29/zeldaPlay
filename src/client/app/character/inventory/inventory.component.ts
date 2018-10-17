import { Component, Input, OnInit } from '@angular/core';

import { Character } from '#Models/character';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @Input()
  character: Character;

  constructor() {}

  ngOnInit() {}
}
