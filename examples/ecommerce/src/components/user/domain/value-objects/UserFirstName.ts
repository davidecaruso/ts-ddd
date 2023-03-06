import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserFirstName implements ValueObject {
  private readonly _value: string
  readonly _type = 'user-first-name'

  constructor(input: string | UserFirstName) {
    this._value = input instanceof UserFirstName ? input.value : input
  }

  get value() {
    return this._value
  }
}
