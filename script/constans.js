//DISPLAY

export const DISPLAY = {
  current: document.querySelector('[data-current-display]'),
  previous: document.querySelector('[data-previous-display]'),
}

export const MAX_DISPLAY_LENGTH = 12;

// SETTINGS

export const DECIMAL_SIGN = '.' // if use comma, parsefloat ignore decimal
export const PLUS_MINUS_SIGN = '&#8314;&#8725;&#8331;';
export const DELETE_SIGN = '\u232b';

export const NEGATE_SIGN = 'negate';
export const negateDisplay = (value) => `${NEGATE_SIGN}(${value})`;

// BUTTONS

export const BUTTONS_CONTAINER = document.querySelector('[data-buttons]'); // main container

export const BUTTONS_MAIN_CLASS = 'calculator__button'; // every button has this class

export const NUMBER_BUTTONS = {
  containerClass: 'calculator__buttons--number',
  class: 'calculator__button--number',
  list: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', DECIMAL_SIGN],
  dataset: 'number',
}

export const OPTION_BUTTONS = {
  containerClass: 'calculator__buttons--option',
  class: 'calculator__button--option',
  list: ['C', 'CE', DELETE_SIGN],
  dataset: 'option',
  datasetValues: ['clear-all', 'clear', 'delete'],
}

export const CALCULATION_BUTTONS = {
  containerClass: 'calculator__buttons--calc',
  class: 'calculator__button--calc',
  list: ['+', '-', '*', '/'],
  dataset: 'calc',
}

export const COMMUTE_BUTTON = {
  class: 'calculator__button--commute',
  sign: '=',
  dataset: 'commute',
}

export const CHANGE_SIGN_BUTTON = {
  sign: PLUS_MINUS_SIGN,
  dataset: 'change-sign',
  place: 9, // place on html dom where this button is
}

// ERRORS
/**
 * messages should be max 10 chars to correct display
 * every message should start with @ERROR_MSG_START (its 5char by default )
 */
export const ERROR_MSG_START = 'ERR--' // every error start with this msg

export const DIVIDE_ZERO_ERROR_MSG = `${ERROR_MSG_START} /0`;