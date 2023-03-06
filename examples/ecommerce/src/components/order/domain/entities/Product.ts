import * as t from 'io-ts'
import { Entity } from '../../../../../../../src/domain/entity'
import { CreatedAt, UpdatedAt } from '../../../../../../../src/domain/value-object'
import { ProductId } from '../value-objects/ProductId'
import { ProductName } from '../value-objects/ProductName'
import { ProductPrice } from '../value-objects/ProductPrice'

export class Product extends Entity<ProductId> {
  readonly _type: string = 'product'
  readonly updatedAt: UpdatedAt

  constructor(
    readonly name: ProductName,
    readonly price: ProductPrice,
    readonly id: ProductId = new ProductId(),
    readonly createdAt: CreatedAt = new CreatedAt(),
    updatedAt?: UpdatedAt,
  ) {
    super(id)
    this.updatedAt = updatedAt ?? UpdatedAt.fromCreatedAt(createdAt)
  }

  static get codec() {
    return t.type({ id: ProductId.codec })
  }
}
