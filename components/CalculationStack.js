export default class CalculationStack {
  #dp;
  constructor() {
    this.clear();
  }

  clear() {
    this.a = 0;
    this.b = null;
    this.action = null;
    this.#dp = false;
  }

  // getter:
  get dp() {
    return this.#dp;
  }

  // setter:
  set dp(value) {
    let number = this.action ? this.b : this.a;
    if(!`${number}`.includes(".")) {
      this.#dp = value;
    }
  }

  addDigit(digit) {
    if (this.action) {
      this.b = Number(String(this.b ? this.b : 0) + (this.#dp ? "." + digit : digit));
      this.#dp = false;
      return this.b;
    } else {
        this.a = Number(String(this.a ? this.a : 0) + (this.#dp ? "." + digit : digit));
        this.#dp = false;
        return this.a;
    }
  }

  deleteLastDigit() {
    if (this.action) {
      return (this.b = Number(String(this.b ? this.b : 0).slice(0, -1)));
    } else {
      return (this.a = Number(String(this.a ? this.a : 0).slice(0, -1)));
    }
  }

  setAction(action) {
    this.action = action;
  }

  calculate() {
    return this.action.do(this.a, this.b);
  }

}