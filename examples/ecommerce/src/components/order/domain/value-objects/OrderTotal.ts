import { UnsignedDecimal, ValueObject } from '../../../../../../../src/domain/value-object'

export class OrderTotal extends UnsignedDecimal {
  protected _value!: number

  constructor(input: number | OrderTotal) {
    super(input)

    this._value = input instanceof OrderTotal ? input.value : input
  }

  get value() {
    return this._value
  }
}
