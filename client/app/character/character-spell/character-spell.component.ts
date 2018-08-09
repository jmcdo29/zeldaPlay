import { Component, Input, OnInit } from '@angular/core';

import { AlertService } from '../../alert/alert.service';
import { MessageService } from '../../shared/messages/message.service';
import { Character } from '../characterModels/character';
import { Attributes } from '../characterModels/enums/attributes.enum';
import { Diety } from '../characterModels/enums/dieties.enum';
import { Magics } from '../characterModels/enums/magic-skills.enum';
import { Spell } from '../characterModels/spells';

@Component({
  selector: 'app-character-spell',
  templateUrl: './character-spell.component.html',
  styleUrls: ['./character-spell.component.css']
})
export class CharacterSpellComponent implements OnInit {
  @Input()
  character: Character;

  newSpell = false;

  showMagic = true;

  dieties = Diety;
  attributes = Attributes;
  spell: Spell;
  spellArray: Spell[] = [];

  spellName: string;
  spellRoll: number;
  dmgRoll: number;

  constructor(
    public message: MessageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
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
    if (!error) {
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
      if (
        this.spell[key].trim() === '' ||
        ((key === 'name' || key === 'effect') &&
          !/^[a-zA-Z\s]+$/i.test(this.spell[key]))
      ) {
        document.getElementById(id).classList.add('bad-input');
      } else if (document.getElementById(id).classList.contains('bad-input')) {
        document.getElementById(id).classList.remove('bad-input');
      }
    } else {
      if (this.spell[key] === '') {
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

    const message =
      name + ' added a spell of ' + spellType + ' called ' + spellName + '.';
    this.message.add(message);
  }

  getMod(modName: string): number {
    return this.character.attributes[Attributes[modName]].modifier;
  }

  expandMagic(): void {
    this.showMagic = !this.showMagic;
  }

  castSpell(spellIndex: number): void {
    let crit = false;
    const character = this.character;
    const spell = character.spells[spellIndex];
    this.character.magic -= spell.mpUse;
    if (this.character.magic < 0) {
      this.character.magic += spell.mpUse;
      this.alertService.error(
        'You cannot use more magic than you have available.'
      );
    } else {
      const magicType = character.magicSkills[Magics[spell.diety]];
      const magicBonus =
        magicType.ranks +
        character.attributes[Attributes[magicType.modifier]].modifier;
      const ogSpellRoll = (Math.round(Math.random() * 100) % 20) + 1;
      const spellRoll = ogSpellRoll + magicBonus;
      this.spellName = spell.name;
      const ogDmgRoll = (Math.round(Math.random() * 100) % spell.damage) + 1;
      if (ogDmgRoll === 20) {
        crit = true;
      }
      const dmgRoll =
        ogDmgRoll * spell.multiplier * (crit ? 3 : 1) +
        this.getMagicBonus(spell, character);
      this.spellName = spell.name;
      this.spellRoll = spellRoll;
      this.dmgRoll = dmgRoll;
      this.setClasses(ogSpellRoll);
      this.dmgClasses(ogDmgRoll, spell.damage);
    }
  }

  private setClasses(roll: number): void {
    this.nullify('spellRoll', 'crit');
    this.nullify('spellRoll', 'critMiss');
    if (roll === 1) {
      document.getElementById('spellRoll').classList.add('critMiss');
    } else if (roll === 20) {
      document.getElementById('spellRoll').classList.add('crit');
    }
  }

  private dmgClasses(roll: number, sides: number): void {
    this.nullify('spellDmgRoll', 'max');
    this.nullify('spellDmgRoll', 'critMiss');
    if (roll === 1) {
      document.getElementById('spellDmgRoll').classList.add('critMiss');
    } else if (roll === sides) {
      document.getElementById('spellDmgRoll').classList.add('max');
    }
  }

  private nullify(id: string, className: string): void {
    if (
      document.getElementById(id) &&
      document.getElementById(id).classList.contains(className)
    ) {
      document.getElementById(id).classList.remove(className);
    }
  }

  private getMagicBonus(spell: Spell, character: Character): number {
    let retVal = 0;
    if (spell.useDiety) {
      let spellBon = character.magicSkills[Magics[spell.diety]].ranks;
      spellBon +=
        character.attributes[
          Attributes[character.magicSkills[Magics[spell.diety]].modifier]
        ].modifier;
      retVal += spellBon;
    } else if (spell.modifier) {
      retVal += character.attributes[Attributes[spell.modifier]].modifier;
    }
    return retVal;
  }
}
