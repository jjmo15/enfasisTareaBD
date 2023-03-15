import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDsDataSource} from '../datasources';
import {CompraProducto, CompraProductoRelations} from '../models';

export class CompraProductoRepository extends DefaultCrudRepository<
  CompraProducto,
  typeof CompraProducto.prototype.id,
  CompraProductoRelations
> {
  constructor(
    @inject('datasources.PostgresDS') dataSource: PostgresDsDataSource,
  ) {
    super(CompraProducto, dataSource);
  }
}
