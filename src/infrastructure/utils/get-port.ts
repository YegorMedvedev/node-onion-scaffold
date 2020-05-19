import {UndefinedPortError} from "../errors";

export function getPort(): number {
  const port = process.env.PORT;
  if (port == null) {
    throw new UndefinedPortError();
  }

  return process.env.NODE_ENV === "test" || process.env.NODE_ENV === "ci" ? Number(port) + 1000 : Number(port);
}
