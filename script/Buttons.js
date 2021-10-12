import {
  BUTTONS_CONTAINER,
  BUTTONS_MAIN_CLASS,
  CALCULATION_BUTTONS,
  CHANGE_SIGN_BUTTON,
  COMMUTE_BUTTON,
  NUMBER_BUTTONS,
  OPTION_BUTTONS
} from './constans.js'

export class Buttons {
  constructor() {
    this.container = BUTTONS_CONTAINER;
    this.buttonClass = BUTTONS_MAIN_CLASS;
  }

  generateNumberButtons() {
    const numberButtonsContainer = this.createButtonsContainer(NUMBER_BUTTONS.containerClass);
    const cssClass = [NUMBER_BUTTONS.class, this.buttonClass];
    NUMBER_BUTTONS.list.forEach((number, index) => {
      if (index === CHANGE_SIGN_BUTTON.place) {
        this.createElement(numberButtonsContainer, CHANGE_SIGN_BUTTON.sign, cssClass, CHANGE_SIGN_BUTTON.dataset)
      }
      this.createElement(numberButtonsContainer, number, cssClass, NUMBER_BUTTONS.dataset);
    });
  }

  generateOptionButtons() {
    const optionButtonsContainer = this.createButtonsContainer(OPTION_BUTTONS.containerClass);
    const cssClass = [OPTION_BUTTONS.class, this.buttonClass];

    OPTION_BUTTONS.list.forEach((func, index) => {
      this.createElement(optionButtonsContainer, func, cssClass, OPTION_BUTTONS.dataset, OPTION_BUTTONS.datasetValues[index]);
    })
  }

  generateCalcButtons() {
    const calcButtonsContainer = this.createButtonsContainer(CALCULATION_BUTTONS.containerClass);
    const cssClass = [CALCULATION_BUTTONS.class, this.buttonClass];

    CALCULATION_BUTTONS.list.forEach((calc) => {
      this.createElement(calcButtonsContainer, calc, cssClass, CALCULATION_BUTTONS.dataset);
    })

    this.createElement(calcButtonsContainer, COMMUTE_BUTTON.sign, [...cssClass, COMMUTE_BUTTON.class], COMMUTE_BUTTON.dataset);
  }

  createButtonsContainer(buttonsContainerClass) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add(buttonsContainerClass);
    this.container.append(buttonsContainer);

    return buttonsContainer;
  }

  createElement(container, text, cssClass, data, dataValue = '') {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.setAttribute(`data-${data}`, dataValue);
    if (cssClass) {
      cssClass.forEach(buttonClass => {
        button.classList.add(buttonClass);
      })
    };
    container.append(button);
  }
}