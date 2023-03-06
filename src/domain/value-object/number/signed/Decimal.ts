import * as t from 'io-ts'
import { SignedNumber } from './SignedNumber'

export abstract class Decimal extends SignedNumber {
  equals(that: number | string | Decimal): boolean {
    return that instanceof Decimal && that.constructor === this.constructor && that.value === this.value
  }

  static get codec() {
    return new t.Type(
      this.name ?? Decimal.name,
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
