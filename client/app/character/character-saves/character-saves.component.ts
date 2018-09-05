import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { MessageService } from '../../shared/messages/message.service';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { Character } from '../characterModels/character';
import { Attributes } from '../characterModels/enums/attributes.enum';
import { Saves } from '../characterModels/enums/saves.enum';

@Component({
  selector: 'app-character-saves',
  templateUrl: './character-saves.component.html',
  styleUrls: ['./character-saves.component.css']
})
export class CharacterSavesComponent implements OnInit, OnChanges {
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
    const modifier = this.character.getSavingThrows()[Saves[saveString]].getModifier();
    const saveValAdd = this.character.getAttributes()[Attributes[modifier]].getModifier();
    const saveRacAdd = this.character.getSavingThrows()[Saves[saveString]].getRacial();
    let roll = (Math.round(Math.random() * 100) % 20) + 1;
    roll += saveValAdd + saveRacAdd;
    roll = roll < 1 ? 1 : roll;
    this.characterDetailComponent.roll = roll.toString();
    this.makeMessage(roll, saveString);
  }

  makeMessage(roll: number, saveString: string): void {
    const message =
      this.character.getName() +
      ' made a ' +
      this.character.getSavingThrows()[Saves[saveString]].getName() +
      ' save. VALUE: ' +
      roll +
      '.';
    this.message.add(message);
  }
}
