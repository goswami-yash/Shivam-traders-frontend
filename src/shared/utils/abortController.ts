class Abort{
  private controllers: Map<string, AbortController> = new Map();

  getSignal(key: string) {
    if (this.controllers.has(key)) {
      this.controllers.get(key)?.abort();
    }

    const controller = new AbortController();
    this.controllers.set(key, controller);

    return controller.signal;
  }

  abort(key: string) {
    this.controllers.get(key)?.abort();
    this.controllers.delete(key);
  }

  abortAll() {
    this.controllers.forEach((c) => c.abort());
    this.controllers.clear();
  }
}

export const abort = new Abort();