import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error/InvalidNumberGivenError'
import { NegativeNumberGivenError } from '../../../error/NegativeNumberGivenError'
import { AbstractNumber } from '../AbstractNumber'

/**
 * Positive number.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedNumber extends AbstractNumber {
  constructor(input: number | string | UnsignedNumber) {
    const value =
      input instanceof UnsignedNumber ? either.of(input.value) : t.union([t.number, tt.NumberFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be a positive number or a positive number-like string')
    }

    if (value.right < 0) {
      throw new NegativeNumberGivenError('The value must be greater than or equal to 0')
    }

    super()

    this.value = value.right
  }
}
