export class Elemental {
  private type: string;
  private attack: number;
  private numberOfAttacks: number;
  private id?: string;

  constructor(
    id: string,
    type: string,
    attack: number,
    numberOfAttacks: number
  ) {
    this.type = type;
    this.attack = attack;
    this.numberOfAttacks = numberOfAttacks;
    this.id = id;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
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

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
