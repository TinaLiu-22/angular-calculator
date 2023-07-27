import { Component } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  
  disableDeleteButton: boolean = true;
  disableClearButton: boolean = true;

  numbers: string[] = [];
  operators: string[] = [];

  x1: string = "";
  x2: string = "";
  operator: string = "";
  
  expression: string = "0";

  constructor() {
    range(0, 10).forEach((i) => this.numbers.push("" + i));
    this.operators = ["+", "-", "*", "/"];
  }

  display() {
    this.expression = this.x1 + this.operator + this.x2;
    if (!this.expression) {
      this.expression = "0";
      this.disableClearButton = true;
      this.disableDeleteButton = true;
    } else {
      this.disableClearButton = false;
      this.disableDeleteButton = false;
    }
  }

  onClickNumber(value: string) {
    if ((!this.x1 || !this.x2) && value === "0") {
      return;
    }

    if (!this.operator) {
      this.x1 += value;
    } else {
      this.x2 += value;
    }
    this.display();
  }

  onClickDecimal() {
    if (!this.operator) {
      this.x1 = this.addDecimal(this.x1);
    } else if (this.operator) {
      this.x2 = this.addDecimal(this.x2);
    }
    this.display();
  }

  addDecimal(value: string): string {
    if (!value.includes(".")) {
      if (!value) {
        value += "0";
      }
      value += ".";
    }
    return value;
  }

  onClickOperator(value: string) {
    if (!this.x1) {
      alert("Enter the first operand please.");
    } else if (this.x2) {
      alert("This calculator allows only one binary expression at a time. Cancel to re-enter a new expression.");
    } else if (this.operator) {
      alert("Operator already entered. Enter the second operand or press backspace to re-enter the operand.");
    } else {
      this.operator = value;
    }
    this.display();
  }

  onClickEquals() {
    
    if (!this.x1) {
      alert("Enter the first operand please.");
      return;
    } else if (!this.operator) {
      alert("Enter an operator '+', '-', '*', '/' please.");
      return;
    } else if (!this.x2) {
      alert("Enter the second operand please.");
      return;
    }

    const n1 = Number.parseFloat(this.x1);
    const n2 = Number.parseFloat(this.x2);
    let result;

    switch(this.operator) {
      case "+": 
        result = n1 + n2;
        break;
      case "-":
        result = n1 - n2;
        break;
      case "*":
        result = n1 * n2;
        break;
      case "/":
        result = n1 / n2;
        break;
      default:
        throw new Error("Invalid operator: " + this.operator + ".");
    }

    this.expression = result + "";
    this.disableDeleteButton = true;

    this.x1 = "";
    this.x2 = "";
    this.operator = "";
  }

  onClickDelete() {
    if (this.x2) {
      this.x2 = this.x2.slice(0, -1);
    } else if (this.operator) {
      this.operator = "";
    } else if (this.x1) {
      this.x1 = this.x1.slice(0, -1);
    }

    this.display();
  }

  onClickClear() {
    this.x1 = "";
    this.x2 = "";
    this.operator = "";
    this.display();
  }
}
