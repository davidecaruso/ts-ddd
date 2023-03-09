import { domain } from '../../../../../../../src'

export class UserFirstName implements domain.valueObject.ValueObject {
  readonly _type = 'user-first-name'
  private readonly _value: string

  constructor(input: string | UserFirstName) {
    this._value = input instanceof UserFirstName ? input.value : input
  }

  get value() {
    return this._value
  }
}
