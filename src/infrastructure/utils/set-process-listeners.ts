import {container} from "../container";
import {Logger} from "../logger/service";

export function setProcessListeners(): void {
  process.on("uncaughtException", (err: Error) => {
    container.get(Logger).error(`Uncaught exception: ${err.message}`, {err, stack: err.stack});

    setTimeout(() => process.exit(1), 100);
  });

  process.on("unhandledRejection", (err: Error) => {
    container.get(Logger).error(`Unhandled Promise rejection: ${err.message}`, {err, stack: err.stack});
  });
}
