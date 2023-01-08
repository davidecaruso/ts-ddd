import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { ValueObject } from '../../../../../../../src/domain/value-object'

export class UserFirstName extends ValueObject {
  private readonly _value: string

  get value() {
    return this._value
  }

  constructor(input: string | UserFirstName) {
    super()
    this._value = input instanceof UserFirstName ? input.value : input
  }
}

export const UserFirstNameC = new t.Type(
  UserFirstName.constructor.name,
  (u): u is UserFirstName => u instanceof UserFirstName,
  (u, c) =>
    u instanceof UserFirstName
      ? t.success(u)
      : pipe(
          NonEmptyString.validate(u, c),
          either.map(v => new UserFirstName(v)),
        ),
  o => o.toString(),
)
