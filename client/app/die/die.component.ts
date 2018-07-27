import { Component, OnInit, Input } from '@angular/core';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { MessageService } from '../_services/message.service';
import { Attributes } from '../_enums/attributes.enum';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {
  @Input() character: CharacterDetailComponent;
  @Input() sides: number;
  @Input() mod: string;
  crit = false;

  constructor(public messageService: MessageService) {}

  ngOnInit() {}

  createMessage(roll: number, modVal: number, sides: number): void {

    const NAME = this.character.character.name;
    const ROLLED = ' rolled a ';
    const MOD = ' with a ';
    const MOD_NAME = modVal ? this.character.character.attributes[Attributes[this.mod]].name + ' modifier of ' : '';
    const THERE_IS_MOD = modVal ? MOD + MOD_NAME + modVal : '';
    const TOTAL = 'TOTAL: ' + (roll + (modVal ? modVal : 0)) + '.';
    const rollString = NAME + ROLLED + roll + MOD + 'D' + sides + THERE_IS_MOD + '. ' + TOTAL;

    this.messageService.add(rollString);
  }

  roll(sides: number): void {
    this.character.crit = false;
    this.character.critMiss = false;
    this.character.maxDmg = false;
    const roll = Math.round(Math.random() * 100) % sides + 1;
    let modVal;

    let rollVal: number;

    if (roll === sides && sides === 20) {
      this.character.crit = true;
    }
    if (roll === 1 && sides === 20) {
      this.character.critMiss = true;
    }
    if (
      roll === sides &&
      (sides === 4 || sides === 6 || sides === 8 || sides === 12)
    ) {
      this.character.maxDmg = true;
    }
    if (this.mod !== 'null' && this.mod) {
      modVal = this.character.character.attributes[Attributes[this.mod]].modifier;
      rollVal = roll + modVal;
    } else {
      rollVal = roll;
    }
    this.character.setRoll(rollVal.toString());

    this.createMessage(roll, modVal, sides);
  }
}
