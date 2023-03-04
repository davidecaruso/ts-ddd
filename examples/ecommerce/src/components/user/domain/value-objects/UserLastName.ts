import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
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
