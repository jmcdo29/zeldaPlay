import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../shared/messages/message.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { Attributes } from '../characterModels/enums/attributes.enum';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {
  @Input()
  character: CharacterDetailComponent;
  @Input()
  sides: number;
  @Input()
  mod: string;
  crit = false;

  constructor(public messageService: MessageService) {}

  ngOnInit() {}

  createMessage(roll: number, modVal: number, sides: number): void {
    const name = this.character.character.name;
    const rolled = ' rolled a ';
    const mod = ' with a ';
    const mod_name = modVal
      ? this.character.character.attributes[Attributes[this.mod]].name +
        ' modifier of '
      : '';
    const there_is_mod = modVal ? mod + mod_name + modVal : '';
    const total = 'TOTAL: ' + (roll + (modVal ? modVal : 0)) + '.';
    const rollString =
      name + rolled + roll + mod + 'D' + sides + there_is_mod + '. ' + total;

    this.messageService.add(rollString);
  }

  roll(sides: number): void {
    this.character.crit = false;
    this.character.critMiss = false;
    this.character.maxDmg = false;
    const roll = (Math.round(Math.random() * 100) % sides) + 1;
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
      modVal = this.character.character.attributes[Attributes[this.mod]]
        .modifier;
      rollVal = roll + modVal;
    } else {
      rollVal = roll;
    }
    this.character.setRoll(rollVal.toString());

    this.createMessage(roll, modVal, sides);
  }
}
