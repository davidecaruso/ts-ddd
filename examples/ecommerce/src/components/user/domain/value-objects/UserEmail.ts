import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserEmail implements ValueObject {
  private readonly _value: string
  readonly _type = 'user-email'

  constructor(input: string | UserEmail) {
    this._value = input instanceof UserEmail ? input.value : input

    // ...email checks
  }

  get value() {
    return this._value
  }
}
