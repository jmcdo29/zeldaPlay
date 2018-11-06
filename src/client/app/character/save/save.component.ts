import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Attributes } from '#Enums/attributes.enum';
import { Saves } from '#Enums/saves.enum';
import { Character } from '#Models/character';
import { MessageService } from '#Shared/messages/message.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit, OnChanges {
  @Input()
  characterDetailComponent: CharacterDetailComponent;

  @Input()
  character: Character;

  attributes = Attributes;

  constructor(public message: MessageService) {}

  ngOnChanges() {
    this.character = this.characterDetailComponent.character;
    this.characterDetailComponent.roll = '';
  }

  ngOnInit() {}

  makeSave(saveString: string): void {
    const modifier = this.character.savingThrows[Saves[saveString]].modifier;
    const saveValAdd = this.character.attributes[Attributes[modifier]].modifier;
    const saveRacAdd = this.character.savingThrows[Saves[saveString]].racial;
    let roll = (Math.round(Math.random() * 100) % 20) + 1;
    roll += saveValAdd + saveRacAdd;
    roll = roll < 1 ? 1 : roll;
    this.characterDetailComponent.roll = roll.toString();
    this.makeMessage(roll, saveString);
  }

  makeMessage(roll: number, saveString: string): void {
    const message =
      this.character.name +
      ' made a ' +
      this.character.savingThrows[Saves[saveString]].name +
      ' save. VALUE: ' +
      roll +
      '.';
    this.message.add(message);
  }
}
