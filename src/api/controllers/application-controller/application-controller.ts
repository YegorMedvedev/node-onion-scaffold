import {BaseHttpController, controller, httpGet} from "inversify-express-utils";

import {HealthService} from "../../../services/health-service/health-service";

@controller("/Application")
export class ApplicationController extends BaseHttpController {
  constructor(private readonly healthService: HealthService) {
    super();
  }

  @httpGet("/Health")
  public async getStatus() {
    return this.healthService.getHealth();
  }
}
