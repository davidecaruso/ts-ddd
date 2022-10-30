import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class ProductId extends ObjectId {}

export const ProductIdC = ObjectIdC(ProductId)
