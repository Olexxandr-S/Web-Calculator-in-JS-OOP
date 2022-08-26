import Screen from "./screen.js";
import Keyboard from "./keyboard.js";
import CalculationStack from "./CalculationStack.js";
import Action from "./Action.js";

export default class Calculator {
  static root = document.querySelector("#root");
  static screen = new Screen();
  static keyboard = new Keyboard();

  static stack = new CalculationStack();

  static createCalculator() {
    Calculator.root.appendChild(Calculator.screen.getView());
    Calculator.root.appendChild(Calculator.keyboard.getView());
  }

  static keyPressed({ event, name, symbol }) {
    if (/^[0-9]$/gi.test(symbol)) {
      let newNumber = Calculator.stack.addDigit(symbol);
      Calculator.screen.display.display(newNumber);
    } else if (["/", "*", "+", "-"].includes(symbol)) {
      if (Calculator.stack.a && Calculator.stack.b && Calculator.stack.action) {
        let result = Calculator.stack.calculate();
        Calculator.screen.display.display(result);
        Calculator.stack.a = result;
        Calculator.stack.b = null;
      }

      const action = new Action(symbol);
      Calculator.stack.setAction(action);
      Calculator.screen.history.add({
        a: Calculator.stack.a,
        action: Calculator.stack.action.symbol,
      });
      Calculator.screen.history.render();
    } else if (symbol === "=") {
      if (Calculator.stack.b && Calculator.stack.action) {
        Calculator.screen.history.add({
          a: Calculator.stack.a,
          action: Calculator.stack.action.symbol,
        });
      } else if (Calculator.stack.a && Calculator.stack.action) {
        Calculator.stack.b = Calculator.stack.a;
      }

      let result = Calculator.stack.calculate();

      Calculator.screen.display.display(result);
      Calculator.screen.history.update({
        b: Calculator.stack.b,
        result: result,
      });
      Calculator.screen.history.render();
      Calculator.stack.a = result;
    } else if (symbol === ".") {
      Calculator.stack.dp = true;
    } else if (name === "delete") {
      Calculator.stack.deleteLastDigit();
      !Calculator.stack.action
        ? Calculator.screen.display.display(Calculator.stack.a)
        : Calculator.screen.display.display(Calculator.stack.b);
    } else if (name === "clear") {
      Calculator.stack.clear();
      Calculator.screen.display.display(Calculator.stack.a);
      Calculator.screen.history.clear();
    }
  }
}
