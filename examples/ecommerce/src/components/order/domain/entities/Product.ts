import * as t from 'io-ts'
import { Entity } from '../../../../../../../src/domain/entity'
import { CreatedAt, ObjectId, UpdatedAt } from '../../../../../../../src/domain/value-object'
import { ProductId, ProductIdC } from '../value-objects/ProductId'
import { ProductName } from '../value-objects/ProductName'
import { ProductPrice } from '../value-objects/ProductPrice'

export class Product extends Entity<ObjectId> {
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
}

export const ProductC = t.type({ id: ProductIdC })
