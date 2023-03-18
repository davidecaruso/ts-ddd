import { domain } from '../../../../../../../src'

export class OrderTotal extends domain.valueObject.UnsignedDecimal {
  readonly _type = 'order-total'

  constructor(input: number | OrderTotal) {
    super(input)
  }
}
