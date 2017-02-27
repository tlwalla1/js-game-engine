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
  const whiteSq = new Renderable(core, shader);
  whiteSq.color = new Color(1, 1, 1, 1);
  const redSq = new Renderable(core, shader);
  redSq.color = new Color(1, 0, 0, 1);

  // D: Draw
  core.clearCanvas(new Color(0, 0.8, 0, 1));
  const transform = mat4.create();

  // E: Compute the white square transform
  mat4.translate(transform, transform, vec3.fromValues(-0.25, 0.25, 0.0));
  mat4.rotateZ(transform, transform, 0.2); // rotation in radians
  mat4.scale(transform, transform, vec3.fromValues(1.2, 1.2, 1.0));
  whiteSq.transform.position = new Position(-0.25, 0.25);
  whiteSq.transform.rotationInRadians = 0.2;
  whiteSq.transform.size = new Size(1.2, 1.2);

  // F: Draw the white square with the computed transform
  whiteSq.draw();

  // G: Compute the red square transform
  mat4.identity(transform);
  mat4.translate(transform, transform, vec3.fromValues(0.25, -0.25, 0.0));
  mat4.rotateZ(transform, transform, -0.785); // rotation of about -45 degrees
  mat4.scale(transform, transform, vec3.fromValues(0.4, 0.4, 1.0));
  redSq.transform.position.x = 0.25;
  redSq.transform.position.y = -0.25;
  redSq.transform.rotationInDegrees = 45;
  redSq.transform.size.width = 0.4,
  redSq.transform.size.height = 0.4,
  // redSq.transform.size = new Size(0.4, 0.4);

  // H: Draw the red square with the computed transform
  redSq.draw();
}