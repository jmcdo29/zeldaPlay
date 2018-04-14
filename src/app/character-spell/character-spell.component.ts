import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../Character/character';
import { Spell } from '../Character/spells';
import { Diety } from '../Character/Enums/dieties.enum';
import { Attributes } from '../Character/Enums/attributes.enum';
import { MessageService } from '../message.service';

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

  constructor(public message: MessageService) { }

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
      this.createMessage();
      this.spell = new Spell();
      this.newSpell = false;
    }
  }

  validate(id: string, key: string): void {
    if (!this.spell[key]) {
      document.getElementById(id).classList.add('bad-input');
      this.spell[key] = '';
    } else if (typeof this.spell[key] === 'string') {
      if (this.spell[key].trim() === '' || ((key === 'name' || key === 'effect') && !/^[a-zA-Z\s]+$/i.test(this.spell[key]))) {
        document.getElementById(id).classList.add('bad-input');
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    } else {
      if (this.spell[key] === '' ) {
      document.getElementById(id).classList.add('bad-input');
      this.spell[key] = '';
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    }
  }

  createMessage(): void {
    const name = this.character.name;
    const spell = this.character.spells[this.character.spells.length - 1];
    const spellName = spell.name;
    const spellType = spell.diety;

    const message = name + ' added a spell of ' + spellType + ' called ' + spellName + '.';
    this.message.add(message);
  }
}