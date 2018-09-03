export class Item {
  private name: string;
  private description: string;
  private id?: string;

  constructor(id: string, name: string, description: string) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getId(): string {
    return this.id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(desc: string): void {
    this.description = desc;
  }

  setId(id: string): void {
    this.id = id;
  }
}
