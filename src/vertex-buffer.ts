import { gl } from './webgl';

export let squareVertexBuffer: WebGLBuffer = null;

export function initSquareBuffer() {
  const verticesOfSquare = [
     0.5,  0.5, 0.0,
    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
  ]

  // A: Create a buffer on the gl context for our vertex positions
  squareVertexBuffer = gl.createBuffer();

  // B: Activate vertextBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);

  // C: Loads verticesOfSquare into the vertexBuffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
}