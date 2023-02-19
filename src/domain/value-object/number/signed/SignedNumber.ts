import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../../error'
import { AbstractNumber } from '../AbstractNumber'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc4506.html
 */
export abstract class SignedNumber extends AbstractNumber {
  constructor(input: number | string | SignedNumber) {
    const value =
      input instanceof SignedNumber ? either.of(input.value) : t.union([t.number, tt.NumberFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be a number or a number-like string')
    }

    super()
    this.value = value.right
  }
}
