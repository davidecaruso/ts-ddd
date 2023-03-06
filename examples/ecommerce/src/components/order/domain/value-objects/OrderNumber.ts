import { ValueObject } from '../../../../../../../src/domain/value-object'

export class OrderNumber implements ValueObject {
  private readonly _value: string
  readonly _type = 'order-number'

  constructor(input: string | OrderNumber) {
    this._value = input instanceof OrderNumber ? input.value : input
  }

  get value() {
    return this._value
  }

  static create() {
    return new OrderNumber(`${(new Date().getTime() + '').slice(0, 10)}-${Math.random().toString(36).substring(2, 8)}`)
  }
}
