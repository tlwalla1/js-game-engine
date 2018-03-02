export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  scaleBy(amount: number) {
    this.width += amount;
    this.height += amount;
  }
  toArray() {
    return [this.width, this.height];
  }
}