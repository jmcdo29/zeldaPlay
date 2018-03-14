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
  crit: boolean = false;

  constructor() {}

  ngOnInit() {}

  roll(sides: number): void {
    this.character.crit = false;
    this.character.critmiss = false;
    this.character.maxDmg = false;
    this.character.setRoll(
      (Math.round(Math.random() * 100) % sides + 1).toString()
    );

    if (this.character.roll === sides.toString() && sides === 20) {
      this.character.crit = true;
    }
    if (this.character.roll === "1" && sides === 20) {
      this.character.critmiss = true;
    }
    if (
      this.character.roll === sides.toString() &&
      (sides === 4 || sides === 6 || sides === 8 || sides === 12)
    ) {
      this.character.maxDmg = true;
    }
  }
}
