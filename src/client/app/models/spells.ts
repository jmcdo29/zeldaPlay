export class Spell {
  constructor(
    private _id: string,
    private _name: string,
    private _effect: string,
    private _damage: number,
    private _multiplier: number,
    private _mpUse: number,
    private _diety: string,
    private _useDiety: boolean,
    private _modifier: string
  ) {}

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get effect(): string {
    return this._effect;
  }

  set effect(effect: string) {
    this._effect = effect;
  }

  get mpUse(): number {
    return this._mpUse;
  }

  set mpUse(mpUse: number) {
    this._mpUse = mpUse;
  }

  get damage(): number {
    return this._damage;
  }

  set damage(damage: number) {
    this._damage = damage;
  }

  get multiplier(): number {
    return this._multiplier;
  }

  set multiplier(multiplier: number) {
    this._multiplier = multiplier;
  }

  get modifier(): string {
    return this._modifier;
  }

  set modifier(modifier: string) {
    this._modifier = modifier;
  }

  get diety(): string {
    return this._diety;
  }

  set diety(diety: string) {
    this._diety = diety;
  }

  get useDiety(): boolean {
    return this._useDiety;
  }

  set useDiety(useDiety: boolean) {
    this._useDiety = useDiety;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
