import { Color, Core } from './core';
import { Transform } from './transform';
import { SimpleShader } from './simple-shader';
import { mat4 } from 'gl-matrix';

export class Renderable {
  private core: Core;
  private gl: WebGLRenderingContext;
  private shader: SimpleShader;
  private _color: Color;
  private _transform: Transform;

  constructor(core: Core, shader: SimpleShader) {
    this.core = core;
    this.gl = core.gl;
    this.shader = shader;
    this._transform = new Transform();
    this._color = new Color(1, 1, 1, 1);
  }
  draw() {
    this.shader.activateShader(this.color.toArray());
    this.shader.loadObjectTransform(this.transform.transform);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
  get color() {
    return this._color;
  }
  set color(newColor: Color) {
    this._color = newColor;
  }
  get transform() {
    return this._transform;
  }
}