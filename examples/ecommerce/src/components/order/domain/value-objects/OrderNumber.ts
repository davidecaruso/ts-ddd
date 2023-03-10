import { domain } from '../../../../../../../src'

export class OrderNumber extends domain.valueObject.ValueObject {
  readonly _type = 'order-number'
  private readonly _value: string

  constructor(input: string | OrderNumber) {
    super()

    this._value = input instanceof OrderNumber ? input.value : input
  }

  get value() {
    return this._value
  }

  static create() {
    return new OrderNumber(`${(new Date().getTime() + '').slice(0, 10)}-${Math.random().toString(36).substring(2, 8)}`)
  }
}
