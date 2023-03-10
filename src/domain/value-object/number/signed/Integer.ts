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
}
