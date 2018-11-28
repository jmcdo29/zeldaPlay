import { Elemental } from '#Models/weapons/elemental';

export class Weapon {
  constructor(
    private _id?: string,
    private _name?: string,
    private _attack?: number,
    private _numberOfAttacks?: number,
    private _critRange?: number[],
    private _critDamage?: number,
    private _type?: string,
    private _modifier?: string,
    private _range?: number,
    private _ammo?: number,
    private _element?: Elemental
  ) {}

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
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

  get critRange(): number[] {
    return this._critRange;
  }

  set critRange(critRange: number[]) {
    this._critRange = critRange;
  }

  get critDamage(): number {
    return this._critDamage;
  }

  set critDamage(critDamage: number) {
    this._critDamage = critDamage;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get modifier(): string {
    return this._modifier;
  }

  set modifier(modifier: string) {
    this._modifier = modifier;
  }

  get range(): number {
    return this._range;
  }

  set range(range: number) {
    this._range = range;
  }

  get element(): Elemental {
    return this._element;
  }

  set element(element: Elemental) {
    this._element = element;
  }

  get ammo(): number {
    return this._ammo;
  }

  set ammo(ammo: number) {
    this._ammo = ammo;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
