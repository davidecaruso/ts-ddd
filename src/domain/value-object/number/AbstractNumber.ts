import { number } from 'fp-ts'
import * as t from 'io-ts'
import { ValueObject } from '../ValueObject'

/**
 * TODO: make operations stricter about types
 */
export abstract class AbstractNumber implements ValueObject {
  abstract readonly _type: string
  protected _value!: number

  get value() {
    return this._value
  }

  protected set value(n) {
    this._value = n
  }

  add<N extends this | number>(n: N): this {
    this._value = number.MonoidSum.concat(this._value, t.number.is(n) ? n : n.value)

    return this
  }

  sub<N extends this | number>(n: N): this {
    this._value = number.MagmaSub.concat(this._value, t.number.is(n) ? n : n.value)

    return this
  }

  mul<N extends this | number>(n: N): this {
    this._value = number.MonoidProduct.concat(this._value, t.number.is(n) ? n : n.value)

    return this
  }

  div<N extends this | number>(n: N): this {
    this._value = this._value / (t.number.is(n) ? n : n.value)

    return this
  }

  abstract equals<N extends this>(that: N): boolean

  protected static codec() {
    return new t.Type(
      this.name ?? AbstractNumber.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          return u instanceof this
            ? t.success(u)
            : // @ts-ignore
              t.success(new this(u))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.value,
    )
  }
}
