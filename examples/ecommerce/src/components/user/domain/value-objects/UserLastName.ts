import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserLastName extends ValueObject {
  private readonly _value: string

  constructor(input: string | UserLastName) {
    super()
    this._value = input instanceof UserLastName ? input.value : input
  }

  get value() {
    return this._value
  }
}

export const UserLastNameC = new t.Type(
  UserLastName.constructor.name,
  (u): u is UserLastName => u instanceof UserLastName,
  (u, c) =>
    u instanceof UserLastName
      ? t.success(u)
      : pipe(
          NonEmptyString.validate(u, c),
          either.map(v => new UserLastName(v)),
        ),
  o => o.toString(),
)
