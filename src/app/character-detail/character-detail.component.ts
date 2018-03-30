
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Character } from '../Character/character';
import { Attribute } from '../Character/attribute';
import { CharacterLevelUpComponent } from '../character-level-up/character-level-up.component';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  @ViewChild('levelUp') private levelUp: CharacterLevelUpComponent;

  @Input() character: Character;

  rollMod = 'null';
  roll: string;
  editMode = false;
  crit = false;
  critmiss = false;
  maxDmg = false;

  showDets = true;
  showSkills = true;
  showWeapon = true;
  showMagic = true;

  changeHP = false;
  changeMP = false;

  hpDmg: number;
  mpDmg: number;

  skillPoints: number;
  attrPoints: number;

  type = 1;

  expMod: number;

  constructor() {}

  ngOnInit() {}

  finalizeHealthMod(): void {
    const maxHealth = this.character.maxHealth;
    const health = this.character.health;
    health + this.hpDmg * this.type > maxHealth ? this.character.health = maxHealth : this.character.health += this.hpDmg * this.type;
    this.character.health < -10 ? this.character.health = -10 : this.character.health = this.character. health;
    this.changeHP = false;
  }

  modTheHMod(addition: number): void {
    this.hpDmg + addition > this.character.maxHealth + 10 ? this.hpDmg = this.character.maxHealth + 10 : this.hpDmg += addition;
  }

  finalizeMagicMod(): void {
    const maxMagic = this.character.maxMagic;
    const magic = this.character.magic;
    magic + this.mpDmg * this.type > maxMagic ? this.character.magic = maxMagic : this.character.magic += this.mpDmg * this.type;
    this.character.magic < 0 ? this.character.magic = 0 : this.character.magic = this.character.magic;
    this.changeMP = false;
  }

  modTheMMod(addition: number): void {
    this.mpDmg + addition > this.character.maxMagic ? this.mpDmg = this.character.maxMagic : this.mpDmg += addition;
  }

  modHealth(): void {
    this.hpDmg = 0;
    this.changeHP = !this.changeHP;
  }

  modMagic(): void {
    this.mpDmg = 0;
    this.changeMP = !this.changeMP;
  }

  expandDets(): void {
    this.showDets = !this.showDets;
    console.log(this.showDets);
  }

  expandSkill(): void {
    this.showSkills = !this.showSkills;
  }

  expandWeapon(): void {
    this.showWeapon = !this.showWeapon;
  }

  expandMagic(): void {
    this.showMagic = !this.showMagic;
  }

  print(value: string): void {
    console.log(value);
  }

  setRoll(value: string): void {
    this.roll = value;
  }

  setMod(attr: Attribute): void {
    attr.modifier =
      attr.value % 2 === 0 ? (attr.value - 10) / 2 : (attr.value - 11) / 2;
  }

  setEdit(): void {
    this.levelUp.ngOnInit();
    this.editMode = !this.editMode;
  }

  getMod(modName: string): number {
    for (let i = 0; i < this.character.attributes.length; i++) {
      if (this.character.attributes[i].name === modName) {
        return this.character.attributes[i].modifier;
      }
    }
  }

}
