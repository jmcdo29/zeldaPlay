import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MessageService } from '../../shared/messages/message.service';
import { CharacterLevelUpComponent } from '../character-level-up/character-level-up.component';
import { Character } from '../characterModels/character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
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

  changeHP = false;
  changeMP = false;

  showSet = [true, false, false, false, false];

  hpDmg: number;
  mpDmg: number;

  skillPoints: number;
  attrPoints: number;

  type = 1;

  expMod: number;

  constructor(private message: MessageService) {}

  ngOnInit() {}

  finalizeHealthMod(): void {
    const maxHealth = this.character.getMaxHealth();
    const health = this.character.getHealth();
    health + this.hpDmg * this.type > maxHealth
      ? this.character.setHealth(maxHealth)
      : this.character.setHealth(health + this.hpDmg * this.type);
    this.character.health < -10
      ? this.character.setHealth(-10)
      : this.character.setHealth(this.character.getHealth());
    this.changeHP = false;
  }

  modTheHMod(addition: number): void {
    this.hpDmg + addition > this.character.getMaxHealth() + 10
      ? (this.hpDmg = this.character.getMaxHealth() + 10)
      : (this.hpDmg += addition);
  }

  finalizeMagicMod(): void {
    const maxMagic = this.character.getMaxMagic();
    const magic = this.character.getMagic();
    magic + this.mpDmg * this.type > maxMagic
      ? this.character.setMagic(maxMagic)
      : this.character.setMagic(magic + this.mpDmg * this.type);
    this.character.magic < 0
      ? this.character.setMagic(0)
      : this.character.setMagic(this.character.getMagic());
    this.changeMP = false;
  }

  modTheMMod(addition: number): void {
    this.mpDmg + addition > this.character.getMaxMagic()
      ? (this.mpDmg = this.character.getMaxMagic())
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
    this.character.setMaxHealth(this.character.getMaxHealth() + 16);
    this.character.setHealth(this.character.getMaxHealth());
    this.createMessage(16, 'heart');
  }

  gotMagicContainer(): void {
    this.character.setMaxMagic(this.character.getMaxMagic() + 6);
    this.character.setMagic(this.character.getMaxMagic());
    this.createMessage(6, 'magic');
  }

  createMessage(value: number, type: string): void {
    const name = this.character.getName();
    const obtained = ' obtained a ' + type + ' container ';
    const val = 'for ' + value + (type === 'heart' ? 'HP' : 'MP') + '.';

    const message = name + obtained + val;

    this.message.add(message);
  }
}
