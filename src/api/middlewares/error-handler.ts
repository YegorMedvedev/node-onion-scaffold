import {ErrorRequestHandler, NextFunction, Request, Response} from "express";

import {DEFAULT_INTERNAL_SERVER_ERROR_CODE} from "./constants";

export const ErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let status: number | undefined;
  let body = {};

  if (err.status) {
    status = err.status;
    body = {code: err.code, details: err.details || null};
  } else if (err.statusCode) {
    status = err.statusCode;
    body = {code: err.error.code, details: err.error.details || null};
  } else {
    status = 500;
    body = {
      code: DEFAULT_INTERNAL_SERVER_ERROR_CODE,
      details: {
        message: err.message,
        stack: err.stack,
      },
    };
  }

  res.status(status).json(body);

  next();
};
