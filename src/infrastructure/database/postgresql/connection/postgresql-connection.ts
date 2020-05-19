import * as knex from "knex";

import {DatabaseConnectionError} from "../../../errors";
import {Logger} from "../../../logger/service";

export class PostgresqlConnection {
  private postgresqlInstance?: knex;

  constructor(private readonly logger: Logger) {}

  public getPostgreSql(): knex {
    if (this.postgresqlInstance == null) {
      try {
        this.postgresqlInstance = knex({
          client: "pg",
          connection: process.env.POSTGRESQL_URL,
        });

        this.logger.info("PostgreSQL instance created");
      } catch (e) {
        this.logger.error("Couldn't create PostgreSQL instance");
        throw new DatabaseConnectionError(e);
      }
    }

    return this.postgresqlInstance;
  }
}
