import {
  DIVIDE_ZERO_ERROR_MSG
} from "./constans.js";

export class ZeroDivideException extends Error {
  constructor() {
    super(DIVIDE_ZERO_ERROR_MSG);
    this.message = DIVIDE_ZERO_ERROR_MSG;
    this.name = 'ZeroDivideException';
  }
}