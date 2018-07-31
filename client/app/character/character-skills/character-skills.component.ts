import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../character';
import { Skills } from '../enums/skills.enum';
import { Attributes } from '../enums/attributes.enum';
import { MessageService } from '../../messages/message.service';

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.css']
})
export class CharacterSkillsComponent implements OnInit {

  @Input() character: Character;

  showSkills = true;

  skill: string;
  checkVal: number;

  constructor(public messenger: MessageService) { }

  ngOnInit() {
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.character.attributes.length; i++) {
      if (this.character.attributes[i].name === modName) {
        return this.character.attributes[i].modifier;
      }
    }
  }

  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  makeCheck(skillName: string): void {
    const originalRoll =  Math.round(Math.random() * 100) % 20 + 1;
    let roll = originalRoll;
    const skill = this.character.skills[Skills[skillName]];
    const skillMod = skill.modifier;
    const mod = this.character.attributes[Attributes[skillMod]].modifier;
    const trained = skill.trained ? 3 : 0;
    roll += mod + skill.ranks + skill.misc + skill.item + skill.racial + trained;
    this.checkVal = roll;
    this.skill = skillName;
    this.setClasses(originalRoll);
    this.addMessage(skillName, roll);
  }

  hideCheck(): void {
    this.checkVal = null;
    this.skill = null;
  }

  private addMessage(skillName: string, skillRoll: number) {
    const name = this.character.name;
    const message = name + ' rolled a ' + skillRoll + ' on a ' + skillName + ' check.';
    this.messenger.add(message);
  }

  private setClasses(roll: number): void {
    this.nullify('roll', 'crit');
    this.nullify('roll', 'critMiss');
    if (roll === 1) {
      document.getElementById('roll').classList.add('critMiss');
    } else if (roll === 20) {
      document.getElementById('roll').classList.add('crit');
    }
  }

  private nullify(id: string, className: string): void {
    console.log('document.getElementById(%s);', id);
    if (document.getElementById(id) && document.getElementById(id).classList.contains(className)) {
      document.getElementById(id).classList.remove(className);
    }
  }
}
