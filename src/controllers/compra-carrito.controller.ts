import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Compra,
  Carrito,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraCarritoController {
  constructor(
    @repository(CompraRepository)
    public compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/carrito', {
    responses: {
      '200': {
        description: 'Carrito belonging to Compra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrito)},
          },
        },
      },
    },
  })
  async getCarrito(
    @param.path.number('id') id: typeof Compra.prototype.id,
  ): Promise<Carrito> {
    return this.compraRepository.carrito(id);
  }
}
