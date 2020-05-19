import {injectable} from "inversify";

import {IHealth, IHealthEnvironment, IHealthMemory, IHealthStorage} from "../../core/services/health-service";
import {getPackageJson} from "../../infrastructure/config";
import {MongodbConnection} from "../../infrastructure/database/mongodb/connection";
import {PostgresqlConnection} from "../../infrastructure/database/postgresql/connection";

@injectable()
export class HealthService {
  constructor(
    private readonly mongodbConnection: MongodbConnection,
    private readonly postgresqlConnection: PostgresqlConnection,
  ) {}

  public async getHealth(): Promise<IHealth> {
    const packageJson = getPackageJson();
    const [mongodb, postgres] = await Promise.all([this.getMongodbHealth(), this.getPostgresHealth()]);

    return {
      node: process.version,
      version: packageJson.version,
      name: packageJson.name,
      environment: this.getEnvironmentDetails(),
      memory: this.getMemoryAllocation(),
      storage: {mongodb, postgres},
    };
  }

  private getEnvironmentDetails(): IHealthEnvironment {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    };
  }

  private getMemoryAllocation(): IHealthMemory {
    const convertToMb = (value) => {
      return Math.round((value / 1024 / 1024) * 100) / 100;
    };

    const rawMemoryAllocation = process.memoryUsage();

    return {
      rss: `${convertToMb(rawMemoryAllocation.rss)} MB`,
      external: `${convertToMb(rawMemoryAllocation.external)} MB`,
      heapTotal: `${convertToMb(rawMemoryAllocation.heapTotal)} MB`,
      heapUsed: `${convertToMb(rawMemoryAllocation.heapUsed)} MB`,
    };
  }

  private async getMongodbHealth(): Promise<IHealthStorage> {
    try {
      await this.mongodbConnection.getMongoDb();
      return {status: "ok"};
    } catch (e) {
      return {status: "error", details: e.name};
    }
  }

  private async getPostgresHealth(): Promise<IHealthStorage> {
    try {
      await this.postgresqlConnection.getPostgreSql();
      return {status: "ok"};
    } catch (e) {
      return {status: "error", details: e.name};
    }
  }
}
