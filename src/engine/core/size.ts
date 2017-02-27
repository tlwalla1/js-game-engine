export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  toArray() {
    return [this.width, this.height];
  }
}