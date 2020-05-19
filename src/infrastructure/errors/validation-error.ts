import {CommonError} from "./common-error";

export class ValidationFailureError extends CommonError {
  constructor(details?: any) {
    super("VALIDATION_FAILURE", 400, details);
  }
}
