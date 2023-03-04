import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
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
