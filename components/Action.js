export default class Action {
  constructor(symbol) {
    if (symbol === "+") {
      this.do = (a, b) => a + b;
    } else if (symbol === "-") {
      this.do = (a, b) => a - b;
    } else if (symbol === "/") {
      this.do = (a, b) => a / b;
    } else if (symbol === "*") {
      this.do = (a, b) => a * b;
    }
    
    this.symbol = symbol;
  }
}