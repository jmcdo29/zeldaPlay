export class Save {
  constructor(
    private _id?: string,
    private _name?: string,
    private _modifier?: string,
    private _racial?: number
  ) {}

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get racial(): number {
    return this._racial;
  }

  set racial(racial: number) {
    this._racial = racial;
  }

  get modifier(): string {
    return this._modifier;
  }

  set modifier(modifier: string) {
    this._modifier = modifier;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
