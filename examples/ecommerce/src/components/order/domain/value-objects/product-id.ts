import { domain } from '../../../../../../../src'

export class ProductId extends domain.valueObject.ObjectId {
  readonly _type = 'product-id'

  static codec() {
    return super.codec()
  }
}
