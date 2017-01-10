import { gl } from './webgl';
import { squareVertexBuffer } from './vertex-buffer';

export var gSimpleShader: WebGLProgram = null;
export var gShaderVertexPositionAttribute: number = null;

function loadAndCompileShader(id: string, shaderType: number) {
  // A: Get the shader source from index.html
  const shaderText = document.getElementById(id);
  const shaderSource = shaderText.firstChild.textContent;

  // B: Create the shader based on the source type: vertex or fragment
  const compiledShader = gl.createShader(shaderType);

  // C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // D: Check for an error and return the result
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    alert(`A shader compiling error occured: ${gl.getShaderInfoLog(compiledShader)}`);
  }
  return compiledShader;
}

export function initSimpleShader(vertexShaderID: string, fragmentShaderID: string) {
  // A: Load and compile the vertex and fragment shaders
  const vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  const fragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

  // B: Create and link the shaders into a program
  gSimpleShader = gl.createProgram();
  gl.attachShader(gSimpleShader, vertexShader);
  gl.attachShader(gSimpleShader, fragmentShader);
  gl.linkProgram(gSimpleShader);

  // C: Check for an error
  if (!gl.getProgramParameter(gSimpleShader, gl.LINK_STATUS)) {
    alert('Error linking shader');
  }

  // D: Gets a reference to the aSquareVertexPosition attribute
  gShaderVertexPositionAttribute = gl.getAttribLocation(gSimpleShader, 'aSquareVertexPosition');

  // E: Activates the vertex buffer loaded in VertexBuffer.ts
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);

  // F: Describe the characteristic of the vertex position attribute
  gl.vertexAttribPointer(gShaderVertexPositionAttribute,
    3, // Each vertex element is a 3-float (x, y, z)
    gl.FLOAT, // Data type is FLOAT
    false, // If the content is normalized vectors
    0, // Number of bytes to skip in between elements
    0, // Offsets to the first element
  );
}