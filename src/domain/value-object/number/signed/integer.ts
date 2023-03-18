import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error'
import { SignedNumber } from './signed-number'

export abstract class Integer extends SignedNumber {
  constructor(input: number | string | Integer) {
    super(input)

    if (either.isLeft(t.union([t.Int, tt.IntFromString]).decode(this.value))) {
      throw new InvalidNumberGivenError('The value must be an integer or an integer-like string')
    }
  }
}
