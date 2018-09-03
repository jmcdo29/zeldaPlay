export class Skill {
  private trained?: boolean;
  private skillName: string;
  private ranks: number;
  private modifier?: string;
  private item?: number;
  private racial?: number;
  private misc?: number;
  private id?: string;

  constructor(
    id: string,
    skillName: string,
    ranks: number,
    trained?: boolean,
    modifier?: string,
    item?: number,
    racial?: number,
    misc?: number
  ) {
    this.skillName = skillName;
    this.ranks = ranks;
    this.trained = trained ? trained : undefined;
    this.modifier = modifier ? modifier : undefined;
    this.item = item ? item : undefined;
    this.racial = racial ? racial : undefined;
    this.misc = misc ? misc : undefined;
    this.id = id;
  }

  getSkillName(): string {
    return this.skillName;
  }

  setSkillName(skillName: string): void {
    this.skillName = skillName;
  }

  getRanks(): number {
    return this.ranks;
  }

  setRanks(ranks: number): void {
    this.ranks = ranks;
  }

  getTrained(): boolean {
    return this.trained;
  }

  setTrained(trained: boolean): void {
    this.trained = trained;
  }

  getModifier(): string {
    return this.modifier;
  }

  setModifier(modifier: string): void {
    this.modifier = modifier;
  }

  getItem(): number {
    return this.item;
  }

  setItem(item: number): void {
    this.item = item;
  }

  getRacial(): number {
    return this.racial;
  }

  setRacial(racial: number): void {
    this.racial = racial;
  }

  getMisc(): number {
    return this.misc;
  }

  setMisc(misc: number): void {
    this.misc = misc;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
