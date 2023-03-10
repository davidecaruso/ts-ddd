import { domain } from '../../../../../../../src'

export class ProductName extends domain.valueObject.ValueObject {
  readonly _type = 'product-name'
  private readonly _value: string

  constructor(input: string | ProductName) {
    super()

    this._value = input instanceof ProductName ? input.value : input
  }

  get value() {
    return this._value
  }
}
