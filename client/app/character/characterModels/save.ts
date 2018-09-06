export class Save {
  private racial: number;
  private name: string;
  private modifier: string;
  private id?: string;

  constructor(id: string, name: string, modifier: string, racial: number) {
    this.id = id;
    this.name = name;
    this.modifier = modifier;
    this.racial = racial;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getRacial(): number {
    return this.racial;
  }

  setRacial(racial: number): void {
    this.racial = racial;
  }

  getModifier(): string {
    return this.modifier;
  }

  setModifier(modifier: string): void {
    this.modifier = modifier;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
