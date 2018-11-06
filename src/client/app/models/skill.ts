export class Skill {
  constructor(
    private _id: string,
    private _skillName: string,
    private _ranks: number,
    private _trained?: boolean,
    private _modifier?: string,
    private _item?: number,
    private _racial?: number,
    private _misc?: number
  ) {}

  get skillName(): string {
    return this._skillName;
  }

  set skillName(skillName: string) {
    this._skillName = skillName;
  }

  get ranks(): number {
    return this._ranks;
  }

  set ranks(ranks: number) {
    this._ranks = ranks;
  }

  get trained(): boolean {
    return this._trained;
  }

  set trained(trained: boolean) {
    this._trained = trained;
  }

  get modifier(): string {
    return this._modifier;
  }

  set modifier(modifier: string) {
    this._modifier = modifier;
  }

  get item(): number {
    return this._item;
  }

  set item(item: number) {
    this._item = item;
  }

  get racial(): number {
    return this._racial;
  }

  set racial(racial: number) {
    this._racial = racial;
  }

  get misc(): number {
    return this._misc;
  }

  set misc(misc: number) {
    this._misc = misc;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
