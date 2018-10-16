import { Component, Input, OnInit } from '@angular/core';

import { AlertService } from '#Alert/alert.service';
import { Attributes } from '#Enums/attributes.enum';
import { Diety } from '#Enums/dieties.enum';
import { Magics } from '#Enums/magic-skills.enum';
import { Character } from '#Models/character';
import { Spell } from '#Models/spells';
import { MessageService } from '#Shared/messages/message.service';

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
  spellArray: Spell[] = [];

  spellName: string;
  spellRoll: number;
  dmgRoll: number;

  constructor(
    private message: MessageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.character.getSpells()) {
      this.spellArray = this.character.getSpells();
    }
  }

  addSpell(): void {
    if (!this.newSpell) {
      this.spell = new Spell(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    }
    this.newSpell = !this.newSpell;
  }

  saveSpell(): void {
    let error = false;
    if (!this.spell.getName()) {
      error = true;
      document.getElementById('spellName').classList.add('bad-input');
    }
    if (!this.spell.getEffect()) {
      error = true;
      document.getElementById('spellEffect').classList.add('bad-input');
    }
    if (!this.spell.getMultiplier()) {
      error = true;
      document.getElementById('spellMult').classList.add('bad-input');
    }
    if (!this.spell.getDamage()) {
      error = true;
      document.getElementById('spellDam').classList.add('bad-input');
    }
    if (!this.spell.getDiety()) {
      error = true;
      document.getElementById('spellGod').classList.add('bad-input');
    }
    if (!this.spell.getMpUse()) {
      error = true;
      document.getElementById('mpUse').classList.add('bad-input');
    }
    if (!error) {
      this.character.addSpell(this.spell);
      this.createMessage();
      this.spell = new Spell(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
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
    } else if (document.getElementById(id).classList.contains('bad-input')) {
      document.getElementById(id).classList.remove('bad-input');
    }
  }

  createMessage(): void {
    const name = this.character.getName();
    const spell = this.character.getSpells()[
      this.character.getSpells().length - 1
    ];
    const spellName = spell.getName();
    const spellType = spell.getDiety();

    const message =
      name + ' added a spell of ' + spellType + ' called ' + spellName + '.';
    this.message.add(message);
  }

  getMod(modName: string): number {
    return this.character.getAttributes()[Attributes[modName]].getModifier();
  }

  expandMagic(): void {
    this.showMagic = !this.showMagic;
  }

  castSpell(spellIndex: number): void {
    let crit = false;
    const character = this.character;
    const magicStart = character.getMagic();
    const spell = character.getSpells()[spellIndex];
    this.character.changeMagic(-1 * spell.getMpUse());
    if (magicStart - spell.getMpUse() < 0) {
      this.alertService.error(
        'You cannot use more magic than you have available.'
      );
    } else {
      const magicType = character.getMagicSkills()[Magics[spell.getDiety()]];
      const magicBonus =
        magicType.getRanks() +
        character
          .getAttributes()
          [Attributes[magicType.getModifier()]].getModifier();
      const ogSpellRoll = (Math.round(Math.random() * 100) % 20) + 1;
      const spellRoll = ogSpellRoll + magicBonus;
      this.spellName = spell.getName();
      const ogDmgRoll =
        (Math.round(Math.random() * 100) % spell.getDamage()) + 1;
      if (ogSpellRoll === 20) {
        crit = true;
      }
      const dmgRoll =
        ogDmgRoll * spell.getMultiplier() * (crit ? 3 : 1) +
        this.getMagicBonus(spell, character);
      this.spellName = spell.getName();
      this.spellRoll = spellRoll;
      this.dmgRoll = dmgRoll;
      this.setClasses(ogSpellRoll);
      this.dmgClasses(ogDmgRoll, spell.getDamage());
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
    if (spell.getUseDiety()) {
      let spellBon = character
        .getMagicSkills()
        [Magics[spell.getDiety()]].getRanks();
      spellBon += character
        .getAttributes()
        [
          Attributes[
            character.getMagicSkills()[Magics[spell.getDiety()]].getModifier()
          ]
        ].getModifier();
      retVal += spellBon;
    } else if (spell.getModifier()) {
      retVal += character
        .getAttributes()
        [Attributes[spell.getModifier()]].getModifier();
    }
    return retVal;
  }
}
