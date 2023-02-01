import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalculatorComponent implements OnInit {
  queryHistory: any[] = [];
  historyLimit = 10;
  inputForm: FormGroup;
  input = '';
  result: number;
  notValid = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.inputForm = this.formBuilder.group({ input: '' });
    this.result = 0;
  }

  ngOnInit(): void {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    this.queryHistory = history;
    const loggedIn = sessionStorage.getItem('logged');
    if (loggedIn == null) {
      this.router.navigate(['/access-denied']);
    }
  }

  onSubmit(): void {
    this.calculate(this.input);
  }

  onClear(): void {
    this.queryHistory = [];
    localStorage.clear();
  }

  calculate(expression: any) {
    const digits = '0123456789.';
    const operators = ['+', '-', '*', '/', 'negate'];
    const legend: any = {
      '+': {
        pred: 2,
        func: (a: number, b: number) => {
          return a + b;
        },
        assoc: 'left',
      },
      '-': {
        pred: 2,
        func: (a: number, b: number) => {
          return a - b;
        },
        assoc: 'left',
      },
      '*': {
        pred: 3,
        func: (a: number, b: number) => {
          return a * b;
        },
        assoc: 'left',
      },
      '/': {
        pred: 3,
        func: (a: number, b: number) => {
          if (b != 0) {
            return a / b;
          } else {
            return 0;
          }
        },
      },
      assoc: 'left',
      negate: {
        pred: 4,
        func: (a: number) => {
          return -1 * a;
        },
        assoc: 'right',
      },
    };
    expression = expression.replace(/\s/g, '');
    let operations = [];
    let outputQueue = [];
    let ind = 0;
    let str = '';
    while (ind < expression.length) {
      let ch = expression[ind];
      if (operators.includes(ch)) {
        if (str !== '') {
          outputQueue.push(new Number(str));
          str = '';
        }
        if (ch === '-') {
          if (ind == 0) {
            ch = 'negate';
          } else {
            let nextCh = expression[ind + 1];
            let prevCh = expression[ind - 1];
            if (
              (digits.includes(nextCh) || nextCh === '(' || nextCh === '-') &&
              (operators.includes(prevCh) || expression[ind - 1] === '(')
            ) {
              ch = 'negate';
            }
          }
        }
        if (operations.length > 0) {
          let topOper = operations[operations.length - 1];
          while (
            operations.length > 0 &&
            legend[topOper] &&
            ((legend[ch].assoc === 'left' &&
              legend[ch].pred <= legend[topOper].pred) ||
              (legend[ch].assoc === 'right' &&
                legend[ch].pred < legend[topOper].pred))
          ) {
            outputQueue.push(operations.pop());
            topOper = operations[operations.length - 1];
          }
        }
        operations.push(ch);
      } else if (digits.includes(ch)) {
        str += ch;
      } else if (ch === '(') {
        operations.push(ch);
      } else if (ch === ')') {
        if (str !== '') {
          outputQueue.push(new Number(str));
          str = '';
        }
        while (
          operations.length > 0 &&
          operations[operations.length - 1] !== '('
        ) {
          outputQueue.push(operations.pop());
        }
        if (operations.length > 0) {
          operations.pop();
        }
      }
      ind++;
    }
    if (str !== '') {
      outputQueue.push(new Number(str));
    }
    outputQueue = outputQueue.concat(operations.reverse());
    let res: any[] = [];
    while (outputQueue.length > 0) {
      let ch = outputQueue.shift();
      if (operators.includes(ch)) {
        let num1, num2, subResult;
        if (ch === 'negate') {
          res.push(legend[ch].func(res.pop()));
        } else {
          let [num2, num1] = [res.pop(), res.pop()];
          res.push(legend[ch].func(num1, num2));
        }
      } else {
        res.push(ch);
      }
    }
    if (!res.length) {
      this.notValid = true;
      return;
    }
    this.result = res.pop().valueOf();
    this.pushElement({ input: expression, result: this.result.toFixed(2) });
  }

  pushElement(element: object) {
    if (this.queryHistory.length > this.historyLimit) {
      this.queryHistory.splice(0, 1);
    }
    this.queryHistory.push(element);
    localStorage.setItem('history', JSON.stringify(this.queryHistory));
  }
}
