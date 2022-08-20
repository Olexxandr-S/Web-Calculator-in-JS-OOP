export default class CalculationStack {
  #action;

  constructor() {
    this.clear();
  }

  get action() {
    return this.#action;
  }

  set action(newAction) {
    // todo: check if newAction is type of class Action;
    this.#action = newAction;
  }

  clear() {
    this.a = 0;
    this.b = null;
    this.#action = null;
    return this.a;
  }

  addDigit(number) {
    if(this.action) {
      return (this.b = Number(`${Number(this.b)}${Number(number)}`));
    } else {
      return (this.a = Number(`${Number(this.a)}${Number(number)}`));
    }
  }

  deleteLastDigit() {
    if(this.action) {
      return (this.b = (`${Number(this.b)}`.length > 1) ? Number(String(this.b).slice(0, -1)) : 0);
    } else {
      return (this.a = (`${Number(this.a)}`.length > 1) ? Number(String(this.a).slice(0, -1)) : 0);
    }
  }

  calculate() {
    return this.#action.do(this.a, this.b);
  }

  toObject() {
    return {
      a: this.a,
      b: this.b,
      action: this.#action.symbol
    }
  }

}