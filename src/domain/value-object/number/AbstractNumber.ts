import * as t from 'io-ts'
import { ValueObject } from '../ValueObject'

export abstract class AbstractNumber extends ValueObject {
  protected _value!: number

  get value() {
    return this._value
  }

  protected set value(n) {
    this._value = n
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

  equals<N extends this>(that: N): boolean {
    return that._type === this._type && that.value === this.value
  }
}
