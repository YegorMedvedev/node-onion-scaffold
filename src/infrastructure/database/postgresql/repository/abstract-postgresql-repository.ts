import * as knex from "knex";
import {QueryBuilder} from "knex";

import {PostgresqlConnection} from "../connection";

export abstract class AbstractPostgresqlRepository<Entity extends {id: string}> {
  protected abstract table: string;

  constructor(private readonly postgresqlConnection: PostgresqlConnection) {}

  protected async create(params: Partial<Entity>): Promise<Entity> {
    const table = this.getTable();

    const {id} = await table.insert(params, ["id"]);
    return table.where({id}).first();
  }

  protected async update(query: knex.Where<Entity>, params: Partial<Entity>): Promise<Entity> {
    const table = this.getTable();

    await table.update(params).where(query);
    return table.where(query).first();
  }

  protected async set<T extends object>(id: string, params: T): Promise<Entity & T> {
    const table = this.getTable();

    await table.update(params).where({id});
    return table.where({id}).first();
  }

  protected async findByPrimaryId(id: string): Promise<Entity | null> {
    const table = this.getTable();
    return (await table.where({id}).first()) || null;
  }

  protected async findOne(query: knex.Where<Entity>): Promise<Entity | null> {
    const table = this.getTable();
    return (await table.where(query).first()) || null;
  }

  protected async find(query: knex.Where<Entity>): Promise<Entity[]> {
    const table = this.getTable();
    return table.where(query);
  }

  protected async removeOne(query: knex.Where<Entity>): Promise<void> {
    const table = this.getTable();
    await table.delete().where(query);
  }

  protected getTable<TResult>(): QueryBuilder {
    const postgreSql = this.postgresqlConnection.getPostgreSql();
    return postgreSql.table(this.table);
  }
}
