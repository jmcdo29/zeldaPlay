import { Component, OnInit, Input } from '@angular/core';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { MessageService } from '../message.service';
import { Attributes } from '../Character/Enums/attributes.enum';

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

  formatDate(time: Date): String {
    const MONTH = time.getMonth() + 1;
    const DAY = time.getDate();
    const HOUR = time.getHours();
    const MINUTE = time.getMinutes();
    const SECOND = time.getSeconds();
    const SLASH = '/';
    const COLON = ':';
    const retString = MONTH + SLASH + DAY + ' ' + HOUR + COLON + MINUTE + COLON + SECOND;
    return retString;
  }

  roll(sides: number): void {
    this.character.crit = false;
    this.character.critmiss = false;
    this.character.maxDmg = false;
    const roll = Math.round(Math.random() * 100) % sides + 1;
    let modVal;

    const rollTime = new Date(Date.now());

    const NAME = this.character.character.name;
    const ROLLED = ' rolled a ';
    const MOD = ' with a ';
    const MODNAME = ' modifier of ';
    const TIME = ' at ' + this.formatDate(rollTime) + '.';
    let rollVal: Number;

    let rollString = NAME + ROLLED;

    if (roll === sides && sides === 20) {
      this.character.crit = true;
    }
    if (roll === 1 && sides === 20) {
      this.character.critmiss = true;
    }
    if (
      roll === sides &&
      (sides === 4 || sides === 6 || sides === 8 || sides === 12)
    ) {
      this.character.maxDmg = true;
    }
    if (this.mod !== 'null' && this.mod) {
      /* for (const key in Object.keys(this.character.character.attributes)) {
        if (this.character.character.attributes[key].name === this.mod) {
          modVal = this.character.character.attributes[key].modifier;
        }
      } */
      modVal = this.character.character.attributes[Attributes[this.mod]].modifier;
      rollVal = roll + modVal;
    } else {
      rollVal = roll;
    }
    this.character.setRoll(rollVal.toString());
    rollString += roll + MOD + 'D' + sides;
    if (modVal) {
      rollString += MOD + this.character.character.attributes[Attributes[this.mod]].name + MODNAME + modVal;
    }
    rollString += TIME + ' TOTAL:' + rollVal + '.';
    this.messageService.add(rollString);
  }
}
