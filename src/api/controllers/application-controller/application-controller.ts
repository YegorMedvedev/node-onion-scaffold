import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import * as swaggerUi from "swagger-ui-express";

import {getSwaggerSpecification} from "../../../infrastructure/utils/swagger-specification";
import {HealthService} from "../../../services/health-service/health-service";

import {HttpMethodSync} from "./types";

@controller("/Application")
export class ApplicationController extends BaseHttpController {
  constructor(private readonly healthService: HealthService) {
    super();
  }

  /**
   * @swagger
   *  /Application/Health:
   *  get:
   *    tags:
   *      - Application
   *    summary: "Application Health"
   *    description: "Returns general information regarding application health"
   *    operationId: "applicationHealth"
   *    responses:
   *      200:
   *        description: "Health details retrieved"
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ApplicationHealthDto'
   */
  @httpGet("/Health")
  public async getHealth() {
    return this.healthService.getHealth();
  }

  /**
   * @swagger
   *  /Application/Docs:
   *  get:
   *    tags:
   *      - Application
   *    summary: "Application Swagger Documentation"
   *    description: "Returns Swagger UI"
   *    operationId: "applicationDocs"
   *    responses:
   *      200:
   *        description: "Swagger UI"
   */
  @httpGet("/Docs")
  public async getApiDocumentation() {
    const swaggerSpecification = await getSwaggerSpecification();
    const setup = swaggerUi.setup(swaggerSpecification, {explorer: true}) as HttpMethodSync;
    setup(this.httpContext.request, this.httpContext.response);
  }
}
