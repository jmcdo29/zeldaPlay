import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Character } from '../Character/character';
import { Attributes } from '../Character/Enums/attributes.enum';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { MessageService } from '../message.service';
import { Saves } from '../Character/Enums/saves.enum';

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
    console.log('Called onChanges()');
    this.character = this.characterDetailComponent.character;
    this.characterDetailComponent.roll = '';
  }

  ngOnInit() {
    console.log(this.character);
  }

  makeSave(saveType: number): void {
    console.log(this.character.savingThrows[saveType]);
    let saveValAdd;
    if (saveType === 0) {
      saveValAdd = this.character.attributes[Attributes['Constitution']].modifier;
    } else if ( saveType === 1) {
      saveValAdd = this.character.attributes[Attributes['Dexterity']].modifier;
    } else {
      saveValAdd = this.character.attributes[Attributes['Wisdom']].modifier;
    }
    const saveRacAdd = this.character.savingThrows[saveType].racial;
    console.log('Save Val', saveValAdd, '\nSave Rac', saveRacAdd);
    let roll = Math.round(Math.random() * 100) % 20 + 1;
    roll += saveValAdd + saveRacAdd;
    this.characterDetailComponent.roll = roll.toString();
    this.makeMessage(roll, saveType);
  }

  makeMessage(roll: number, saveIndex: number): void {
    const message = this.character.name + ' made a ' + this.character.savingThrows[saveIndex].name + ' save. VALUE: ' + roll + '.';
    this.message.add(message);
  }

}
