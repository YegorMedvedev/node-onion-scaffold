export interface IHealthStorage {
  status: string;
  details?: string;
}

export interface IHealthStorages {
  mongodb: IHealthStorage;
  postgres: IHealthStorage;
}

export interface IHealthEnvironment {
  NODE_ENV: string;
  PORT: string;
}

export interface IHealthMemory {
  rss: string;
  heapTotal: string;
  heapUsed: string;
  external: string;
}

export interface IHealth {
  node: string;
  version: string;
  name: string;
  environment: IHealthEnvironment;
  memory: IHealthMemory;
  storage: IHealthStorages;
}
