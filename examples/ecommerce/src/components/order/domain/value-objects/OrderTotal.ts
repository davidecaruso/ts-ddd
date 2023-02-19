import { UnsignedDecimal } from '../../../../../../../src/domain/value-object'

export class OrderTotal extends UnsignedDecimal {
  protected _value!: number

  get value() {
    return this._value
  }

  constructor(input: number | OrderTotal) {
    super(input)

    this._value = input instanceof OrderTotal ? input.value : input
  }
}
