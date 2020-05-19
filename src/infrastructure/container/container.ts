import {Container, decorate, inject, injectable} from "inversify";

import {MongodbConnection} from "../database/mongodb/connection";
import {AbstractMongodbRepository} from "../database/mongodb/repository";
import {PostgresqlConnection} from "../database/postgresql/connection";
import {AbstractPostgresqlRepository} from "../database/postgresql/repository";
import {Logger} from "../logger/service";

export const container = new Container({skipBaseClassChecks: true, autoBindInjectable: true});

decorate(injectable(), MongodbConnection);
decorate(inject(Logger), MongodbConnection, 0);
decorate(inject(MongodbConnection), AbstractMongodbRepository, 0);

decorate(injectable(), PostgresqlConnection);
decorate(inject(Logger), PostgresqlConnection, 0);
decorate(inject(PostgresqlConnection), AbstractPostgresqlRepository, 0);

container.bind(Logger).toSelf().inRequestScope();

container.bind(MongodbConnection).toSelf().inSingletonScope();
