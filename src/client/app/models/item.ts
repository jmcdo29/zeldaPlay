export class Item {
  constructor(
    private _id?: string,
    private _name?: string,
    private _description?: string
  ) {}

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(desc: string) {
    this._description = desc;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
