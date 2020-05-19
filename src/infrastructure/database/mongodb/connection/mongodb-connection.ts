import {Db, MongoClient} from "mongodb";

import {DatabaseConnectionError} from "../../../errors";
import {Logger} from "../../../logger/service";

import {MONGO_CONNECTION_OPTIONS} from "./constants";

export class MongodbConnection {
  private mongodbInstance?: Db;

  constructor(private readonly logger: Logger) {}

  public async getMongoDb(): Promise<Db> {
    if (this.mongodbInstance == null) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI, MONGO_CONNECTION_OPTIONS);
        const connection = await client.connect();

        this.mongodbInstance = connection.db();
        this.logger.info("Connection to MongoDB established");
      } catch (e) {
        this.logger.error("Couldn't connect to MongoDB");
        throw new DatabaseConnectionError(e);
      }
    }

    return this.mongodbInstance;
  }
}
