export class Note {
  private time: string;
  private msg: string;
  private important: boolean;
  private id?: string;

  constructor(id: string, msg: string, time: string, important: boolean) {
    this.msg = msg;
    this.time = time;
    this.important = important;
    this.id = id;
  }

  getMsg(): string {
    return this.msg;
  }

  setMsg(msg: string): void {
    this.msg = msg;
  }

  getTime(): string {
    return this.time;
  }

  setTime(time: string): void {
    this.time = time;
  }

  getImportant(): boolean {
    return this.important;
  }

  setImportant(important: boolean): void {
    this.important = important;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
