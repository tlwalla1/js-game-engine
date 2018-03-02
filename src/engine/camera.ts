import { Core, Color, Position } from './core';
import { mat4 } from 'gl-matrix';

export class Camera {
  private center: Position;
  private viewport: number[];
  private nearPlane: number;
  private farPlane: number;
  private viewMatrix: mat4;
  private viewportMatrix: mat4;
  private projectionMatrix: mat4;
  public backgroundColor: Color;
  public width: number;

  constructor(center: Position, width: number, viewportArray: number[], private core: Core) {
    this.center = center;
    this.width = width;
    this.viewport = viewportArray;
    this.nearPlane = 0;
    this.farPlane = 1000;

    // Transformation Matrices
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.viewportMatrix = mat4.create();

    // Background Color
    this.backgroundColor = new Color(0.8, 0.8, 0.8, 1);
  }
  setCenter(x: number, y: number) {
    this.center = new Position(x, y);
  }
  getCenter(): Position { return this.center }
  getViewProjectionMatrix(): mat4 {
    return this.viewportMatrix;
  }
  setupViewProjection(): void {
    const gl = this.core.gl;
    gl.viewport(
      this.viewport[0],
      this.viewport[1],
      this.viewport[2],
      this.viewport[3]
    );

    gl.scissor(
      this.viewport[0],
      this.viewport[1],
      this.viewport[2],
      this.viewport[3]
    );

    gl.clearColor(
      this.backgroundColor.red,
      this.backgroundColor.green,
      this.backgroundColor.blue,
      this.backgroundColor.alpha
    );

    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    mat4.lookAt(this.viewMatrix,
      [this.center.x, this.center.y, 10],
      [this.center.x, this.center.y, 0],
      [0, 1, 0]
    );

    const halfWCWidth = 0.5 * this.width;
    const aspectRatio = this.viewport[3] / this.viewport[2];
    const halfWCHeight = halfWCWidth * aspectRatio;
    mat4.ortho(
      this.projectionMatrix,
      -halfWCWidth,
      halfWCWidth,
      -halfWCHeight,
      halfWCHeight,
      this.nearPlane,
      this.farPlane
    );

    mat4.multiply(this.viewportMatrix, this.projectionMatrix, this.viewMatrix);
  }
}
