import {LogLevel, LogPayloadModel} from "../../models/log-models";

export interface ILoggerInstance {
  log(level: LogLevel, message: string, payload: LogPayloadModel): void;
}
