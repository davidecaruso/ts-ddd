import { ObjectId } from '../../../../../../../src/domain/value-object'

export class ProductId extends ObjectId {
  readonly _type = 'product-id'

  static codec() {
    return super.codec()
  }
}
