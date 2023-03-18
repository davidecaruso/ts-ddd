import { either } from 'fp-ts'
import * as tt from 'io-ts-types'
import { NonEmptyString } from 'io-ts-types'
import { InvalidStringIdGivenError } from '../../error'
import { Id } from './id'

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

  toString(): string {
    return this.value
  }

  toRaw(): unknown {
    return this.value
  }
}
