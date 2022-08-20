import Screen from './screen.js';
import Keyboard from './keyboard.js';
import CalculationStack from './CalculationStack.js';
import Action from './Action.js';

export default class Calcualator {
  static root = document.querySelector('#root');
  static screen = new Screen();
  static keyboard = new Keyboard();

  static stack = new CalculationStack();

  static createCalculator() {
    Calcualator.root.appendChild(Calcualator.screen.getView());
    Calcualator.root.appendChild(Calcualator.keyboard.getView());
  }

  static keyPressed({event, name, symbol}) {
    if((/^[0-9]$/ig).test(symbol)) {
      
      let newNumber = Calcualator.stack.addDigit(symbol);
      Calcualator.screen.display.display(newNumber);

    } else if(["/", "*", "+", "-"].includes(symbol)) {
      
      if (Calcualator.stack.a && Calcualator.stack.b && Calcualator.stack.action) {
        let result = Calcualator.stack.calculate(); 
        Calcualator.screen.display.display(result);
        Calcualator.stack.a = result;
        Calcualator.stack.b = null;
      }

      const action = new Action(symbol);
      Calcualator.stack.setAction(action);
      Calcualator.screen.history.add({a: Calcualator.stack.a, action: Calcualator.stack.action.symbol});
      Calcualator.screen.history.render();

    } else if(symbol === "=") {
      
      if (Calcualator.stack.b && Calcualator.stack.action) {
        Calcualator.screen.history.add({a: Calcualator.stack.a, action: Calcualator.stack.action.symbol});

      } else if (Calcualator.stack.a && Calcualator.stack.action) {
        Calcualator.stack.b = Calcualator.stack.a;
      }
      
      let result = Calcualator.stack.calculate();
      
      Calcualator.screen.display.display(result);
      Calcualator.screen.history.update({b: Calcualator.stack.b, result: result});
      Calcualator.screen.history.render();
      Calcualator.stack.a = result;

    } else if(symbol === ".") {
      Calcualator.stack.dp = true;

    } else if(name === "delete") {
      Calcualator.stack.deleteLastDigit();
      Calcualator.screen.display.display(Calcualator.stack.a);

    } else if(name === "clear") {
      Calcualator.stack.clear();
      Calcualator.screen.display.display(Calcualator.stack.a);
      Calcualator.screen.history.clear();
    }
  }
}