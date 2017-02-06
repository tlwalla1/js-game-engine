import { Core } from './core';

export class SimpleShader {
  private _compiledShader: WebGLProgram;
  private shaderVertexPositionAttribute: number;
  private core: Core;
  private gl: WebGLRenderingContext;

  constructor(core: Core) {
    this.core = core;
    this.gl = core.gl;
    this._compiledShader = null;
    this.shaderVertexPositionAttribute = null;
  }
  /**
   * Initialize the SimpleShader
   * IMPORTANT: Requires Core to be constructed and linked to a VertexBuffer
   * prior to being ran.
   */
  initialize(vertexShaderId: string, fragmentShaderId: string): void {
    // A: load and compile the vertex and fragment shaders
    const vertexShader = this.loadAndCompileShader(vertexShaderId, this.gl.VERTEX_SHADER);
    const fragmentShader = this.loadAndCompileShader(fragmentShaderId, this.gl.FRAGMENT_SHADER);

    // B: Create and link the shaders into a program.
    this._compiledShader = this.gl.createProgram();
    this.gl.attachShader(this._compiledShader, vertexShader);
    this.gl.attachShader(this._compiledShader, fragmentShader);
    this.gl.linkProgram(this._compiledShader);

    // C: Check for errors
    if (!this.gl.getProgramParameter(this._compiledShader, this.gl.LINK_STATUS)) {
      console.error('Error linking shader');
      return null;
    }

    // D: Gets a reference to the squareVertexPosition attribute
    this.shaderVertexPositionAttribute = this.gl.getAttribLocation(
      this._compiledShader,
      'aSquareVertexPosition',
    );

    // E: Activate the vertex buffer loaded in the Core's VertexBuffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.core.vertexBuffer.squareVertexBuffer);

    // F: Describe the characteristic of the vertex position attribute
    this.gl.vertexAttribPointer(this.shaderVertexPositionAttribute,
      3, // Each element is a 3-float (x,y,z)
      this.gl.FLOAT, // data type is a FLOAT
      false, // if the content is normalized vectors
      0, // number of bytes to skip in between elements
      0, // offset to the first element
    )
  }
  /**
   * Sets the program for the Engine Core
   * Enables the vertix attribute for the shader
   */
  activateShader() {
    this.gl.useProgram(this._compiledShader);
    this.gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
  }

  private loadAndCompileShader(id: string, shaderType: number) {
    // TODO: Make this more generic (injected)
    const shaderText = document.getElementById(id);
    const shaderSource = shaderText.firstChild.textContent;
  
    // A: Create the shader based on the shader type: vertex or fragment
    const _compiledShader = this.gl.createShader(shaderType);

    // B: Compile the created shader
    this.gl.shaderSource(_compiledShader, shaderSource);
    this.gl.compileShader(_compiledShader);

    // C: Check for errors and return the results (null if error)
    // The log info is how the shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!this.gl.getShaderParameter(_compiledShader, this.gl.COMPILE_STATUS)) {
      console.error(`A shader compiling error occured: ${this.gl.getShaderInfoLog(_compiledShader)}`);
    }

    return _compiledShader;
  }

  get compiledShader() {
    return this._compiledShader;
  }
}