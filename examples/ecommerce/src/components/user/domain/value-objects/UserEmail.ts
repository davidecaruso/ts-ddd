import { domain } from '../../../../../../../src'

export class UserEmail extends domain.valueObject.ValueObject {
  readonly _type = 'user-email'
  private readonly _value: string

  constructor(input: string | UserEmail) {
    super()

    this._value = input instanceof UserEmail ? input.value : input

    // ...email checks
  }

  get value() {
    return this._value
  }
}
