import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { NonEmptyString } from 'io-ts-types'
import { InvalidStringIdGivenError } from '../../error'
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

  equals(that: StringId): boolean {
    return that.constructor === this.constructor && that.value === this.value
  }

  toString(): string {
    return this.value
  }

  toRaw(): unknown {
    return this.value
  }

  static get codec() {
    return new t.Type(
      this.name ?? StringId.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          // @ts-ignore
          return t.success(new this(u as typeof this))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toString(),
    )
  }
}
