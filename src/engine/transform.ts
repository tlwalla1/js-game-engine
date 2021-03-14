import { Position, Size } from './core';
import { vec2, vec3, mat4 } from 'gl-matrix';

export enum RotationDirection {
  Clockwise = -1,
  None,
  CounterClockwise,
};

const convertToRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
}

export class Transform {
  private _position: Position;
  private _rotationInRad: number;
  private _scale: Size;

  constructor() {
    this._position = new Position(0, 0); // translation operator
    this._rotationInRad = 0.0; // rotation
    this._scale = new Size(1, 1); // scaling operator
  }
  set position(position: Position) {
    this._position = position;
  }
  get position() {
    return this._position;
  }
  set rotationInRadians(rotation: number) {
    this._rotationInRad = rotation;
    while (this._rotationInRad > (2 * Math.PI)) {
      this._rotationInRad -= 2 * Math.PI;
    }
    while (this._rotationInRad < (-2 * Math.PI)) {
      this._rotationInRad += 2 * Math.PI;
    }
  }
  set rotationInDegrees(rotation: number) {
    this.rotationInRadians = convertToRadians(rotation);
  }
  get rotationInRadians() {
    return this._rotationInRad;
  }
  set size(size: Size) {
    this._scale = size;
  }
  get size() {
    return this._scale;
  }
  get transform() {
    // Create a blank identity matrix
    const matrix = mat4.create();

    const position = this.position;
    const size = this.size;

    // Compute the translation, for now z is always at 0.0
    mat4.translate(matrix, matrix, vec3.fromValues(position.x, position.y, 0.0));
    // Concatenate with rotation
    mat4.rotateZ(matrix, matrix, this.rotationInRadians);
    // Concatenate with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(size.width, size.height, 1.0));

    return matrix;
  }
  rotateByDegrees(degrees: number, direction: RotationDirection) {
    this.rotationInRadians = this.rotationInRadians + (direction * convertToRadians(degrees));
  }
  // set height(height: number) {
  //   this._scale[1] = height;
  // }
  // get height() {
  //   return this._scale[1];
  // }
  // set width(width: number) {
  //   this._scale[0] = width;
  // }
  // get width() {
  //   return this._scale[0];
  // }
  // set x(x: number) {
  //   this._position[0] = x;
  // }
  // get x() {
  //   return this._position[0];
  // }
  // set y(y: number) {
  //   this._position[1] = y;
  // }
  // get y() {
  //   return this._position[1];
  // }
}