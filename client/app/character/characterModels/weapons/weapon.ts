import { Elemental } from './elemental';

export class Weapon {
  private name: string;
  private attack: number; // Number of sides the damage dice has
  private numberOfAttacks: number; // For the in case you have multiple attack dice
  private critRange: number[]; // Values for which rolling a crit leads to crit damage
  private critDamage: number; // Crit damage multiplier
  private type: string;
  private modifier: string;
  private range: number;
  private element?: Elemental;
  private ammo?: number;
  private id?: string;

  constructor(
    id: string,
    name: string,
    attack: number,
    nOfA: number,
    critRange: number[],
    critDamage: number,
    type: string,
    modifier: string,
    range: number,
    ammo?: number,
    element?: Elemental
  ) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.numberOfAttacks = nOfA;
    this.critRange = critRange;
    this.critDamage = critDamage;
    this.type = type;
    this.modifier = modifier;
    this.range = range;
    this.ammo = ammo;
    this.element = element;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getAttack(): number {
    return this.attack;
  }

  setAttack(attack: number): void {
    this.attack = attack;
  }

  getNOfA(): number {
    return this.numberOfAttacks;
  }

  setNOfA(nOfA: number): void {
    this.numberOfAttacks = nOfA;
  }

  getCritRange(): number[] {
    return this.critRange;
  }

  setCritRange(critRange: number[]): void {
    this.critRange = critRange;
  }

  getCritDamage(): number {
    return this.critDamage;
  }

  setCritDamage(critDamage: number): void {
    this.critDamage = critDamage;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  getModifier(): string {
    return this.modifier;
  }

  setModifier(modifier: string): void {
    this.modifier = modifier;
  }

  getRange(): number {
    return this.range;
  }

  setRange(range: number): void {
    this.range = range;
  }

  getElement(): Elemental {
    return this.element;
  }

  setElement(element: Elemental): void {
    this.element = element;
  }

  getAmmo(): number {
    return this.ammo;
  }

  setAmmo(ammo: number): void {
    this.ammo = ammo;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
