import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error'
import { SignedNumber } from './SignedNumber'

export abstract class Integer extends SignedNumber {
  constructor(input: number | string | Integer) {
    const value = input instanceof Integer ? either.of(input.value) : t.union([t.Int, tt.IntFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be an integer or an integer-like string')
    }

    super(value.right)
  }

  equals(that: SignedNumber): boolean {
    return that instanceof Integer && that.constructor === this.constructor && that.value === this.value
  }
}

export const IntegerC = <A extends Integer>(ctor: new (input: number | string | Integer) => A) =>
  new t.Type(
    ctor.name ?? Integer.name,
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
