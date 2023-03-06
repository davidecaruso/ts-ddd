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

  static get codec() {
    return new t.Type(
      this.name ?? UnsignedDecimal.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          // @ts-ignore
          return t.success(new this(u as typeof this))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.value,
    )
  }
}
