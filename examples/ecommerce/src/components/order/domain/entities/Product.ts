import * as t from 'io-ts'
import { domain } from '../../../../../../../src'
import { ProductId } from '../value-objects/ProductId'
import { ProductName } from '../value-objects/ProductName'
import { ProductPrice } from '../value-objects/ProductPrice'

export class Product extends domain.entity.Entity<ProductId> {
  readonly _type = 'product'
  readonly updatedAt: domain.valueObject.UpdatedAt

  constructor(
    readonly name: ProductName,
    readonly price: ProductPrice,
    readonly id: ProductId = new ProductId(),
    readonly createdAt: domain.valueObject.CreatedAt = new domain.valueObject.CreatedAt(),
    updatedAt?: domain.valueObject.UpdatedAt,
  ) {
    super(id)
    this.updatedAt = updatedAt ?? domain.valueObject.UpdatedAt.fromCreatedAt(createdAt)
  }

  static codec() {
    return t.type({ id: ProductId.codec() })
  }
}
