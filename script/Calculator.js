import {
  Buttons
} from "./Buttons.js";

import {
  ZeroDivideException
} from "./Exceptions.js";

import {
  CALCULATION_BUTTONS,
  CHANGE_SIGN_BUTTON,
  COMMUTE_BUTTON,
  DECIMAL_SIGN,
  DISPLAY,
  ERROR_MSG_START,
  MAX_DISPLAY_LENGTH,
  negateDisplay,
  NEGATE_SIGN,
  NUMBER_BUTTONS,
  OPTION_BUTTONS
} from "./constans.js";

export class Calculator {
  constructor() {
    this.buttons = new Buttons();
    this.currentDisplay = DISPLAY.current;
    this.previusDisplay = DISPLAY.previous

    this.currentDisplayValue = '0';
    this.previousDisplayValue = '';

    this.currentNumberValue = 0;
    this.previousNumberValue = 0;

    this.currentCalculation = null;
    this.previousCalculation = null;
    this.isCalculationActive = false;
  }

  generateButtons() {
    this.buttons.generateNumberButtons();
    this.buttons.generateCalcButtons();
    this.buttons.generateOptionButtons();

    document.querySelectorAll(`[data-${NUMBER_BUTTONS.dataset}]`).forEach((button) => {
      button.addEventListener('click', (event) => this.numberButtonsListener(event))
    });

    document.querySelectorAll(`[data-${CALCULATION_BUTTONS.dataset}]`).forEach((button) => {
      button.addEventListener('click', (event) => this.calcButtonsListener(event))
    });

    document.querySelectorAll(`[data-${OPTION_BUTTONS.dataset}]`).forEach((button) => {
      button.addEventListener('click', (event) => this.optionButtonsListener(event))
    });

    document.querySelector(`[data-${CHANGE_SIGN_BUTTON.dataset}]`).addEventListener('click', () => this.changeSign());
    document.querySelector(`[data-${COMMUTE_BUTTON.dataset}]`).addEventListener('click', () => this.commute());
  }

  updateDisplay() {
    if (this.currentDisplayValue.length > MAX_DISPLAY_LENGTH) {
      this.currentDisplayValue = parseFloat(this.currentDisplayValue).toExponential(MAX_DISPLAY_LENGTH - 5);
    }
    this.currentDisplay.textContent = this.currentDisplayValue;
    this.previusDisplay.textContent = this.previousDisplayValue;
  }

  numberButtonsListener(event) {
    event.preventDefault();
    const number = event.target.textContent;
    this.isCalculationActive = false;

    if (this.currentDisplayValue.length === MAX_DISPLAY_LENGTH) {
      return;
    }
    if (this.currentDisplayValue.includes(ERROR_MSG_START)) {
      this.currentDisplayValue = '0';
    }
    if (this.currentDisplayValue.includes(DECIMAL_SIGN) && number === DECIMAL_SIGN) {
      return
    }
    if (this.currentDisplayValue === '0' && number !== DECIMAL_SIGN) {
      this.currentNumberValue = parseFloat(number);
      this.currentDisplayValue = number;
      this.updateDisplay();
      return;
    }
    if (this.previousDisplayValue.slice(-1) === COMMUTE_BUTTON.sign ||
      this.previousDisplayValue.includes(NEGATE_SIGN)) {
      this.currentDisplayValue = '';
      this.previousDisplayValue = '';
    }

    this.currentDisplay.textContent = '';
    this.currentDisplayValue += number;
    this.currentNumberValue = parseFloat(this.currentDisplayValue);
    this.updateDisplay();
  }

