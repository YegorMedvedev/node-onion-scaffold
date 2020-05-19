import {Collection, FilterQuery, ObjectID} from "mongodb";

import {MongodbConnection} from "../connection";

export abstract class AbstractMongodbRepository<Entity extends {_id: string}> {
  protected abstract collection: string;

  constructor(private readonly mongodbConnection: MongodbConnection) {}

  protected async create(params: Partial<Entity>): Promise<Entity> {
    const collection = await this.getCollection();
    const {
      ops: [result],
    } = await collection.insertOne({
      ...params,
      created: new Date(),
      updated: new Date(),
    });

    return result;
  }

  protected async update(query: FilterQuery<Entity>, params: Partial<Entity>): Promise<Entity> {
    const collection = await this.getCollection();
    const filterQuery = this.buildFilterQuery(query);

    await collection.findOneAndUpdate(filterQuery, {
      $set: {
        ...params,
        updated: new Date(),
      },
    });

    return (await this.findOne(query)) as Entity;
  }

  protected async set<T extends object>(id: string, params: T): Promise<Entity & T> {
    const collection = await this.getCollection();

    // tslint:disable-next-line:variable-name
    const _id = new ObjectID(id);

    await collection.findOneAndUpdate(
      {_id},
      {
        $set: {
          ...params,
          updated: new Date(),
        },
      },
    );

    return (await this.findByPrimaryId(id)) as Entity & T;
  }

  protected async findByPrimaryId(id: string): Promise<Entity | null> {
    const collection = await this.getCollection();
    return (await collection.findOne({_id: new ObjectID(id)})) || null;
  }

  protected async findOne(query: FilterQuery<Entity>): Promise<Entity | null> {
    const collection = await this.getCollection();
    const filterQuery = this.buildFilterQuery(query);

    return (await collection.findOne(filterQuery)) || null;
  }

  protected async find(query: FilterQuery<Entity>): Promise<Entity[]> {
    const collection = await this.getCollection();
    const filterQuery = this.buildFilterQuery(query);

    return await collection.find(filterQuery).toArray();
  }

  protected async removeOne(query: FilterQuery<Entity>): Promise<void> {
    const collection = await this.getCollection();
    const filterQuery = this.buildFilterQuery(query);

    await collection.deleteOne(filterQuery);
  }

  protected async removeMany(query: FilterQuery<Entity>): Promise<void> {
    const collection = await this.getCollection();
    const filterQuery = this.buildFilterQuery(query);

    await collection.deleteMany(filterQuery);
  }

  protected async getCollection(): Promise<Collection> {
    const mongoDb = await this.mongodbConnection.getMongoDb();
    return mongoDb.collection(this.collection);
  }

  private buildFilterQuery(query: FilterQuery<Entity>): Record<string, any> {
    const filterQuery: Record<string, any> = {...query};
    if (query._id != null && typeof query._id === "string") {
      filterQuery._id = new ObjectID(query._id);
    }

    return filterQuery;
  }
}
