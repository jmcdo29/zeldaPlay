import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from '../../shared/messages/message.service';
import { Character } from '../characterModels/character';
import { Attributes } from '../characterModels/enums/attributes.enum';
import { Skills } from '../characterModels/enums/skills.enum';

@Component({
  selector: 'app-character-skills',
  templateUrl: './character-skills.component.html',
  styleUrls: ['./character-skills.component.css']
})
export class CharacterSkillsComponent implements OnInit {
  @Input()
  character: Character;

  showSkills = true;

  skill: string;
  checkVal: number;

  constructor(public messenger: MessageService) {}

  ngOnInit() {}

  getMod(modName: string): number {
    for (const attribute of this.character.getAttributes()) {
      if (attribute.getName() === modName) {
        return attribute.getModifier();
      }
    }
  }

  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  makeCheck(skillName: string): void {
    const originalRoll = (Math.round(Math.random() * 100) % 20) + 1;
    const skill = this.character.getSkills()[Skills[skillName]];
    const skillMod = skill.getModifier();
    const mod = this.character.getAttributes()[Attributes[skillMod]].getModifier();
    const trained = skill.getTrained() ? 3 : 0;
    const roll =
      originalRoll +
      mod +
      skill.getRanks() +
      skill.getMisc() +
      skill.getItem() +
      skill.getRacial() +
      trained;
    this.checkVal =
      originalRoll +
      mod +
      skill.getRanks() +
      skill.getMisc() +
      skill.getItem() +
      skill.getRacial() +
      trained;
    this.skill = skillName;
    this.setClasses(originalRoll);
    this.addMessage(skillName, roll);
  }

  hideCheck(): void {
    this.checkVal = null;
    this.skill = null;
  }

  private addMessage(skillName: string, skillRoll: number) {
    const name = this.character.getName();
    const message =
      name + ' rolled a ' + skillRoll + ' on a ' + skillName + ' check.';
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
    if (
      document.getElementById(id) &&
      document.getElementById(id).classList.contains(className)
    ) {
      document.getElementById(id).classList.remove(className);
    }
  }
}
