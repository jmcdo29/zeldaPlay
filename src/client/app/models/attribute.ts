export class Attribute {
  private name: string;
  private value: number;
  private modifier: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
    this.modifier = (value % 2 === 0 ? value - 10 : value - 11) / 2;
  }

  getName(): string {
    return this.name;
  }

  getValue(): number {
    return this.value;
  }

  getModifier(): number {
    return this.modifier;
  }

  setName(name: string): void {
    this.name = name;
  }

  setValue(value: number): void {
    this.value = value;
    this.modifier = (value % 2 === 0 ? value - 10 : value - 11) / 2;
  }

  changeValue(delta: number): void {
    const value = this.value;
    this.setValue(value + delta);
  }
}
