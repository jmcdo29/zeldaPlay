import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

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

  /**
   * Finish adding experience to the character (handles negative additions by making
   * them positive and showing an error)
   */
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

  /**
   * Finish modifying the character's health
   */
  finalizeHealthMod(): void {
    this.character.changeHealth(this.hpDmg * this.type);
    this.changeHP = false;
  }

  /**
   * Function to handle and validate how much the health is going to change by
   * @param addition How much to change the health by
   */
  modTheHMod(addition: number): void {
    this.hpDmg + addition > this.character.maxHealth + 10
      ? (this.hpDmg = this.character.maxHealth + 10)
      : (this.hpDmg += addition);
  }

  /**
   * Finish adding magic points to the character.
   */
  finalizeMagicMod(): void {
    this.character.changeMagic(this.mpDmg * this.type);
    this.changeMP = false;
  }

  /**
   * Handles input and validation of the magic modifier
   * @param addition How much to change the magic modifier by
   */
  modTheMMod(addition: number): void {
    this.mpDmg + addition > this.character.maxMagic
      ? (this.mpDmg = this.character.maxMagic)
      : (this.mpDmg += addition);
  }

  /**
   * Open the change health modal
   */
  modHealth(): void {
    this.hpDmg = 0;
    this.changeHP = !this.changeHP;
  }

  /**
   * Open the change magic modal
   */
  modMagic(): void {
    this.mpDmg = 0;
    this.changeMP = !this.changeMP;
  }

  /**
   * open the add experience modal
   */
  modExp(): void {
    this.expMod = 0;
    this.changeExp = !this.changeExp;
    this.negExp = false;
  }

  /**
   * Toggle the details section
   */
  expandDets(): void {
    this.showDets = !this.showDets;
  }

  /**
   * Toggle the saves section
   */
  expandSaves(): void {
    this.showSaves = !this.showSaves;
  }

  /**
   * Sets the roll value from the dice component
   * @param value Value of the roll
   */
  setRoll(value: string): void {
    this.roll = value;
  }

  /**
   * Change to the level up component to allow for stat changes
   */
  setEdit(): void {
    this.levelUp.ngOnInit();
    if (!this.editMode) {
      this.character.levelUp();
    }
    this.editMode = !this.editMode;
  }

  /**
   * Character got heart container
   */
  gotHeartContainer(): void {
    this.character.maxHealth += 16;
    this.character.health = this.character.maxHealth;
    this.createMessage(16, 'heart');
  }

  /**
   * Character got magic container
   */
  gotMagicContainer(): void {
    this.character.maxMagic += 6;
    this.character.magic = this.character.maxMagic;
    this.createMessage(6, 'magic');
  }

  /**
   * Function to create an audit log of what happened by the user.
   * Message is immediately added to the messages component
   * @param value How much the value changed
   * @param type heart if HP container, magic if MP container
   */
  createMessage(value: number, type: 'heart' | 'magic'): void {
    const name = this.character.name;
    const obtained = ' obtained a ' + type + ' container ';
    const val = 'for ' + value + (type === 'heart' ? 'HP' : 'MP') + '.';

    const message = name + obtained + val;

    this.message.add(message);
  }
}
