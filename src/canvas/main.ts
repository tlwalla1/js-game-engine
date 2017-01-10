export function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl !== null) {
    gl.clearColor(0.0, 0.8, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

init();
