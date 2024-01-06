export class ResourceMap {
  private outstandingLoads: null | number = null;
  private loadCallback: () => void;

  constructor() {}

  private checkForLoadCompletion() {
    if (this.outstandingLoads === 0 && this.loadCallback !== undefined) {
      this.loadCallback();
      this.outstandingLoads = null;
      return;
    }
  }
}