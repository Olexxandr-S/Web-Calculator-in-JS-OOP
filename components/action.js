export default class Action {
  static ADD = new Action("+");
  static SUBTRACT = new Action("-");
  static MULTIPLY = new Action("*");
  static DEVIDE = new Action("/");

  #symbol;
  #action = new Map();

  constructor (symbol) {
    this.#symbol = symbol;
    this.#action.set("+", (a, b) => a + b);
    this.#action.set("-", (a, b) => a - b);
    this.#action.set("*", (a, b) => a * b);
    this.#action.set("/", (a, b) => a / b);
  }

  get symbol() {
    return this.#symbol; 
  }
  
  do(a, b) {
    return this.#action.get(this.#symbol)(a, b);
  }
}