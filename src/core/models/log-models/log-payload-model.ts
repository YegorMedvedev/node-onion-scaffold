import {LogLevel} from "./enums";

export class LogPayloadModel {
  public level: LogLevel;
  public message: string;
  public env: string;
  public service: string;
  public data: any;
  public correlationId?: string;
  public accountId?: string;
}
