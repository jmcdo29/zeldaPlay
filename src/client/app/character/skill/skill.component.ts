import { Component, Input, OnInit } from '@angular/core';

import { Attributes } from '#Enums/attributes.enum';
import { Skills } from '#Enums/skills.enum';
import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input()
  character: Character;

  showSkills = true;

  skill: string;
  checkVal: number;

  constructor(
    private readonly messenger: MessageService,
    private readonly skillService: SkillService
  ) {}

  // In theory this will never be called, but it is implemented
  // as a fail safe in case for whatever reason getting the
  // character does not immediately get the skills too.
  ngOnInit() {
    if (this.character.skills.length === 0) {
      this.skillService.getSkills(this.character.id).subscribe((skillMap) => {
        skillMap.skill.forEach((inSkill) => {
          this.character.addSkill(inSkill);
        });
        skillMap.magic.forEach((inSkill) => {
          this.character.addMagicSkill(inSkill);
        });
        skillMap.weapon.forEach((inSkill) => {
          this.character.addWeaponSkill(inSkill);
        });
      });
    }
  }

  getMod(modName: string): number {
    for (const attribute of this.character.attributes) {
      if (attribute.name === modName) {
        return attribute.modifier;
      }
    }
  }

  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  makeCheck(skillName: string): void {
    const originalRoll = (Math.round(Math.random() * 100) % 20) + 1;
    const skill = this.character.skills[Skills[skillName]];
    const skillMod = skill.modifier;
    const mod = this.character.attributes[Attributes[skillMod]].modifier;
    const trained = skill.trained ? 3 : 0;
    const roll =
      originalRoll +
      mod +
      skill.ranks +
      skill.misc +
      skill.item +
      skill.racial +
      trained;
    this.checkVal =
      originalRoll +
      mod +
      skill.ranks +
      skill.misc +
      skill.item +
      skill.racial +
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
    const name = this.character.name;
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
