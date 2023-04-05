import { either } from 'fp-ts'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { InvalidNumberGivenError } from '../../error'
import { ValueObject } from '../value-object'

export abstract class AbstractNumber extends ValueObject {
  private _value: number

  constructor(input: number | string | AbstractNumber) {
    const value =
      input instanceof AbstractNumber ? either.of(input.value) : t.union([t.number, tt.NumberFromString]).decode(input)

    if (either.isLeft(value)) {
      throw new InvalidNumberGivenError('The value must be a number or a number-like string')
    }

    super()

    this._value = value.right
  }

  get value() {
    return this._value
  }

  protected static codec() {
    return new t.Type(
      this.name ?? AbstractNumber.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          return u instanceof this
            ? t.success(u)
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              t.success(new this(u))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.value,
    )
  }

  add<N extends this>(n: N): this {
    this._value = this._value + n.value

    return this
  }

  sub<N extends this>(n: N): this {
    this._value = this._value - n.value

    return this
  }

  mul<N extends this>(n: N): this {
    this._value = this._value * n.value

    return this
  }

  div<N extends this>(n: N): this {
    this._value = this._value / n.value

    return this
  }

  equals<N extends this>(that: N): boolean {
    return that._type === this._type && that.value === this.value
  }
}
