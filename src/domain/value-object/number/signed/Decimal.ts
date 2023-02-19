import * as t from 'io-ts'
import { SignedNumber } from './SignedNumber'

export abstract class Decimal extends SignedNumber {
  equals(that: number | string | Decimal): boolean {
    return that instanceof Decimal && that.constructor === this.constructor && that.value === this.value
  }
}

export const DecimalC = <A extends Decimal>(ctor: new (input: number | string | Decimal) => A) =>
  new t.Type(
    ctor.name ?? Decimal.name,
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
