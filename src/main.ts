// tslint:disable:ordered-imports
import "reflect-metadata";

import * as compression from "compression";
import {json, urlencoded} from "body-parser";
import {Application} from "express";
import {InversifyExpressServer} from "inversify-express-utils";

import {container, getPort, Logger, setProcessListeners} from "./infrastructure";
import "./infrastructure/config/config";
import {CorrelationId, ErrorHandler} from "./api";

setProcessListeners();

const port = getPort();
const logger = container.get<Logger>(Logger);

new InversifyExpressServer(container)
  .setConfig((app: Application) => {
    app.use(urlencoded({extended: true}));
    app.use(json());
    app.use(compression());
    app.use(CorrelationId);
  })
  .setErrorConfig((app: Application) => {
    app.use(ErrorHandler);
  })
  .build()
  .listen(port, () => logger.info(`Server is running on port ${port}`))
  .on("error", (err) => logger.error("Couldn't start server", {err}));
