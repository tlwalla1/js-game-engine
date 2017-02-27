import { Core } from './core';

export class VertexBuffer {
  private verticesOfSquare = [
     0.5,  0.5, 0.0,
    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
  ];
  private _squareVertexBuffer: WebGLBuffer;

  constructor(core?: Core) {
    this._squareVertexBuffer = null;
  }

  initialize(core: Core) {
    const gl = core.gl;

    // Step A: Create a buffer on the GL context for our vertex positions
    this._squareVertexBuffer = gl.createBuffer();

    // Step B: Activate the vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this._squareVertexBuffer);

    // Step C: Load verticesOfSquare into the vertexBuffer
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.verticesOfSquare),
      gl.STATIC_DRAW,
    );
  }

  get squareVertexBuffer() {
    return this._squareVertexBuffer;
  }
}