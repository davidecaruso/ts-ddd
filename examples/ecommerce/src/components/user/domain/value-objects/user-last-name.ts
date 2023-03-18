import { domain } from '../../../../../../../src'

export class UserLastName extends domain.valueObject.ValueObject {
  readonly _type = 'user-last-name'
  private readonly _value: string

  constructor(input: string | UserLastName) {
    super()

    this._value = input instanceof UserLastName ? input.value : input
  }

  get value() {
    return this._value
  }
}
