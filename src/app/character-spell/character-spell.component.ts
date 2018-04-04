import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';
import { Spell } from '../Character/spells';
import { Diety } from '../Character/Enums/dieties';
import { Attributes } from '../Character/Enums/attributes';

@Component({
  selector: 'app-character-spell',
  templateUrl: './character-spell.component.html',
  styleUrls: ['./character-spell.component.css']
})
export class CharacterSpellComponent implements OnInit {

  @Input() character: Character;

  newSpell = false;

  dieties = Diety;
  attributes = Attributes;
  spell: Spell;
  spellArray: Spell[];

  constructor() { }

  ngOnInit() {
    this.spellArray = new Array();
    if (this.character.spells) {
      this.spellArray = this.character.spells;
    }
  }

  addSpell(): void {
    if (!this.newSpell) {
      this.spell = new Spell();
    }
    this.newSpell = !this.newSpell;
  }

  saveSpell(): void {
    let error = false;
    if (!this.spell.name) {
      error = true;
      document.getElementById('spellName').classList.add('bad-input');
    }
    if (!this.spell.effect) {
      error = true;
      document.getElementById('spellEffect').classList.add('bad-input');
    }
    if (!this.spell.multiplier) {
      error = true;
      document.getElementById('spellMult').classList.add('bad-input');
    }
    if (!this.spell.damage) {
      error = true;
      document.getElementById('spellDam').classList.add('bad-input');
    }
    if (!this.spell.diety) {
      error = true;
      document.getElementById('spellGod').classList.add('bad-input');
    }
    if (!this.spell.mpUse) {
      error = true;
      document.getElementById('mpUse').classList.add('bad-input');
    }
    if (! error) {
      this.spellArray.push(this.spell);
      this.character.spells = this.spellArray;
      this.newSpell = false;
    }
  }

  removeError(id: string, key: string): void {
    if (document.getElementById(id).classList.contains('bad-input') && this.spell[key]) {
      document.getElementById(id).classList.remove('bad-input');
    }
  }
}
