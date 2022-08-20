import Calculator from './calculator.js';

export default class Keyboard {
  static buttons = [
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
    ["division", "/"],
    ["delete", "&#8592"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["multiplication", "*"],
    ["clear", "C"],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["minus", "-"],
    ["zero", "0"],
    ["dot", "."],
    ["plus", "+"],
    ["equal", "="],
  ];
    constructor() {
      this.init();
    }

    init() {
      this.keyboard = document.createElement("div");
      this.keyboard.className = "keyboard";
      Keyboard.buttons.map(([name, symbol]) => {
        let button = document.createElement("button");
        button.className = `${name}`;
        button.innerHTML = `${symbol}`;
        button.addEventListener("click", (event) => {
          Calculator.keyPressed({
            event: event,
            name: name,
            symbol: symbol
          });
        });
        this.keyboard.appendChild(button);
      });
    }

    getView(){
        return this.keyboard;
    }
}
