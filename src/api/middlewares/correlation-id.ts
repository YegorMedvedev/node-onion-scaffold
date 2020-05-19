import {NextFunction, Request, Response} from "express";
import {v4} from "uuid";

import {CORRELATION_ID_HEADER_NAME} from "./constants";

export const CorrelationId = (req: Request, res: Response, next: NextFunction) => {
  if (req.header(CORRELATION_ID_HEADER_NAME) == null) {
    req.headers[CORRELATION_ID_HEADER_NAME] = v4();
  }

  next();
};
