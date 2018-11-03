export class Note {
  constructor(
    private _id: string,
    private _msg: string,
    private _time: string,
    private _important: boolean
  ) {}

  get msg(): string {
    return this._msg;
  }

  set msg(msg: string) {
    this._msg = msg;
  }

  get time(): string {
    return this._time;
  }

  set time(time: string) {
    this._time = time;
  }

  get important(): boolean {
    return this._important;
  }

  set important(important: boolean) {
    this._important = important;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
