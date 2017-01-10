import { initSimpleShader, gSimpleShader, gShaderVertexPositionAttribute } from './shader-support';
import { initSquareBuffer } from './vertex-buffer';

export var gl: WebGLRenderingContext;

function drawSquare() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(gSimpleShader);

  gl.enableVertexAttribArray(gShaderVertexPositionAttribute);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('glcanvas');
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl !== null) {
    gl.clearColor(0.0, 0.8, 0.0, 1.0);

    initSquareBuffer();

    initSimpleShader('VertexShader', 'FragmentShader');
  }

  drawSquare();
}

init();
