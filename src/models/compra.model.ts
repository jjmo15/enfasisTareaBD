import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {CompraProducto} from './compra-producto.model';
import {Carrito} from './carrito.model';

@model()
export class Compra extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @hasMany(() => CompraProducto)
  compraProductos: CompraProducto[];

  @belongsTo(() => Carrito)
  carritoId: number;

  constructor(data?: Partial<Compra>) {
    super(data);
  }
}

export interface CompraRelations {
  // describe navigational properties here
}

export type CompraWithRelations = Compra & CompraRelations;
