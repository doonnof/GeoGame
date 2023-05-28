
export class Subject {
  constructor(value) {
    this.value = value;
    this.listeners = new Set();
  }
  get() {
    return this.value;
  }
  set(value) {
    this.value = value;
    this._notify();
  }
  subscribe(listener) {
    this.listeners.add(listener);
  }
  unsubscribe(listener){
    this.listeners.delete(listener);

  }
  _notify() {
    this.listeners.forEach((listener) => listener());
  }
}
