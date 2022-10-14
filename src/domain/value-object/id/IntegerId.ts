import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidIntegerIdGivenError } from '../../error/InvalidIntegerIdGivenError'
import { UnsignedInteger } from '../number/unsigned/UnsignedInteger'
import { Id } from './Id'

export abstract class IntegerId extends Id {
  private readonly value: t.Int

  constructor(input: number | string | UnsignedInteger | IntegerId) {
    const value =
      input instanceof IntegerId
        ? either.of(input.value)
        : t.union([t.Int, tt.IntFromString]).decode(input instanceof UnsignedInteger ? input.value : input)

    if (either.isLeft(value)) {
      throw new InvalidIntegerIdGivenError('The value must be an integer or an integer-like string')
    }

    super()
    this.value = value.right
  }

  equals(that: Id): boolean {
    return that instanceof IntegerId && that.constructor === this.constructor && that.value === this.value
  }

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }
}

export const IntegerIdC = <A extends IntegerId>(
  Ctor: new (input: number | string | UnsignedInteger | IntegerId) => A,
) =>
  new t.Type(
    Ctor.name ?? 'IntegerId',
    (u): u is A => u instanceof Ctor,
    (u, c) => {
      try {
        return t.success(new Ctor(u as any))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.toString(),
  )
