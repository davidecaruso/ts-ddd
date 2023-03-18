import { NegativeNumberGivenError } from '../../../error'
import { AbstractNumber } from '../abstract-number'

/**
 * Positive number.
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class UnsignedNumber extends AbstractNumber {
  constructor(input: number | string | UnsignedNumber) {
    super(input)

    if (this.value < 0) {
      throw new NegativeNumberGivenError('The value must be greater than or equal to 0')
    }
  }
}
