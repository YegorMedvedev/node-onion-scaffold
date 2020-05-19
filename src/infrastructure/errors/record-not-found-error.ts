import {CommonError} from "./common-error";

export class RecordNotFoundError extends CommonError {
  constructor(id: string, entity?: string) {
    super("RECORD_NOT_FOUND_ERR", 404, {id, entity});
  }
}
