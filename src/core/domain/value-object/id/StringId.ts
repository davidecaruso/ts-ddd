import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { NonEmptyString } from 'io-ts-types'
import { InvalidStringIdGivenError } from '../../error/InvalidStringIdGivenError'
import { Id } from './Id'

export abstract class StringId extends Id {
  private readonly value: NonEmptyString

  constructor(input: number | string | StringId) {
    const value = input instanceof StringId ? either.of(input.value) : tt.NonEmptyString.decode(input.toString())

    if (either.isLeft(value)) {
      throw new InvalidStringIdGivenError('The value must be a non-empty string')
    }

    super()
    this.value = value.right
  }

  equals(that: Id): boolean {
    return that instanceof StringId && that.constructor === this.constructor && that.value === this.value
  }

  toString(): string {
    return this.value
  }

  toRaw(): unknown {
    return this.value
  }
}

export const StringIdC = <A extends StringId>(ctor: new (input: number | string | StringId) => A) =>
  new t.Type(
    ctor.name ?? StringId.name,
    (u): u is A => u instanceof ctor,
    (u, c) => {
      try {
        return t.success(new ctor(u as any))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.toString(),
  )
