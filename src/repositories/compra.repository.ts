import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {PostgresDsDataSource} from '../datasources';
import {Compra, CompraRelations, CompraProducto, Carrito} from '../models';
import {CompraProductoRepository} from './compra-producto.repository';
import {CarritoRepository} from './carrito.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly compraProductos: HasManyRepositoryFactory<CompraProducto, typeof Compra.prototype.id>;

  public readonly carrito: BelongsToAccessor<Carrito, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.PostgresDS') dataSource: PostgresDsDataSource, @repository.getter('CompraProductoRepository') protected compraProductoRepositoryGetter: Getter<CompraProductoRepository>, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>,
  ) {
    super(Compra, dataSource);
    this.carrito = this.createBelongsToAccessorFor('carrito', carritoRepositoryGetter,);
    this.registerInclusionResolver('carrito', this.carrito.inclusionResolver);
    this.compraProductos = this.createHasManyRepositoryFactoryFor('compraProductos', compraProductoRepositoryGetter,);
    this.registerInclusionResolver('compraProductos', this.compraProductos.inclusionResolver);
  }
}
