import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { ValueObject } from '../ValueObject'

export abstract class DateTime extends ValueObject {
  protected readonly _value: Date

  constructor(input: string | Date | DateTime = new Date()) {
    super()

    this._value =
      input instanceof DateTime ? new Date(input.toString()) : input instanceof Date ? input : new Date(input)
  }

  get value() {
    return this._value
  }

  equals(that: DateTime): boolean {
    return that._value.getTime() === this._value.getTime()
  }

  toString(): string {
    return this._value.toISOString()
  }

  toDateString(): string {
    return this._value.toISOString().substring(0, 10)
  }

  protected static codec() {
    return new t.Type(
      this.name ?? DateTime.name,
      (u): u is typeof this => u instanceof this,
      (u, c) =>
        u instanceof this
          ? t.success(u)
          : pipe(
              t.union([tt.date, tt.DateFromISOString]).validate(u, c),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              either.map(d => new this(d)),
            ),
      o => o.value,
    )
  }
}
