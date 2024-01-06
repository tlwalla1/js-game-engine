// TODO: Refactor this to utilize RxJS observables for keyboard listening and emit events
export class Input {
  private previousKeyState: Map<string, boolean>;
  private keysPressed: Map<string, boolean>;
  private keysUp: Map<string, boolean>;

  constructor() {
    this.previousKeyState = new Map<string, boolean>();
    this.keysPressed = new Map<string, boolean>();
    this.keysUp = new Map<string, boolean>();
    this.registerEventHandlers();
  }

  public isKeyPressed(key: string): boolean {
    return !!this.keysPressed.get(key);
  }

  public isKeyUp(key: string): boolean {
    return !!this.keysUp.get(key);
  }

  public update() {
    this.keysPressed.forEach((isPressed, key) => {
      this.keysUp.set(key, this.previousKeyState.get(key) && !this.keysPressed.get(key));
      this.previousKeyState.set(key, isPressed);
    });
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keysPressed.set(event.key, true);
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keysPressed.set(event.key, false);
  }

  private registerEventHandlers() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }
}