import { Color, Core, Position, Renderable, SimpleShader, Size, VertexBuffer } from '../engine';
import { mat4, vec3 } from 'gl-matrix';

export function initGame(htmlCanvasId: string) {
  // A: Initialize the webGL context
  const core = new Core();
  const vertexBuffer = new VertexBuffer(core);
  core.setVertexBuffer(vertexBuffer);
  core.initializeWebGL(htmlCanvasId);

  // B: Create the shader
  const shader = new SimpleShader(core);
  shader.initialize(
    'src/glslshaders/simple-vs.glsl',
    'src/glslshaders/simple-fs.glsl',
  );

  // C: Create the Renderable objects
  const blueSq = new Renderable(core, shader);
  blueSq.color = new Color(0, 0, 1, 1);

  const redSq = new Renderable(core, shader);
  redSq.color = new Color(1, 0, 0, 1);

  const topLeftSq = new Renderable(core, shader);
  topLeftSq.color = new Color(0.9, 0.1, 0.1, 1);

  const topRightSq = new Renderable(core, shader);
  topRightSq.color = new Color(0.1, 0.9, 0.1, 1);

  const bottomRightSq = new Renderable(core, shader);
  bottomRightSq.color = new Color(0.1, 0.1, 0.9, 1);

  const bottomLeftSq = new Renderable(core, shader);
  bottomLeftSq.color = new Color(0.1, 0.1, 0.1, 1);

  // D: Clear the entire canvas first
  core.clearCanvas(new Color(0.9, 0.9, 0.9, 1));

  // E: Setup Viewport
  core.gl.viewport(20, 40, 600, 300);
  core.gl.scissor(20, 40, 600, 300);

  // Test viewport using scissor test (is expensive)
  core.gl.enable(core.gl.SCISSOR_TEST);
  core.clearCanvas(new Color(0.8, 0.8, 0.8, 1));
  core.gl.disable(core.gl.SCISSOR_TEST);

  // F: Setup View and Projection matrices
  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();

  mat4.lookAt(
    viewMatrix,
    [20, 60, 10],
    [20, 60, 0],
    [0, 1, 0]);

  mat4.ortho(
    projectionMatrix,
    -10,
    10,
    -5,
    5,
    0,
    1000
  );

  const viewProjectionMatrix = mat4.create();
  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  // G: Draw the blue square
  blueSq.transform.position = new Position(20, 60);
  blueSq.transform.rotationInRadians = 0.2;
  blueSq.transform.size = new Size(5, 5);
  blueSq.draw(viewProjectionMatrix);

  // H: Draw the center red and corner squares
  redSq.transform.position = new Position(20, 60);
  redSq.transform.size = new Size(2, 2);
  redSq.draw(viewProjectionMatrix);

  topLeftSq.transform.position = new Position(10, 65);
  topLeftSq.draw(viewProjectionMatrix);

  topRightSq.transform.position = new Position(30, 65);
  topRightSq.draw(viewProjectionMatrix);

  bottomRightSq.transform.position = new Position(30, 55);
  bottomRightSq.draw(viewProjectionMatrix);

  bottomLeftSq.transform.position = new Position(10, 55);
  bottomLeftSq.draw(viewProjectionMatrix);

  // C: Create the Renderable objects
  // const whiteSq = new Renderable(core, shader);
  // whiteSq.color = new Color(1, 1, 1, 1);
  // const redSq = new Renderable(core, shader);
  // redSq.color = new Color(1, 0, 0, 1);

  // // D: Draw
  // core.clearCanvas(new Color(0, 0.8, 0, 1));
  // // const transform = mat4.create();

  // // E: Compute the white square transform
  // whiteSq.transform.position = new Position(-0.25, 0.25);
  // whiteSq.transform.rotationInRadians = 0.2;
  // whiteSq.transform.size = new Size(1.2, 1.2);

  // // F: Draw the white square with the computed transform
  // whiteSq.draw();

  // // G: Compute the red square transform
  // redSq.transform.position.x = 0.25;
  // redSq.transform.position.y = -0.25;
  // redSq.transform.rotationInDegrees = 45;
  // redSq.transform.size.width = 0.4,
  // redSq.transform.size.height = 0.4,

  // // H: Draw the red square with the computed transform
  // redSq.draw();
}