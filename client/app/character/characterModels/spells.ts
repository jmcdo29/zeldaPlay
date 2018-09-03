export class Spell {
  private name: string;
  private effect: string;
  private mpUse: number;
  private damage: number;
  private multiplier: number;
  private modifier?: string;
  private diety: string;
  private useDiety = false;
  private id?: string;

  constructor(
    id: string,
    name: string,
    effect: string,
    damage: number,
    multiplier: number,
    mpUse: number,
    diety: string,
    useDiety: boolean,
    modifier: string
  ) {
    this.id = id;
    this.name = name;
    this.effect = effect;
    this.damage = damage;
    this.multiplier = multiplier;
    this.mpUse = mpUse;
    this.diety = diety;
    this.useDiety = useDiety;
    this.modifier = modifier;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEffect(): string {
    return this.effect;
  }

  setEffect(effect: string): void {
    this.effect = effect;
  }

  getMpUse(): number {
    return this.mpUse;
  }

  setMpUse(mpUse: number): void {
    this.mpUse = mpUse;
  }

  getDamage(): number {
    return this.damage;
  }

  setDamage(damage: number): void {
    this.damage = damage;
  }

  getMultilier(): number {
    return this.multiplier;
  }

  setMultiplier(multiplier: number): void {
    this.multiplier = multiplier;
  }

  getModifier(): string {
    return this.modifier;
  }

  setModifier(modifier: string): void {
    this.modifier = modifier;
  }

  getDiety(): string {
    return this.diety;
  }

  setDiety(diety: string): void {
    this.diety = diety;
  }

  getUseDiety(): boolean {
    return this.useDiety;
  }

  setUseDiety(useDiety: boolean): void {
    this.useDiety = useDiety;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }
}
