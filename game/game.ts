import {
  Camera,
  Color,
  Core,
  Position,
  Renderable,
  RotationDirection,
  SimpleShader,
  Size,
  VertexBuffer,
} from '../src/engine';
// import { mat4, vec2, vec3 } from 'gl-matrix';

export class Game {
  private camera: Camera;
  private core: Core;
  private hasUpdated: boolean;
  private renderables: Renderable[];
  private shader: SimpleShader;
  private vertexBuffer: VertexBuffer;

  constructor(htmlCanvasId: string) {
    this.core = new Core();
    this.vertexBuffer = new VertexBuffer(this.core);
    this.renderables = [];
    this.core.setVertexBuffer(this.vertexBuffer);
    this.core.initialize(htmlCanvasId, { update: this.update.bind(this), draw: this.draw.bind(this) });
    this.initialize();
  }

  initialize() {
    this.camera = new Camera(
      new Position(20, 60),
      20,
      [20, 40, 600, 300],
      this.core
    );
    this.camera.backgroundColor = new Color(
      0.8,
      0.8,
      0.8,
      1
    );

    this.shader = new SimpleShader(this.core);
    this.shader.initialize(
      'src/glslshaders/simple-vs.glsl',
      'src/glslshaders/simple-fs.glsl'
    );

    const whiteSquare = new Renderable(this.core, this.shader);
    whiteSquare.color = new Color(1, 1, 1, 1);
    const redSquare = new Renderable(this.core, this.shader);
    redSquare.color = new Color(1, 0, 0, 1);

    whiteSquare.transform.position = new Position(20, 60);
    whiteSquare.transform.rotationInRadians = 0.2;
    whiteSquare.transform.size = new Size(5, 5);

    redSquare.transform.position = new Position(20, 60);
    redSquare.transform.size = new Size(2, 2);

    this.renderables.push(whiteSquare, redSquare);

    this.core.startGame();
  }

  private draw() {
    if (!this.hasUpdated) {
      return;
    }
    this.core.clearCanvas(new Color(0.9, 0.9, 0.9, 1));
    this.camera.setupViewProjection();
    this.renderables.forEach(item => item.draw(this.camera.getViewProjectionMatrix()));
    this.hasUpdated = false;
  }

  private update() {
    const whiteTransform = this.renderables[0].transform;
    const deltaX = 0.5;

    if (this.core.input.isKeyPressed('ArrowRight')) {
      if (whiteTransform.position.x > 30) {
        whiteTransform.position = new Position(10, 60);
      }
      whiteTransform.position.x += deltaX;
    }

    if (this.core.input.isKeyPressed('ArrowUp')) {
      whiteTransform.rotateByDegrees(1, RotationDirection.Clockwise);
    }

    if (this.core.input.isKeyPressed('ArrowDown')) {
      const redTransform = this.renderables[1].transform;
      if (redTransform.size.width > 5) {
        redTransform.size = new Size(2, 2);
      }
      redTransform.size.scaleBy(0.05);
    }

    this.hasUpdated = true;
  }
}

// export function initGame(htmlCanvasId: string) {
//   // A: Initialize the webGL context
//   const core = new Core();
//   const vertexBuffer = new VertexBuffer(core);
//   core.setVertexBuffer(vertexBuffer);
//   core.initializeWebGL(htmlCanvasId);

//   // B: Setup the camera
//   const camera = new Camera(new Position(20, 60), 20, [20, 40, 600, 300], core);

//   // C: Create the shader
//   const shader = new SimpleShader(core);
//   shader.initialize(
//     'src/glslshaders/simple-vs.glsl',
//     'src/glslshaders/simple-fs.glsl',
//   );

//   // D: Create the Renderable objects
//   const blueSq = new Renderable(core, shader);
//   blueSq.color = new Color(0, 0, 1, 1);

//   const redSq = new Renderable(core, shader);
//   redSq.color = new Color(1, 0, 0, 1);

//   const topLeftSq = new Renderable(core, shader);
//   topLeftSq.color = new Color(0.9, 0.1, 0.1, 1);

//   const topRightSq = new Renderable(core, shader);
//   topRightSq.color = new Color(0.1, 0.9, 0.1, 1);

//   const bottomRightSq = new Renderable(core, shader);
//   bottomRightSq.color = new Color(0.1, 0.1, 0.9, 1);

//   const bottomLeftSq = new Renderable(core, shader);
//   bottomLeftSq.color = new Color(0.1, 0.1, 0.1, 1);

//   // E: Clear the entire canvas first
//   core.clearCanvas(new Color(0.9, 0.9, 0.9, 1));

//   camera.setupViewProjection();
//   // const viewMatrix = camera.viewportMatrix;
//   const viewProjectionMatrix = camera.getViewProjectionMatrix();

//   // F: Draw the blue square
//   blueSq.transform.position = new Position(20, 60);
//   blueSq.transform.rotationInRadians = 0.2;
//   blueSq.transform.size = new Size(5, 5);
//   blueSq.draw(viewProjectionMatrix);

//   // G: Draw the center red and corner squares
//   redSq.transform.position = new Position(20, 60);
//   redSq.transform.size = new Size(2, 2);
//   redSq.draw(viewProjectionMatrix);

//   topLeftSq.transform.position = new Position(10, 65);
//   topLeftSq.draw(viewProjectionMatrix);

//   topRightSq.transform.position = new Position(30, 65);
//   topRightSq.draw(viewProjectionMatrix);

//   bottomRightSq.transform.position = new Position(30, 55);
//   bottomRightSq.draw(viewProjectionMatrix);

//   bottomLeftSq.transform.position = new Position(10, 55);
//   bottomLeftSq.draw(viewProjectionMatrix);
// }