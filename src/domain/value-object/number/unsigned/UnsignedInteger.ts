import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error'
import { UnsignedNumber } from './UnsignedNumber'

/**
 * Positive integer.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedInteger extends UnsignedNumber {
  constructor(input: number | string | UnsignedInteger) {
    const value =
      input instanceof UnsignedInteger ? either.of(input.value) : t.union([t.Int, tt.IntFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be a positive integer or a positive integer-like string')
    }

    super(value.right)
  }
}
