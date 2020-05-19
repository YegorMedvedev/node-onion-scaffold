import {CommonError} from "./common-error";

export class DatabaseConnectionError extends CommonError {
  constructor(err: any) {
    super("DATABASE_CONNECTION_ERR", 500, err);
  }
}
