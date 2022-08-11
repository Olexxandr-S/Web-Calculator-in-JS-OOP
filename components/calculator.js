import Screen from './screen.js';
import Keyboard from './keyboard.js';

export default class Calcualator {
  static root = document.querySelector('#root');
  static screen = new Screen();
  static keyboard = new Keyboard();
  static memory = new Memory();

  static createCalculator() {
    Calcualator.root.appendChild(Calcualator.screen.getView());
    Calcualator.root.appendChild(Calcualator.keyboard.getView());
  }

  static keyPressed({event, name, symbol}) {
    // console.log(`name: ${name}, symbol: ${symbol}`);
    // Calcualator.getDisplay().innerText = symbol;

    // Calcualator.screen.addHistory({a: 5, action: symbol});

    if((/[0-9]/ig).test(symbol)) {
      // write number into display

    } else if(["/", "*", "+", "-"].includes(symbol)) {
      Calcualator.memory.addNumber();

    } else if(symbol === "=") {

    } else if(symbol === ".") {

    } else if(name === "delete") {
      
    } else if(name === "clear") {
      
    }
  }

  static getDisplay() {
    return Calcualator.screen.display.getView();
  }

}


class Memory {
  constructor() {
    this.a = null;
    this.b = null;
    this.action = null;
  }

  addNumber(number) {
    // if a is not set, then put number into a
    // if a is set and action is set, then put number into b
  }
}