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

export class GameLoop {
  private millisecondsPerFrame: number;
  private timing: Timing;
  
  constructor(private game: any, private fps = 60, private isRunning = false) {
    this.millisecondsPerFrame = 1000 / this.fps;
  }

  start() {
    this.timing = new Timing(this.fps);
    this.isRunning = true;
    this.loop();
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
      this.game.update();
      this.timing.subtractLag();
    }

    this.game.draw();
  }
}