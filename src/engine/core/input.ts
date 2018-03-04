import { Keys } from './utils/keys';

// TODO: Refactor this to utilize RxJS obserables for keyboard listening and emit events
export class Input {
  private previousKeyState: Array<boolean>;
  private keysPressed: Array<boolean>;
  private keysUp: Array<boolean>;

  constructor() {
    this.previousKeyState = new Array<boolean>(222);
    this.keysPressed = new Array(222);
    this.keysUp = new Array(222);
    this.previousKeyState.forEach((value, index) => {
      this.previousKeyState[index] = false;
      this.keysPressed[index] = false;
      this.keysUp[index] = false;
    });
    this.registerEventHandlers();
  }

  public isKeyPressed(keyCode: Keys): boolean {
    return this.keysPressed[keyCode];
  }

  public isKeyUp(keyCode: Keys): boolean {
    return this.keysUp[keyCode];
  }

  public update() {
    for (let i = 0; i < Keys.LastKeyCode; i++) {
      this.keysUp[i] = this.previousKeyState[i] && !this.keysPressed[i];
      this.previousKeyState[i] = this.keysPressed[i];
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keysPressed[event.keyCode] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keysPressed[event.keyCode] = false;
  }

  private registerEventHandlers() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }
}