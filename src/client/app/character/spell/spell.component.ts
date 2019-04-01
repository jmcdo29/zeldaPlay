import { Component, Input, OnInit } from '@angular/core';

import { AlertService } from '#Alert/alert.service';
import { Attributes } from '#Enums/attributes.enum';
import { Diety } from '#Enums/dieties.enum';
import { Magics } from '#Enums/magic-skills.enum';
import { Character } from '#Models/character';
import { Spell } from '#Models/spells';
import { MessageService } from '#Shared/messages/message.service';
import { SpellService } from './spell.service';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class SpellComponent implements OnInit {
  @Input()
  character: Character;

  newSpell = false;

  showMagic = true;

  dieties = Diety;
  attributes = Attributes;
  spell: Spell;

  spellName: string;
  spellRoll: number;
  dmgRoll: number;

  constructor(
    private readonly message: MessageService,
    private readonly alertService: AlertService,
    private readonly spellService: SpellService
  ) {}

  /**
   * Initialize the spell module. Get the character's spells
   */
  ngOnInit() {
    if (this.character.spells.length === 0) {
      this.spellService.getSpells(this.character.id).subscribe((spells) => {
        spells.forEach((spell) => {
          this.character.addSpell(spell);
        });
      });
    }
  }

  /**
   * New Spell modal toggle. Also creates new Spell object
   */
  addSpell(): void {
    if (!this.newSpell) {
      this.spell = new Spell();
    }
    this.newSpell = !this.newSpell;
  }

  /**
   * Checks for errors in the spell and allows for saving
   */
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
      if (sessionStorage.getItem('currentUser')) {
        this.spellService
          .newSpell(this.character.id, this.spell)
          .subscribe((retSpell) => {
            this.spell = retSpell;
          });
      }
      this.character.addSpell(this.spell);
      this.createMessage();
      this.spell = new Spell();
      this.newSpell = false;
    }
  }

  /**
   * Validate that the current field that was just changed has legitimate data
   * @param id Id of the component being worked on
   * @param key Field name of the spell being modified
   */
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
    } else if (document.getElementById(id).classList.contains('bad-input')) {
      document.getElementById(id).classList.remove('bad-input');
    }
  }

  /**
   * Audit trail message for creating a new spell.
   */
  createMessage(): void {
    const name = this.character.name;
    const spell = this.character.spells[this.character.spells.length - 1];
    const spellName = spell.name;
    const spellType = spell.diety;

    const message =
      name + ' added a spell of ' + spellType + ' called ' + spellName + '.';
    this.message.add(message);
  }

  /**
   * Util function to get the modifier of the spell's attribute type
   * @param modName mod name to get the value of
   */
  getMod(modName: string): number {
    return this.character.attributes[Attributes[modName]].modifier;
  }

  /**
   * Toggle seeing the spells
   */
  expandMagic(): void {
    this.showMagic = !this.showMagic;
  }

  /**
   * Cast the specified spell. Will throw an error if there is not enough MP to do so.
   * @param spellIndex the spell's index from the character's spells array
   */
  castSpell(spellIndex: number): void {
    let crit = false;
    const character = this.character;
    const magicStart = character.magic;
    const spell = character.spells[spellIndex];
    this.character.changeMagic(-1 * spell.mpUse);
    if (magicStart - spell.mpUse < 0) {
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
      if (ogSpellRoll === 20) {
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

  /**
   * Set the classes for the roll, if needed
   * @param roll The value of the roll made
   */
  private setClasses(roll: number): void {
    this.nullify('spellRoll', 'crit');
    this.nullify('spellRoll', 'critMiss');
    if (roll === 1) {
      document.getElementById('spellRoll').classList.add('critMiss');
    } else if (roll === 20) {
      document.getElementById('spellRoll').classList.add('crit');
    }
  }

  /**
   * Sets the classes for spellDmgRoll, if needed
   * @param roll the value of the roll
   * @param sides the number of sides the dice had
   */
  private dmgClasses(roll: number, sides: number): void {
    this.nullify('spellDmgRoll', 'max');
    this.nullify('spellDmgRoll', 'critMiss');
    if (roll === 1) {
      document.getElementById('spellDmgRoll').classList.add('critMiss');
    } else if (roll === sides) {
      document.getElementById('spellDmgRoll').classList.add('max');
    }
  }

  /**
   * remove "crit", "max" and "critMiss" from the spellDmgRoll and spellRoll element if any exist
   * @param id Id of the component to check
   * @param className className to see if it needs to be removed
   */
  private nullify(id: string, className: string): void {
    if (
      document.getElementById(id) &&
      document.getElementById(id).classList.contains(className)
    ) {
      document.getElementById(id).classList.remove(className);
    }
  }

  /**
   * Function to get the specified value of the spell bonus.
   * Based on the useDiety field, the spell modifier value,
   * and the spell diety value
   * @param spell The spell being used
   * @param character The character casting the spell
   */
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
