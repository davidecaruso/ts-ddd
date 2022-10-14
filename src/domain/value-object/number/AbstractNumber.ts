import { ValueObject } from '../ValueObject'

export abstract class AbstractNumber extends ValueObject {
  private _value!: number

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

  abstract equals<N extends this>(that: N): boolean
}
