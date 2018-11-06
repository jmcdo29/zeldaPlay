export class Elemental {
  constructor(
    private _id: string,
    private _type: string,
    private _attack: number,
    private _numberOfAttacks: number
  ) {}

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get attack(): number {
    return this._attack;
  }

  set attack(attack: number) {
    this._attack = attack;
  }

  get numberOfAttacks(): number {
    return this._numberOfAttacks;
  }

  set numberOfAttacks(nOfA: number) {
    this._numberOfAttacks = nOfA;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
