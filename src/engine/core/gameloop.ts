class Timing {
  current: number;
  elapsed: number;
  previous: number;
  lag: number;
  constructor(private fps = 60) {
    this.current = Date.now();
    this.elapsed = 0;
    this.previous = this.current;
    this.lag = 0;
  }
  addLag() {
    this.lag += this.elapsed;
  }
  subtractLag() {
    this.lag -= this.fps;
  }
}

export interface LoopContext {
  draw: Function,
  update: Function,
}

export class GameLoop {
  private draw: Function = () => {};
  private millisecondsPerFrame: number;
  private timing: Timing;
  private updateFunctions: Function[];
  
  constructor(private fps = 60, private isRunning = false) {
    this.millisecondsPerFrame = 1000 / this.fps;
    this.updateFunctions = [];
  }

  start() {
    this.timing = new Timing(this.fps);
    this.isRunning = true;
    this.loop();
  }

  registerDrawFunction(draw: Function) {
    this.draw = draw;
  }

  registerUpdateFunction(fn: Function, order?: number) {
    this.updateFunctions.push(fn);
  }

  private loop() {
    return requestAnimationFrame(() => this.run());
  }

  private run() {
    if (!this.isRunning) {
      return;
    }
    // A: Setup looping
    this.loop();

    this.timing.current = Date.now();
    this.timing.elapsed = this.timing.current - this.timing.previous;
    this.timing.previous = this.timing.current;
    this.timing.addLag();

    // C: Update game an appropriate amount of times to catch up on lag.
    while (this.timing.lag >= this.fps && this.isRunning) {
      this.updateFunctions.map(update => update());
      // this.game.update();
      this.timing.subtractLag();
    }

    this.draw();
  }
}