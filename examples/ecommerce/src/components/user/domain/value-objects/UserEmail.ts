import { domain } from '../../../../../../../src'

export class UserEmail implements domain.valueObject.ValueObject {
  readonly _type = 'user-email'
  private readonly _value: string

  constructor(input: string | UserEmail) {
    this._value = input instanceof UserEmail ? input.value : input

    // ...email checks
  }

  get value() {
    return this._value
  }
}
