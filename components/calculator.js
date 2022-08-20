import Screen from './screen.js';
import Keyboard from './keyboard.js';
import Action from './action.js';
import Memory from './memory.js';
import CalculationStack from './stack.js';

export default class Calcualator {
  static root = document.querySelector('#root');
  static screen = new Screen();
  static keyboard = new Keyboard();
  static stack = new CalculationStack();
  static memory = new Memory();

  static createCalculator() {
    Calcualator.root.appendChild(Calcualator.screen.getView());
    Calcualator.root.appendChild(Calcualator.keyboard.getView());
  }

  static keyPressed({event, name, symbol}) {
    
    if((/^[0-9]$/ig).test(symbol)) {
      Calcualator.screen.display.display(Calcualator.stack.addDigit(symbol));

    } else if(name === "delete") {
      Calcualator.screen.display.display(Calcualator.stack.deleteLastDigit());

    } else if(name === "clear") {
      Calcualator.screen.display.display(Calcualator.stack.clear());
      Calcualator.screen.history.clear();
      Calcualator.memory.clear();

    } else if(["/", "*", "+", "-"].includes(symbol)) {
      const result = {};

      if(Calcualator.stack.a && Calcualator.stack.b && Calcualator.stack.action.symbol !== symbol) {
        Calcualator.stack.b = null;
        Calcualator.stack.action = new Action(symbol)
        Calcualator.screen.history.add(Calcualator.stack.toObject());

      } else if(Calcualator.stack.a && Calcualator.stack.b && Calcualator.stack.action.symbol === symbol) {
        Object.assign(result, {...Calcualator.stack.toObject(), 
          result: Calcualator.stack.calculate()
        });
        Calcualator.screen.display.display(result.result);
        Calcualator.screen.history.update(result);
        Calcualator.stack.clear();
        Calcualator.stack.a = result.result;
        Calcualator.stack.action = new Action(symbol);
        Calcualator.screen.history.add(Calcualator.stack.toObject());
        
      } else if(Calcualator.stack.a && !Calcualator.stack.b && !Calcualator.stack.action) {
        Calcualator.stack.action = new Action(symbol);
        Calcualator.screen.history.add(Calcualator.stack.toObject());

      } else if(Calcualator.stack.a && !Calcualator.stack.b && Calcualator.stack.action != symbol) {
        const newAction = new Action(symbol);
        Calcualator.stack.action = newAction;
        Calcualator.screen.history.value = {a: Calcualator.stack.a, action: newAction.symbol};

      }
      
      Calcualator.screen.history.render();

    } else if(symbol === "=") {
      const result = {};

      if(Calcualator.stack.b && Calcualator.stack.action) {
        Object.assign(result, {...Calcualator.stack.toObject(), 
          result: Calcualator.stack.calculate()
        });
        Calcualator.screen.history.add(result);

      } else if(Calcualator.stack.a && Calcualator.stack.action) {
        Calcualator.stack.b = Calcualator.stack.a;
        Object.assign(result, {...Calcualator.stack.toObject(), 
          result: Calcualator.stack.calculate()
        });
        Calcualator.screen.history.add(result);
      }

      Calcualator.screen.display.display(result.result);
      Calcualator.screen.history.update(result);
      Calcualator.screen.history.render();
      Calcualator.stack.a = result.result;

    } else if(symbol === ".") {
      //
    }
    
  }

}