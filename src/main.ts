// tslint:disable:ordered-imports
import "reflect-metadata";

import * as helmet from "helmet";
import * as compression from "compression";
import {json, urlencoded} from "body-parser";
import {Application} from "express";
import {InversifyExpressServer} from "inversify-express-utils";

import {container, getPort, Logger, setProcessListeners} from "./infrastructure";
import "./infrastructure/config/config";
import {CorrelationId, ErrorHandler, SwaggerUiServeMiddleware} from "./api";

setProcessListeners();

const port = getPort();
const logger = container.get<Logger>(Logger);

new InversifyExpressServer(container)
  .setConfig((app: Application) => {
    app.use(helmet());
    app.use(urlencoded({extended: true}));
    app.use(json());
    app.use(compression());
    app.use(CorrelationId);
    app.use("/Application/Docs", SwaggerUiServeMiddleware);
  })
  .setErrorConfig((app: Application) => {
    app.use(ErrorHandler);
  })
  .build()
  .listen(port, () => logger.info(`Server is running on port ${port}`))
  .on("error", (err) => logger.error("Couldn't start server", {err}));
