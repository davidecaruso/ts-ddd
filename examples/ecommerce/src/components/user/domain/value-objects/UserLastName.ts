import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserLastName implements ValueObject {
  private readonly _value: string
  readonly _type = 'user-last-name'

  constructor(input: string | UserLastName) {
    this._value = input instanceof UserLastName ? input.value : input
  }

  get value() {
    return this._value
  }
}
