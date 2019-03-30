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

  /**
   * In theory this will never be called, but it is implemented
   * as a fail safe in case for whatever reason getting the
   * character does not immediately get the skills too.
   */
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

  /**
   * utility function to get the value of the modifier from the character's attributes
   * @param modName Whatever mod is related to the skill (Strength, Dexterity, etc.)
   */
  getMod(modName: string): number {
    return this.character.attributes[Attributes[modName]].modifier;
  }

  /**
   * Toggle if skills are showing
   */
  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  /**
   * Roll a skill check for the skill and add the according bonuses
   * @param skillName What skill is making the skill check
   */
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

  /**
   * Hide the skill check from the page
   */
  hideCheck(): void {
    this.checkVal = null;
    this.skill = null;
  }

  /**
   * Message for the audit trail if a character makes a skill check
   * @param skillName Skill check being made
   * @param skillRoll Roll for the skill check
   */
  private addMessage(skillName: string, skillRoll: number) {
    const name = this.character.name;
    const message =
      name + ' rolled a ' + skillRoll + ' on a ' + skillName + ' check.';
    this.messenger.add(message);
  }

  /**
   * Utility to color the skillCheck if crit hit or crit miss
   * @param roll value of the roll
   */
  private setClasses(roll: number): void {
    this.nullify('roll', 'crit');
    this.nullify('roll', 'critMiss');
    if (roll === 1) {
      document.getElementById('roll').classList.add('critMiss');
    } else if (roll === 20) {
      document.getElementById('roll').classList.add('crit');
    }
  }

  /**
   * Removes crit and/or critMiss if the roll element has them in its class list
   */
  private nullify(id: string, className: string): void {
    if (
      document.getElementById(id) &&
      document.getElementById(id).classList.contains(className)
    ) {
      document.getElementById(id).classList.remove(className);
    }
  }
}
