import { Color, Core, SimpleShader, VertexBuffer } from '../engine';

export function initGame(htmlCanvasId: string) {
  const core = new Core();
  const vertexBuffer = new VertexBuffer(core);
  core.setVertexBuffer(vertexBuffer);
  core.initializeWebGL(htmlCanvasId);
  const shader = new SimpleShader(core);
  shader.initialize(
    'src/glslshaders/simple-vs.glsl',
    'src/glslshaders/simple-fs.glsl',
  );

  core.clearCanvas(new Color(0, 0.8, 0, 1));
  shader.activateShader(new Color(0, 0, 1, 1).toArray());

  // Draw function
  core.gl.drawArrays(core.gl.TRIANGLE_STRIP, 0, 4);
}