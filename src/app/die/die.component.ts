import { Component, OnInit, Input } from "@angular/core";
import { CharacterDetailComponent } from "../character-detail/character-detail.component";

@Component({
  selector: "die",
  templateUrl: "./die.component.html",
  styleUrls: ["./die.component.css"]
})
export class DieComponent implements OnInit {
  @Input() character: CharacterDetailComponent;
  @Input() sides: number;
  @Input() mod: string;
  crit: boolean = false;

  

  constructor() {}

  ngOnInit() {}

  roll(sides: number,): void {
    this.character.crit = false;
    this.character.critmiss = false;
    this.character.maxDmg = false;
    let roll = Math.round(Math.random() * 100) % sides + 1;
    let modVal;

    if (roll === sides && sides === 20) {
      this.character.crit = true;
    }
    if (roll === 1 && sides === 20) {
      this.character.critmiss = true;
    }
    if (
      roll === sides &&
      (sides === 4 || sides === 6 || sides === 8 || sides === 12)
    ) {
      this.character.maxDmg = true;
    }
    if(this.mod !== 'null'){
    for(let key in Object.keys(this.character.character.attributes)){
      if(this.character.character.attributes[key].name === this.mod){
        modVal = this.character.character.attributes[key].modifier;
      }
    }
    this.character.setRoll((roll + modVal).toString());
  }else{
    this.character.setRoll(roll.toString())
  }
  }
}
