import Screen from './screen.js';
import Keyboard from './keyboard.js';

// export default class Calcualator {
//   constructor() {
//     this.init();
//   }

//   init() {
//     this.root = document.querySelector('#root');
//     this.screen = new Screen();
//     this.keyboard = new Keyboard(this);
    
//     this.root.appendChild(this.screen.getView());
//     this.root.appendChild(this.keyboard.getView());
//   }
// }

export default class Calcualator {
  static root = document.querySelector('#root');
  static screen = new Screen();
  static keyboard = new Keyboard();

  static createCalculator() {
    Calcualator.root.appendChild(Calcualator.screen.getView());
    Calcualator.root.appendChild(Calcualator.keyboard.getView());
  }

  static keyPressed({event, name, symbol}) {
    console.log(`name: ${name}, symbol: ${symbol}`);
    Calcualator.getDisplay().innerText = symbol;
  }

  static getDisplay() {
    return Calcualator.screen.display.getView();
  }

}