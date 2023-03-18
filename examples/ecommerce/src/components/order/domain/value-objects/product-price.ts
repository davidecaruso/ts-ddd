import { domain } from '../../../../../../../src'

export class ProductPrice extends domain.valueObject.UnsignedDecimal {
  readonly _type = 'product-price'
}
