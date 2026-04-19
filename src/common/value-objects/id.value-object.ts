export class ID {
  public value: number;
  constructor(value?: number) {
    this.value = value ?? -1;
  }

  toJSON() {
    return this.value;
  }
}
