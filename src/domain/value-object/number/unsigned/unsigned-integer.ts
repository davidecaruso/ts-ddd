import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error'
import { UnsignedNumber } from './unsigned-number'

/**
 * Positive integer.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedInteger extends UnsignedNumber {
  constructor(input: number | string | UnsignedInteger) {
    super(input)

    if (either.isLeft(t.union([t.Int, tt.IntFromString]).decode(this.value))) {
      throw new InvalidNumberGivenError('The value must be a positive integer or a positive integer-like string')
    }
  }
}
