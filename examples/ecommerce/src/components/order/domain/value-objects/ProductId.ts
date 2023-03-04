import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class ProductId extends ObjectId {
  readonly _type = 'product-id'
}

export const ProductIdC = ObjectIdC(ProductId)
