'use strict';

const display = document.getElementById('display');
// const btn = document.getElementsByTagName('button');
const number = document.querySelectorAll('[id*=num]');
const operators = document.querySelectorAll('[id*=operator]');

let newNumber = true;
let operator;
let previousNumber;

const pendingOp = () => operator !== undefined;

const calculate = () => {
    if (pendingOp()) {
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        newNumber = true;
        const result = eval (`${previousNumber}${operator}${currentNumber}`);
        updateDisplay(result);

        /* if (operator == '+') {
            updateDisplay(previousNumber + currentNumber);
        } else if (operator == '-') {
            updateDisplay(previousNumber - currentNumber);
        } else if (operator == '*') {
            updateDisplay(previousNumber * currentNumber);
        } else if (operator == '/') {
            updateDisplay(previousNumber / currentNumber);
        } */
    }
}

const updateDisplay = (text) => {
    if (newNumber) {
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    } else {
        display.textContent += text.toLocaleString('BR');
    }
}
const addNumber = (event) => updateDisplay(event.target.textContent);
// console.log(btn);
// console.log(number);

number.forEach (number => number.addEventListener('click', addNumber));

const selectOperator = (event) => {
    if (!newNumber) {
        calculate()
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',', '.'));
        // console.log(operator);
    }
}
operators.forEach (operator => operator.addEventListener('click', selectOperator));

const onEquals = () => {
    calculate();
    operator = undefined;
}
document.getElementById('equals').addEventListener('click', onEquals);

const cleanerDisplay = () => display.textContent = '';
document.getElementById('cleanerDisplay').addEventListener('click', cleanerDisplay);

const cleanerCalc = () => {
    cleanerDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}
document.getElementById('cleanerCalc').addEventListener('click', cleanerCalc);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const inverterSignal = () => {
    newNumber = true;
    updateDisplay (display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSignal);

const haveDecimal = () => display.textContent.indexOf(',') != -1;
const haveValor = () => display.textContent.length > 0;

const addDecimal = () => {
    if (!haveDecimal()) {
        if (haveValor()) {
            updateDisplay(',');
        } else {
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', addDecimal);

const mapKeyboard = {
    '0'          :  'num0',
    '1'          :  'num1',
    '2'          :  'num2',
    '3'          :  'num3',
    '4'          :  'num4',
    '5'          :  'num5',
    '6'          :  'num6',
    '7'          :  'num7',
    '8'          :  'num8',
    '9'          :  'num9',
    '/'          :  'operatorDivided',
    '*'          :  'operatorTimes',
    '-'          :  'operatorMinus',
    '+'          :  'operatorPlus',
    'Enter'      :  'equals',
    'Backspace'  :  'backspace',
    'c'          :  'cleanerDisplay',
    'Escape'     :  'cleanerCalc',
    ','          :  'decimal'
}

const findKeyboard = (event) => {
    const key = event.key;

    const keyOk = () => Object.keys(mapKeyboard).indexOf(key) != -1;
    if (keyOk()) document.getElementById(mapKeyboard[key]).click();

   console.log(event.key);
};
document.addEventListener('keydown', findKeyboard);