import {ILoggerInstance} from "../../../core/infrastructure/logger";

import {DevelopmentLoggerFactory} from "./development-logger-factory";
import {ProductionLoggerFactory} from "./production-logger-factory";
import {TestLoggerFactory} from "./test-logger-factory";

export class LoggerFactory {
  public static createLogger(): ILoggerInstance {
    switch (process.env.NODE_ENV) {
      case "production":
        return ProductionLoggerFactory.create();
      case "local":
      case "development":
        return DevelopmentLoggerFactory.create();
      case "staging":
        return DevelopmentLoggerFactory.create();
      case "ci":
      case "test":
        return TestLoggerFactory.create();
      default:
        throw new Error("Unknown environment");
    }
  }
}
