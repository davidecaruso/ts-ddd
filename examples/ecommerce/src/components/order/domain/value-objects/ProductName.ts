import { ValueObject } from '../../../../../../../src/domain/value-object'

export class ProductName implements ValueObject {
  private readonly _value: string
  readonly _type!: string

  constructor(input: string | ProductName) {
    this._value = input instanceof ProductName ? input.value : input
  }

  get value() {
    return this._value
  }
}
