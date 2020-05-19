import {createLogger, Logger, transports} from "winston";

export class ProductionLoggerFactory {
  public static create(): Logger {
    const logger = createLogger({});
    logger.add(new transports.Console());

    return logger;
  }
}
