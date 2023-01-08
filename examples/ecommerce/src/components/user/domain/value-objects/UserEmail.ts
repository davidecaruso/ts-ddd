import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserEmail extends ValueObject {
  private readonly _value: string

  constructor(input: string | UserEmail) {
    super()
    this._value = input instanceof UserEmail ? input.value : input

    // TODO: Add email checks
  }

  get value() {
    return this._value
  }
}

export const UserEmailC = new t.Type(
  UserEmail.constructor.name,
  (u): u is UserEmail => u instanceof UserEmail,
  (u, c) =>
    u instanceof UserEmail
      ? t.success(u)
      : pipe(
          NonEmptyString.validate(u, c),
          either.map(v => new UserEmail(v)),
        ),
  o => o.toString(),
)
