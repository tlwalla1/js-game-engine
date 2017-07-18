import { VertexBuffer } from './vertex-buffer';

export class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(
    red: number,
    green: number,
    blue: number,
    alpha: number,
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  toArray() {
    return [this.red, this.green, this.blue, this.alpha];
  }
}

export class Core {
  /**
   * Class Variables
   * -----------------------------------------
   */
  // The graphical context for drawing.
  private _gl: WebGLRenderingContext;
  private _vertexBuffer: VertexBuffer;

  constructor(vertexBuffer?: VertexBuffer) {
    this._vertexBuffer = vertexBuffer || null;
  }

  /**
   * Class Methods
   * -----------------------------------------
   */

  /**
   * Clears the color passed to the function.
   */
  clearCanvas(color: Color) {
    if (!this._gl) {
      console.warn('GL has not been defined yet');
      return;
    }
    // Set the color to be cleared
    this._gl.clearColor(color.red, color.green, color.blue, color.alpha);
    // Clear to the color previously set
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  }
  /**
   * Initializes the WebGL control and the VertexBuffer
   * IMPORTANT: VertexBuffer should be set prior to calling this function
   * using the 'setVertexBuffer' function.
   */
  initializeWebGL(htmlCanvasId: string) {
    const canvas = <HTMLCanvasElement>document.getElementById(htmlCanvasId);

    // Get the standard or experimental webgl and binds to the Canvas area
    // store the results to the isntance variable _gl
    this._gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (this._gl === null) {
      document.write('<br><b>WebGL is not supported!</b></br>');
      return;
    }

    // Now initialize the VertexBuffer
    this._vertexBuffer.initialize(this);
  }
  setVertexBuffer(vertexBuffer: VertexBuffer) {
    this._vertexBuffer = vertexBuffer;
  }

  /**
   * Getters and Setters
   * -----------------------------------------
   */
  get gl() {
    return this._gl;
  }
  get vertexBuffer() {
    return this._vertexBuffer;
  }
}