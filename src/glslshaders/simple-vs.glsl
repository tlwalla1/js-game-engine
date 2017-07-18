attribute vec3 aSquareVertexPosition;

// to transform the vertex position
uniform mat4 uModelTransform;

// to represent the View-Projection transform
uniform mat4 uViewProjectionTransform;

void main(void) {
  gl_Position = uViewProjectionTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
}