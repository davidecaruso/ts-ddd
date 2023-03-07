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
