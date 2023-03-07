import { SignedNumber } from './SignedNumber'

export abstract class Decimal extends SignedNumber {
  equals(that: number | string | Decimal): boolean {
    return that instanceof Decimal && that.constructor === this.constructor && that.value === this.value
  }
}
