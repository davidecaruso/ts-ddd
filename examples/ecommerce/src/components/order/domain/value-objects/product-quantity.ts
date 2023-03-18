import { domain } from '../../../../../../../src'

export class ProductQuantity extends domain.valueObject.UnsignedInteger {
  readonly _type = 'product-quantity'

  static codec() {
    return super.codec()
  }
}
