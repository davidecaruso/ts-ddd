import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidIntegerIdGivenError } from '../../error'
import { Id } from './Id'

export abstract class IntegerId extends Id {
  protected readonly value: t.Int

  constructor(input: number | string | IntegerId) {
    const value = input instanceof IntegerId ? either.of(input.value) : t.union([t.Int, tt.IntFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidIntegerIdGivenError('The value must be an integer or an integer-like string')
    }

    super()

    this.value = value.right
  }

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }
}
