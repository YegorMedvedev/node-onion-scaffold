import {CommonError} from "./common-error";

export class UndefinedPortError extends CommonError {
  constructor() {
    super("UNDEFINED_PORT", 500);
  }
}
