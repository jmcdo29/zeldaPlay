export class Attribute {
  private _modifier: number;

  constructor(private _name: string, private _value: number) {
    this._modifier = (_value % 2 === 0 ? _value - 10 : _value - 11) / 2;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this._modifier = (value % 2 === 0 ? value - 10 : value - 11) / 2;
  }

  get modifier(): number {
    return this._modifier;
  }

  changeValue(delta: number): void {
    this.value += delta;
  }
}
