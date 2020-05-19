import {MongoClientOptions} from "mongodb";

export const MONGO_CONNECTION_OPTIONS: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  monitorCommands: true,
};
