import {inject, injectable, optional} from "inversify";
import {interfaces, TYPE} from "inversify-express-utils";

import {LogContextModel, LogLevel, LogPayloadModel} from "../../../core";
import {LoggerFactory} from "../factory";

import {ACCOUNT_ID_HEADER, CORRELATION_ID_HEADER} from "./constants";

@injectable()
export class Logger {
  private readonly loggerInstance = LoggerFactory.createLogger();

  get context(): LogContextModel {
    const logContext = new LogContextModel();

    if (this.httpContext != null && this.httpContext.request != null) {
      logContext.correlationId = this.httpContext.request.header(CORRELATION_ID_HEADER);
      logContext.accountId = this.httpContext.request.header(ACCOUNT_ID_HEADER);
    }

    return logContext;
  }

  constructor(@inject(TYPE.HttpContext) @optional() private httpContext?: interfaces.HttpContext) {}

  public info(message: string, payload?: any): void {
    this.log(LogLevel.INFO, message, payload);
  }

  public warn(message: string, payload?: any): void {
    this.log(LogLevel.WARNING, message, payload);
  }

  public error(message: string, payload?: any): void {
    this.log(LogLevel.ERROR, message, payload);
  }

  private log(level: LogLevel, message: string, payload?: any): void {
    const logPayload = new LogPayloadModel();
    logPayload.level = level;
    logPayload.env = process.env.NODE_ENV;
    logPayload.service = process.env.SERVICE_NAME;
    logPayload.data = payload;

    if (this.httpContext != null && this.httpContext.request != null) {
      logPayload.correlationId = this.context.correlationId;
      logPayload.accountId = this.context.accountId;
    }

    this.loggerInstance.log(level, message, logPayload);
  }
}
