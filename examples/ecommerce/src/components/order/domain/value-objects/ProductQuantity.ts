import { UnsignedInteger } from '../../../../../../../src/domain/value-object'

export class ProductQuantity extends UnsignedInteger {
  readonly _type = 'product-quantity'

  static codec() {
    return super.codec()
  }
}
