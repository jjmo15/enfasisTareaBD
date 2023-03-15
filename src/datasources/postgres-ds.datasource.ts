import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'PostgresDS',
  connector: 'postgresql',
  url: 'postgres://postgres:josem1598@localhost/skuDBenfasis',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'josem1598',
  database: 'skuDBenfasis'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'PostgresDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.PostgresDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
