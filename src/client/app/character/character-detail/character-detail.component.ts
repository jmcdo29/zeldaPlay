import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterLevelUpComponent } from '../character-level-up/character-level-up.component';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  @ViewChild('levelUp')
  private levelUp: CharacterLevelUpComponent;

  @Input()
  character: Character;

  rollMod = 'null';
  roll: string;
  editMode = false;
  crit = false;
  critMiss = false;
  maxDmg = false;

  showDets = true;
  showSaves = true;

  changeExp = false;
  changeHP = false;
  changeMP = false;

  showSet = [true, false, false, false, false];

  hpDmg: number;
  mpDmg: number;

  skillPoints: number;
  attrPoints: number;

  type = 1;

  expMod: number;
  negExp = false;

  constructor(private message: MessageService) {}

  ngOnInit() {}

  finalizeExpMod(): void {
    if (this.expMod <= 0) {
      this.expMod *= -1;
      this.negExp = true;
      return;
    } else {
      this.negExp = false;
    }
    this.character.gainExp(this.expMod);
    this.changeExp = false;
  }

  finalizeHealthMod(): void {
    this.character.changeHealth(this.hpDmg * this.type);
    this.changeHP = false;
  }

  modTheHMod(addition: number): void {
    this.hpDmg + addition > this.character.maxHealth + 10
      ? (this.hpDmg = this.character.maxHealth + 10)
      : (this.hpDmg += addition);
  }

  finalizeMagicMod(): void {
    this.character.changeMagic(this.mpDmg * this.type);
    this.changeMP = false;
  }

  modTheMMod(addition: number): void {
    this.mpDmg + addition > this.character.maxMagic
      ? (this.mpDmg = this.character.maxMagic)
      : (this.mpDmg += addition);
  }

  modHealth(): void {
    this.hpDmg = 0;
    this.changeHP = !this.changeHP;
  }

  modMagic(): void {
    this.mpDmg = 0;
    this.changeMP = !this.changeMP;
  }

  modExp(): void {
    this.expMod = 0;
    this.changeExp = !this.changeExp;
    this.negExp = false;
  }

  expandDets(): void {
    this.showDets = !this.showDets;
  }

  expandSaves(): void {
    this.showSaves = !this.showSaves;
  }

  setRoll(value: string): void {
    this.roll = value;
  }

  setEdit(): void {
    this.levelUp.ngOnInit();
    if (!this.editMode) {
      this.character.levelUp();
    }
    this.editMode = !this.editMode;
  }

  changeSection(index: number): void {
    for (let i = 0; i < this.showSet.length; i++) {
      this.showSet[i] = false;
    }
    this.showSet[index] = true;
  }

  gotHeartContainer(): void {
    this.character.maxHealth += 16;
    this.character.health = this.character.maxHealth;
    this.createMessage(16, 'heart');
  }

  gotMagicContainer(): void {
    this.character.maxMagic += 6;
    this.character.magic = this.character.maxMagic;
    this.createMessage(6, 'magic');
  }

  createMessage(value: number, type: string): void {
    const name = this.character.name;
    const obtained = ' obtained a ' + type + ' container ';
    const val = 'for ' + value + (type === 'heart' ? 'HP' : 'MP') + '.';

    const message = name + obtained + val;

    this.message.add(message);
  }
}
