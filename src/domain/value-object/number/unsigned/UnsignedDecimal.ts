import * as t from 'io-ts'
import { UnsignedNumber } from './UnsignedNumber'

/**
 * Positive decimal.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedDecimal extends UnsignedNumber {
  equals(that: UnsignedNumber): boolean {
    return that instanceof UnsignedDecimal && that.constructor === this.constructor && that.value === this.value
  }
}

export const UnsignedDecimalC = <A extends UnsignedDecimal>(
  ctor: new (input: number | string | UnsignedDecimal) => A,
) =>
  new t.Type(
    ctor.name ?? UnsignedDecimal.name,
    (u): u is A => u instanceof ctor,
    (u, c) => {
      try {
        return t.success(new ctor(u as A))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.value,
  )
