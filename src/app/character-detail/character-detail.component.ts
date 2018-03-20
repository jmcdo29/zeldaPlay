import { Component, OnInit, Input } from "@angular/core";
import { Character } from "../character";
import { Attribute } from "../attribute";

@Component({
  selector: "character-detail",
  templateUrl: "./character-detail.component.html",
  styleUrls: ["./character-detail.component.css"]
})
export class CharacterDetailComponent implements OnInit {
  @Input() character: Character;

  rollMod: string = "null";
  roll: string;
  editMode: boolean = false;
  crit: boolean = false;
  critmiss: boolean = false;
  maxDmg: boolean = false;
  
  showDets: boolean = true;
  showSkills: boolean = true;
  showWeapon: boolean =true;
  showMagic: boolean = true;

  changeHP: boolean = false;
  changeMP: boolean = false;

  hpDmg: number;
  mpDmg: number;

  type: number = 1;

  expMod: number;

  constructor() {}

  ngOnInit() {}

  finalizeHealthMod(): void{
    this.character.health + this.hpDmg * this.type > this.character.maxHealth ? this.character.health = this.character.maxHealth : this.character.health += this.hpDmg * this.type;
    this.character.health < -10 ? this.character.health = -10 : this.character.health = this.character. health;
    this.changeHP = false;
  }

  modTheHMod(addition : number): void{
    this.hpDmg + addition > this.character.maxHealth + 10 ? this.hpDmg = this.character.maxHealth + 10 : this.hpDmg += addition;
  }

  finalizeMagicMod(): void{
    this.character.magic + this.mpDmg * this.type > this.character.maxMagic ? this.character.magic = this.character.maxMagic : this.character.magic += this.mpDmg * this.type;
    this.character.magic < 0 ? this.character.magic = 0 : this.character.magic = this.character.magic;
    this.changeMP = false;
  }

  modTheMMod(addition: number): void{
    this.mpDmg + addition > this.character.maxMagic ? this.mpDmg = this.character.maxMagic : this.mpDmg += addition;
  }

  modHealth(): void{
    this.hpDmg = 0;
    this.changeHP = !this.changeHP;
  }

  modMagic(): void{
    this.mpDmg = 0;
    this.changeMP = !this.changeMP;
  }

  expandDets(): void{
    this.showDets = !this.showDets;
    console.log(this.showDets);
  }

  expandSkill(): void{
    this.showSkills = !this.showSkills;
  }

  expandWeapon(): void{
    this.showWeapon = !this.showWeapon;
  }

  expandMagic(): void{
    this.showMagic = !this.showMagic;
  }

  print(value: string): void{
    console.log(value);
  }

  setRoll(value: string): void {
    this.roll = value;
  }

  setMod(attr: Attribute): void {
    attr.modifier =
      attr.value % 2 === 0 ? (attr.value - 10) / 2 : (attr.value - 11) / 2;
  }

  calcMod(stat: number): number {
    return stat % 2 == 0 ? (stat - 10) / 2 : (stat - 11) / 2;
  }

  setEdit(): void {
    if (this.setEdit) {
      for (let i = 0; i < this.character.attributes.length; i++) {
        this.character.attributes[i].modifier = this.calcMod(
          this.character.attributes[i].value
        );
      }
    }
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
