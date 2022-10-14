import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error/InvalidNumberGivenError'
import { UnsignedNumber } from './UnsignedNumber'

/**
 * Positive integer.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedInteger extends UnsignedNumber {
  constructor(input: number | string | UnsignedInteger) {
    const value =
      input instanceof UnsignedInteger ? either.of(input.value) : t.union([t.Int, tt.IntFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be a positive integer or a positive integer-like string')
    }

    super(value.right)
  }

  equals(that: UnsignedNumber): boolean {
    return that instanceof UnsignedInteger && that.constructor === this.constructor && that.value === this.value
  }
}

export const UnsignedIntegerC = <A extends UnsignedInteger>(
  ctor: new (input: number | string | UnsignedInteger) => A,
) =>
  new t.Type(
    ctor.name ?? UnsignedInteger.name,
    (u): u is A => u instanceof ctor,
    (u, c) => {
      try {
        return t.success(new ctor(u as any))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.value,
  )
