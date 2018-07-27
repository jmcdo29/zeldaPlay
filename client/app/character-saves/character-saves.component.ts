import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Character } from '../_models/character';
import { Attributes } from '../_enums/attributes.enum';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { MessageService } from '../_services/message.service';
import { Saves } from '../_enums/saves.enum';

@Component({
  selector: 'app-character-saves',
  templateUrl: './character-saves.component.html',
  styleUrls: ['./character-saves.component.css']
})
export class CharacterSavesComponent implements OnInit, OnChanges {

  @Input() characterDetailComponent: CharacterDetailComponent;

  @Input() character: Character;

  attributes = Attributes;

  constructor(public message: MessageService) { }


  ngOnChanges() {
    this.character = this.characterDetailComponent.character;
    this.characterDetailComponent.roll = '';
  }

  ngOnInit() {
  }

  makeSave(saveString: string): void {
    const modifier = this.character.savingThrows[Saves[saveString]].modifier;
    const saveValAdd = this.character.attributes[Attributes[modifier]].modifier;
    const saveRacAdd = this.character.savingThrows[Saves[saveString]].racial;
    let roll = Math.round(Math.random() * 100) % 20 + 1;
    roll += saveValAdd + saveRacAdd;
    roll = roll < 1 ? 1 : roll;
    this.characterDetailComponent.roll = roll.toString();
    this.makeMessage(roll, saveString);
  }

  makeMessage(roll: number, saveString: string): void {
    const message = this.character.name + ' made a ' + this.character.savingThrows[Saves[saveString]].name + ' save. VALUE: ' + roll + '.';
    this.message.add(message);
  }

}