  calcButtonsListener(event) {
    this.currentCalculation = event.target.textContent;

    if (this.isCalculationActive) {
      this.previousDisplayValue = `${this.previousDisplayValue.slice(0, -1)}${this.currentCalculation}`;
      this.updateDisplay();
      return;
    }
    if (this.currentDisplayValue.includes(ERROR_MSG_START)) {
      return;
    }
    this.isCalculationActive = true;

    if (this.previousDisplayValue.slice(-1) === COMMUTE_BUTTON.sign) {
      this.previousDisplayValue = `${this.currentDisplayValue} ${this.currentCalculation}`;
      this.previousCalculation = this.currentCalculation;
      this.updateDisplay();
      this.currentDisplayValue = '0';

      return;
    }
    if (this.previousDisplayValue === '') {
      this.previousDisplayValue = `${this.currentDisplayValue} ${this.currentCalculation}`;
      this.previousNumberValue = this.currentNumberValue;
      this.previousCalculation = this.currentCalculation;
      this.updateDisplay();
      this.currentDisplayValue = '0';

      return;
    }
    if (this.previousDisplayValue.includes(NEGATE_SIGN)) {
      this.previousNumberValue = this.currentNumberValue;
      this.currentNumberValue = 0;
    }

    try {
      this.doCalculation();
      this.previousDisplayValue = `${this.previousNumberValue} ${this.currentCalculation}`
    } catch (error) {
      this.currentDisplayValue = error.message;
    }

    this.updateDisplay();
    this.currentDisplayValue = '0';
    this.previousCalculation = this.currentCalculation;

  }

  doCalculation() {

    switch (this.previousCalculation || this.currentCalculation) {
      case '+': {
        this.previousNumberValue += this.currentNumberValue;
        break;
      }
      case '-': {
        this.previousNumberValue -= this.currentNumberValue;
        break;
      }
      case '*': {
        this.previousNumberValue *= this.currentNumberValue;
        break;
      }
      case '/': {
        if (this.currentNumberValue === 0) {
          throw new ZeroDivideException();
        }
        this.previousNumberValue = this.previousNumberValue / this.currentNumberValue;
        break;
      }
    }
  }

  optionButtonsListener(event) {
    const option = event.target.dataset.option;
    this.isCalculationActive = false;

    switch (option) {
      case 'clear': {
        this.clear();
        break;
      }
      case 'clear-all': {
        this.clearAll();
        break;
      }
      case 'delete': {
        this.delete();
        break;
      }
    }

    this.updateDisplay();
  }

  clear() {
    this.currentDisplayValue = '0';
    this.previousDisplayValue = '';
    this.previousNumberValue = 0;
    this.currentOperation = null;
    this.previousOperation = null;
  }

  clearAll() {
    this.currentNumberValue = 0;
    this.previousDisplayValue = '';
    this.clear();
  }

  delete() {
    this.currentDisplayValue = this.currentDisplayValue.slice(0, -1);
    if (this.currentDisplayValue.length === 0) {
      this.currentDisplayValue = '0';
    }
    this.currentNumberValue = parseFloat(this.currentDisplayValue);
  }

  commute() {
    if (!this.previousCalculation || !this.currentCalculation) {
      return;
    }
    if (this.previousDisplayValue.includes(NEGATE_SIGN)) {
      return;
    }
    this.isCalculationActive = false;
    this.previousCalculation = this.currentCalculation;
    this.previousDisplayValue = `${this.previousNumberValue} ${this.currentCalculation} ${this.currentNumberValue} =`;
    try {
      this.doCalculation();
      this.currentDisplayValue = this.previousNumberValue.toString();
    } catch (error) {
      this.currentDisplayValue = error.message;
    }

    this.updateDisplay();
  }

  changeSign() {
    if (this.previousDisplayValue === '') {
      this.previousDisplayValue = negateDisplay(this.currentNumberValue);
    }
    if (this.previousDisplayValue.includes(NEGATE_SIGN)) {
      this.previousDisplayValue = negateDisplay(this.currentNumberValue);
    }
    if (this.previousDisplayValue.slice(-1) === COMMUTE_BUTTON.sign) {
      this.previousDisplayValue = negateDisplay(this.currentDisplayValue);
    }

    this.currentDisplayValue = this.currentDisplayValue[0] === '-' ? this.currentDisplayValue.slice(1) : `-${this.currentDisplayValue}`;
    this.currentNumberValue = parseFloat(this.currentDisplayValue);
    this.updateDisplay();
  }
}